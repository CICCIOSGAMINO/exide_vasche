/**
 * Exide - Vasche / Raddrizzatori SW 
 */
const version = 'v5.0.0';

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

// Load config file 
const CONFIG_FILE = 'config.json';
let config = JSON.parse(fs.readFileSync(`./${CONFIG_FILE}`, 'utf8'));
let User = config.user;

// Load the vasche object
const v = require('./vasche');

const session = require('express-session');
const express = require('express');
const app = express();
const port = config.port;

// Winston Logger 
const winston = require('winston');

// Winston - Creating Info Logger on Console 
const infoLogger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/info.log' })
  ],
  exitOnError: true
}); 

const errorLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/errors.log' })
  ]
})

// Path to ../csv/data.csv
const pathCsv = path.join(__dirname, 'csv', 'data.csv');
// Path to ../reg
const pathReg = path.join(__dirname, 'reg');
// Path to ../reg/temp
const pathRegTemp = path.join(__dirname, 'reg', 'temp');

// Map with Raddrizzatori ID binding with the Vasca and Raddrizzatore number
// get the plant from the config file eg. STEP_3 or STEP_2
const vasche = v[config.plant];
const vascheMap = new Map(vasche);

// Map with the Web Data [Vasca, [0, 0, 0, 0, 52.29, 0, 0, 0, 0, 49, 0, 0]]
var tempPhaseOneSevenMap = new Map();
var tempPhaseEightEndMap = new Map();
// Map the Value Duration, Tmax1-7, Tmax8-17 from data.csv file 
var tempDurationOneSevenMap = new Map();
var tempOneSevenBlob = [];
var tempEightEndBlob = [];
var tempDurationBlob = [];

// Set the Temperature MAX (red the background in web page)
let alarmMaxTempOneSeven = config.alarmMaxTempOneSeven;
let alarmMaxTempEightEnd = config.alarmMaxTempEightEnd;
let alarmMin = config.alarmMin;
let durationh = config.durationh;

// Prevent the Double event on fs.watch 
let doNotDoubleWatchOne = false;
let doNotDoubleWatchTwo = false;
let doNotDoubleWatchThree = false;

// -----------------------------------------    OS   -----------------------------------------
// Running only on windows platform
let strEncoding = 'utf8';
if(os.platform() === 'win32') {
  let [dwMajorVersion, dwMinorVersion, dwBuildNumber] = os.release().split(".").map(Number);
  if(dwMajorVersion < 6) {
    infoLogger.info(`@MACHINE >> ${os.platform()} - ${dwMajorVersion}`);
    strEncoding = 'binary';
  }
} else {
  infoLogger.info(`@NOT_WIN_MACHINE >> ${os.platform()}`);
  infoLogger.info(`@STOP >> PROCESS.EXIT(1)`);
  process.exit(1);
}

// ----------------------------------------- Passport ----------------------------------------
// Passport (Authentication)
var passport = require('passport');
const { unescape } = require('querystring');
var LocalStrategy = require('passport-local').Strategy 

passport.use(new LocalStrategy(
  function(username, password, done){

    if(User.username != username) {
      return done(null, false, { message: 'Incorrect username' })
    } 

    if(User.password != password) {
      return done(null, false, { message: 'Incorrect password'})
    }

    return done(null, User)
  }
));

passport.serializeUser((user, done) => {
  done(null, User.username)
});

passport.deserializeUser((id, done) => {
  done(null, User)
});

// ----------------------------------------- Express ------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// express-session must be used before passport 
app.use(session({
  secret: 'CICCIO',
  resave: false,
  saveUninitialized: false
}));

// Support JSON & URL encoded bodies middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
    res.render('index', { 
        dataOneSeven: tempOneSevenBlob,
        dataEightEnd: tempEightEndBlob,
        alarmMaxTempOneSeven: alarmMaxTempOneSeven,
        alarmMaxTempEightEnd: alarmMaxTempEightEnd,
        alarmMin: alarmMin,
        logged: (req.user ? true : false),
        version: version
      })
});

app.get('/csv', (req, res, next) => {
  res.render('csv', {
        csvData: tempDurationBlob, 
        alarmMaxDuration: durationh,
        tmaxone: alarmMaxTempOneSeven, 
        tmaxend: alarmMaxTempEightEnd,
        logged: (req.user ? true : false)
  })
});

app.get('/login', (req, res) => {

  if(req.user) {
    res.redirect('/')
  } else {
    res.render('login', {})
  }
});

app.post("/login", 
  passport.authenticate('local', {  failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/')
});

app.get("/params", (req, res) => {
  // Check auth 
  if(req.user) {
    res.render('params', {  tmaxone: alarmMaxTempOneSeven, 
                            tmaxend: alarmMaxTempEightEnd,
                            tmin: alarmMin,
                            durationh: durationh })
  } else {
    res.render('error404')
  }
});

app.get("/create", (req, res) => {
  if(req.user) {

    let processed = computeOneYearCsv()

    res.render('create', {
      msg: "File processati",
      processed: processed
    })
  } else {
    res.render('error404')
  }
});

app.post("/save", (req, res) => {
  if(!isNaN(req.body.durationh) && !isNaN(req.body.tmaxone) && !isNaN(req.body.tmaxend)) {
    durationh = req.body.durationh;
    alarmMin = req.body.tmin;
    alarmMaxTempOneSeven = req.body.tmaxone;
    alarmMaxTempEightEnd = req.body.tmaxend;
    updateConfigFile();

    res.redirect("/")
  } else {
    res.redirect("/")
  }
});

app.get("/error", (req, res) => {
  res.render('error404', {})
});

app.get("/logout", (req, res) => {
  req.logout()
  res.redirect('/')
});

app.all('*', (req, res) => {
  res.redirect('/error')
});

app.listen(port, () => {
  infoLogger.info(`@SERVER >> ACTIVE ON PORT:${port}`)
});

let updateConfigFile = () => {

  let newConfig = {
    user: User,
    plant: config.plant,
    mode: config.mode,
    alarmMaxTempOneSeven: alarmMaxTempOneSeven,
    alarmMaxTempEightEnd: alarmMaxTempEightEnd,
    alarmMin: alarmMin,
    durationh: durationh
  }

  let data = JSON.stringify(newConfig, null, 2)

  fs.writeFileSync(CONFIG_FILE, data)
};

// ------------------------------------- Watching csv/data.csv --------------------------
fs.watch(pathCsv, (eventType, filename) => {

  doNotDoubleWatchThree = !doNotDoubleWatchThree

  if(doNotDoubleWatchThree) {

    try {
      // File Exist 
      if(fs.existsSync(pathCsv)) {
        
        // Create the LineReader and the ReadStream
        let readStream = fs.createReadStream(pathCsv)
        let lineReader = readline.createInterface({
          input: readStream
        })

        lineReader.on('line', (line) => {

          let [vascas, radds, ibat, dates, durations, tmaxones, tmaxends] = line.trim().split(';')
          let vasca = parseInt(vascas)
          let radd = parseInt(radds)
          let date = new Date(dates)

          // Check right record read
          if(!isNaN(vasca) && !isNaN(radd)) {
            // Get the hours (to compare, the string to print is durations already ok)
            let durath = parseInt(durations)
            let tmaxone = parseFloat(tmaxones.replace(',','.')).toPrecision(3)
            let tmaxend = parseFloat(tmaxends.replace(',','.')).toPrecision(3)
            // crate a key vasca;radd
            let vascradd = `${vasca};${radd}`
            // get actual value in the map (vasca;radd key) date;
            let actual = tempDurationOneSevenMap.get(vascradd)
            if(actual != undefined) {
              // Save the recent value 
              if(actual[0].getTime() <= date.getTime()) {
                tempDurationOneSevenMap.set(vascradd, [date, durath, durations, tmaxone, tmaxend])
              }
            } else {
              // Key not present write record date, duration(h), tmaxone(float), tmaxend(float)
              tempDurationOneSevenMap.set(vascradd, [date, durath, durations, tmaxone, tmaxend])

            }
            
          }

        }).on('close', () => {

          // update the blob 
          updateCsvBlob()
          
        })


      } 
    } catch(err) {
      errorLogger.error(`@ERROR(CATCH) >> data.csv: ${err}`)
    }
  } // End doNotDoubleWatchThree 

});

/**
 * Update the Blob of CSV table - Prepare the data for the Pug template 
 */
let updateCsvBlob = () => {
  tempDurationBlob = []
  for(let [key, value] of tempDurationOneSevenMap) {
    let [vasca, radd] = key.split(';')
    let [date, durath, durations, maxtone, maxtend] = value
    tempDurationBlob.push([vasca, radd, date, durath, durations, maxtone, maxtend])
  }
};


// ------------------------------------- Watching /reg ----------------------------------
// Files write at the end of process 
fs.watch(pathReg, (eventType, filename) => {

  doNotDoubleWatchOne = !doNotDoubleWatchOne;

  if(doNotDoubleWatchOne) {

  // If is a valid string 
  if(typeof filename === 'string' || filename instanceof String) {

    let buffFilename = Buffer.from(filename, strEncoding);
    let p = path.join(pathReg, buffFilename.toString());
    
    // If is a file process it or skip if folder 
    if(path.parse(p).ext === '.TRR' || path.parse(p).ext === '.trr') {

      // Extract values from file.name eg. numbers for vasca, radd etc  >> 115 308,5,5559,20,02,08,03,11,2016
      let [id, vasc, radd, battery, ...date]  = buffFilename.toString().match(/^\d+|\d+\b|\d+(?=\w)/g);

      // If File Exist and File_Name parsed correct open it 
      try {
        if(vasc !== 'undefined' && fs.existsSync(p)) {
          
          // Create the LineReader and the ReadStream
          let readStream = fs.createReadStream(p);
          let lineReader = readline.createInterface({
            input: readStream
          });

          // NEW PHASE 1-12  13-17
          // Two MAX temp one for Phase 1-7 one for phase 8-17
          let maxTempPhaseEightEnd = 0.0;
          let maxTempPhaseOneSeven = 0.0;
          let startDate = new Date();
          let endDate = new Date(0);

          // Read the line from file 
          lineReader.on('line', (line) => {

            let [status, type, nphase, datePhase, tprg, ibat, vbat, tbat, vout, faults] = line.trim().split(';');
            let jsDate = new Date(datePhase);

            // Check good reading (easy one only on first three fields)
            if(status !== 'undefined' && type !== 'undefined' && nphase !== 'undefined' && !isNaN(jsDate)) {
              let phase = parseInt(nphase);
              let temp = parseFloat(tbat.replace(',','.')).toPrecision(3);

              // Find the Process endDate as starting from 1970 to raise 
              if(jsDate > endDate) {
                endDate = jsDate;
              }
              // Find the Process startDate starting from now() to low down 
              if(jsDate < startDate) {
                startDate = jsDate;
              }

              // TODO NEw PHASE 
              // Compute the MaxT in Phase 1-7 
              if(phase >= 1 && phase < 13) {
                if(maxTempPhaseOneSeven <= temp) {
                  maxTempPhaseOneSeven = temp;
                }
              }
              // Compute the MaxT in Phase 8-17
              if(phase >= 13) {
                if(maxTempPhaseEightEnd <= temp) {
                  maxTempPhaseEightEnd = temp;
                }
              }

              
            }

          }).on('close', () => {

            // Check Good values before writing them (easy one only two fields)
            if(vasc !== 'undefined' && radd !== 'undefined' && (endDate - startDate) > 0 ) {

              // Shape the data you need 
              let durationMins = parseInt((endDate - startDate) / 1000 / 60);
              let durationSec = durationMins % 60;
              let durationHours = parseInt(durationMins / 60);
              let duration = `${durationHours}h ${durationMins % 60}min`;

              let data = {
                vasca: parseInt(vasc),
                radd: parseInt(radd),
                battery: battery,
                startDate: startDate,
                endDate: endDate,
                duration: duration,
                maxTempPhaseOneSeven: maxTempPhaseOneSeven,
                maxTempPhaseEightEnd: maxTempPhaseEightEnd
              };
    
              writeOnCsv(data);
            }

            readStream.destroy();
          });


        }

      } catch(err) {
        errorLogger.error(`@ERROR(CATCH) >> ${err}`);
      }
    }
  }
  }
})


// ----------------------------------- Watching /reg/temp -------------------------------
// Files write in real-time during the cycle phase 1 -> 17 
fs.watch(pathRegTemp,(eventType, filename) => {

    doNotDoubleWatchTwo = !doNotDoubleWatchTwo;

    if(doNotDoubleWatchTwo) {

      if(typeof filename === 'string' || filename instanceof String) {

        let buffFilename = Buffer.from(filename, strEncoding)   
        let p = path.join(pathRegTemp, buffFilename.toString())

        // If is a file process it or skip if folder 
        if(path.parse(p).ext === '.TRR' || path.parse(p).ext === '.trr') {

          let mapKey = path.parse(filename).name;

          if(vascheMap.has(mapKey)) {
          
            let { vasca, raddrizzatore } = vascheMap.get(mapKey);

            try {
              // Read the file if not deleted or missing 
              if(fs.existsSync(p)) {

                let readStream = fs.createReadStream(p);
                let lineReader = readline.createInterface({
                  input: readStream
                });

                // Two MAX temp one for Phase 1-7 one for phase 8-17
                let maxTempPhaseEightEnd = 0.0;
                let maxTempPhaseOneSeven = 0.0;

                // Get the vars i need from into the file 
                lineReader.on('line', (line) => {
                  let phase = parseInt(line.trim().split(';')[2]);

                  //  Reset the Temperature MAX when new Phase 1 is found 
                  if(phase == 1) {
                    maxTempPhaseEightEnd = 0.0;
                    maxTempPhaseOneSeven = 0.0;
                  } 

                  // TODO -------------------------------------------------------------- Handle NEW PHASE
                  // Handle the  1 < Phase > 13 to search for Temperature MAX 
                  if(phase > 1 && phase < 13) {
                    let temp = parseFloat(line.trim().split(';')[7].replace(",",".")).toPrecision(3)
                    if(maxTempPhaseOneSeven <= temp) {
                      maxTempPhaseOneSeven = temp;
                    }
                  }

                  // TODO -------------------------------------------------------------- Handle NEW PHASE
                  // Handle the Phase >= 13 to search for Temperature MAX
                  if(phase >= 13) {
                    let temp = parseFloat(line.trim().split(';')[7].replace(",",".")).toPrecision(3)
                    if(maxTempPhaseEightEnd <= temp) {
                      maxTempPhaseEightEnd = temp;
                    }
                  }
                }).on('close', () => {

                    // Add the new maxTempPhaseOneSeven to the temp Map 
                    tempPhaseOneSevenMap.set(vasca, getRightArray(
                      tempPhaseOneSevenMap.get(vasca),raddrizzatore, maxTempPhaseOneSeven));
                    // Add/Update maxTempPhaseEightEnd to the temp Map
                    tempPhaseEightEndMap.set(vasca, getRightArray(
                        tempPhaseEightEndMap.get(vasca), raddrizzatore, maxTempPhaseEightEnd));

                    // Update the blobs for Web View
                    rewriteTemperature();

                    readStream.destroy();

                })
            }
          } catch(err) {
            errorLogger.error(`@ERROR(CATCH) >> ${err}`);
          }

        }
      }
    }
  }   // End doNotDoubleWatchTwo
});


/**
 *  Write the CSV file with Storic data, set when proces ended and a file is written 
 *  in ../reg folder
 * 
 * @param {*} data 
 */
let writeOnCsv = (data) => {
  // Prepare the blob of data (easy formatting)
  let blob = `${data.vasca};${data.radd};${data.battery};${data.startDate};${data.duration};${data.maxTempPhaseOneSeven};${data.maxTempPhaseEightEnd}\r\n`;

  // Reading the file (we don't want duplicate)
  try {
    // Read the file if not deleted or missing 
    if(fs.existsSync(pathCsv)) {

      // File exist read > update line if needed > append if new line 
      // const readStream = fs.createReadStream(pathCsv)
      let readStream = fs.createReadStream(pathCsv);
      let lineReader = readline.createInterface({
        input: readStream
      });

      let match = false;

      // If i find same line i stopped the process to update file, or append new
      lineReader.on('line', (line) => {
          
          // Do NOT duplicate the line in CSV file 
          let [csvVasca, csvRadd, csvBatt, csvDate, csvDuration, csvTemp1, csvTemp8] = line.trim().split(';');
          // Be Careful with the Date object, use the getTime() method to compare 
          if  (parseInt(csvVasca) == data.vasca && parseInt(csvRadd) == data.radd && 
                csvBatt == data.battery && data.startDate.getTime() == new Date(csvDate).getTime()) {

                match = true;
                lineReader.close();
          }

      }).on('close', () => {

        if(!match) {

          fs.appendFile(pathCsv, blob, (err) => {
            if(err) errorLogger.error(`@ERROR >> WRITE_CSV: ${err}`)
          }) 

        }

        readStream.destroy();
      })

      
    } else {
      // File NOT found Create the file with the CSV HEAD and data in first line
      let head = `VASCA;RADD;BATTERY;DATA_START;DURATA;T_MAX_1_7;T_MAX_8_17`;
      let newLine =  `${head}\r\n${blob}`;
      
      fs.writeFile(pathCsv, newLine, (err) => {
        if(err) errorLogger.error(`@ERROR >> WRITE_CSV: ${err}`);
      }); 
    }
  } catch(err) {
    errorLogger.error(`@ERROR(CATCH) >> ${err}`);
  } 
}


 /**
  * ReWrite the Temperature File 
  */
 let rewriteTemperature = () => {
      // prepare the stream of UTF-8 CSV data 
      let blob = "";
      tempOneSevenBlob = [];
      tempEightEndBlob = [];

      for(let [key, value] of tempPhaseOneSevenMap) {
        // Prepare blob to file 
        blob = blob + `${key} | ${value}\n`;

        // Prepare blob to Web
        tempOneSevenBlob.push([key,value]);
      }

      for(let [key, value] of tempPhaseEightEndMap) {
        // Prepare blob to file 
        blob = blob + `${key} | ${value}\n`;

        // Prepare blob to Web
        tempEightEndBlob.push([key,value]);
      }
 }

 /**
  * Set the right order in the Raddrizzatori Array (each raddrizzatore by position
  * with the right temperature MAX value )
  */
 // for max 12 fields 
let getRightArray = (oldArray, radd, temp) => {

  if(typeof oldArray == 'undefined') {
    oldArray = [0,0,0,0,0,0,0,0,0,0,0,0];
  }
  oldArray[radd-1] = temp;
  return oldArray;
}

let computeOneYearCsv = () => {
  let processed = 0;

  /** Sync Version  */
  fs.readdirSync(pathReg).forEach(file => {
    
    // KEEP LOW MEMORY 
    let stats = fs.statSync(path.join(pathReg, file));
    // Only if file (NOT directory)
    if(stats.isFile()) {

      let btimeMs = new Date(stats.birthtime);
      // Only last 12 months 
      if((Date.now() - btimeMs) < 5184000000) {

        // last modified 12 months files
        fs.appendFileSync(path.join(pathReg, file),' ');
        processed++;
      }
    };

  });

  return processed;
};

/**
 * Log when Exit from proces 
 */
process.on('exit', (code) => {
  infoLogger.log(`@EXIT, code : + ${code}`);
});

/**
 * Extreme handling the Uncaught Exceptions 
 */
process.on('uncaughtException', (err) => {
  errorLogger.error(`@EXTREME >> ${err}`);
})


