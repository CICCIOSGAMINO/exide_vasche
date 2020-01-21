/**
 * Exide - Vasche / Raddrizzatori SW 
 */
const version = 'v4.2.0';

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

// Load config file 
const CONFIG_FILE = 'config.json';
let config = JSON.parse(fs.readFileSync(`./${CONFIG_FILE}`, 'utf8'));
let User = config.user;

const session = require('express-session');
const express = require('express');
const app = express();
const port = 8080;

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

const vasche = [
  ["1" , {vasca: 301, raddrizzatore: 1}],
  ["2" , {vasca: 301, raddrizzatore: 2}],
  ["3" , {vasca: 301, raddrizzatore: 3}],
  ["4" , {vasca: 301, raddrizzatore: 4}],
  ["5" , {vasca: 301, raddrizzatore: 5}],
  ["6" , {vasca: 301, raddrizzatore: 6}],
  ["7" , {vasca: 301, raddrizzatore: 7}],
  ["8" , {vasca: 301, raddrizzatore: 8}],
  ["9" , {vasca: 301, raddrizzatore: 9}],
  ["10" , {vasca: 301, raddrizzatore: 10}],
  ["11" , {vasca: 301, raddrizzatore: 11}],
  ["12" , {vasca: 301, raddrizzatore: 12}],
  ["13" , {vasca: 302, raddrizzatore: 1}],
  ["14" , {vasca: 302, raddrizzatore: 2}],
  ["15" , {vasca: 302, raddrizzatore: 3}],
  ["16" , {vasca: 302, raddrizzatore: 4}],
  ["17" , {vasca: 302, raddrizzatore: 5}],
  ["18" , {vasca: 302, raddrizzatore: 6}],
  ["19" , {vasca: 302, raddrizzatore: 7}],
  ["20" , {vasca: 302, raddrizzatore: 8}],
  ["21" , {vasca: 302, raddrizzatore: 9}],
  ["22" , {vasca: 302, raddrizzatore: 10}],
  ["23" , {vasca: 302, raddrizzatore: 11}],
  ["24" , {vasca: 302, raddrizzatore: 12}],
  ["25" , {vasca: 303, raddrizzatore: 1}],
  ["26" , {vasca: 303, raddrizzatore: 2}],
  ["27" , {vasca: 303, raddrizzatore: 3}],
  ["28" , {vasca: 303, raddrizzatore: 4}],
  ["29" , {vasca: 303, raddrizzatore: 5}],
  ["30" , {vasca: 303, raddrizzatore: 6}],
  ["31" , {vasca: 303, raddrizzatore: 7}],
  ["32" , {vasca: 303, raddrizzatore: 8}],
  ["33" , {vasca: 303, raddrizzatore: 9}],
  ["34" , {vasca: 303, raddrizzatore: 10}],
  ["35" , {vasca: 303, raddrizzatore: 11}],
  ["36" , {vasca: 303, raddrizzatore: 12}],
  ["37" , {vasca: 304, raddrizzatore: 1}],
  ["38" , {vasca: 304, raddrizzatore: 2}],
  ["39" , {vasca: 304, raddrizzatore: 3}],
  ["40" , {vasca: 304, raddrizzatore: 4}],
  ["41" , {vasca: 304, raddrizzatore: 5}],
  ["42" , {vasca: 304, raddrizzatore: 6}],
  ["43" , {vasca: 304, raddrizzatore: 7}],
  ["44" , {vasca: 304, raddrizzatore: 8}],
  ["45" , {vasca: 304, raddrizzatore: 9}],
  ["46" , {vasca: 304, raddrizzatore: 10}],
  ["47" , {vasca: 304, raddrizzatore: 11}],
  ["48" , {vasca: 304, raddrizzatore: 12}],
  ["49" , {vasca: 305, raddrizzatore: 1}],
  ["50" , {vasca: 305, raddrizzatore: 2}],
  ["51" , {vasca: 305, raddrizzatore: 3}],
  ["52" , {vasca: 305, raddrizzatore: 4}],
  ["53" , {vasca: 305, raddrizzatore: 5}],
  ["54" , {vasca: 305, raddrizzatore: 6}],
  ["55" , {vasca: 305, raddrizzatore: 7}],
  ["56" , {vasca: 305, raddrizzatore: 8}],
  ["57" , {vasca: 305, raddrizzatore: 9}],
  ["58" , {vasca: 305, raddrizzatore: 10}],
  ["59" , {vasca: 305, raddrizzatore: 11}],
  ["60" , {vasca: 305, raddrizzatore: 12}],
  ["61" , {vasca: 306, raddrizzatore: 1}],
  ["62" , {vasca: 306, raddrizzatore: 2}],
  ["63" , {vasca: 306, raddrizzatore: 3}],
  ["64" , {vasca: 306, raddrizzatore: 4}],
  ["65" , {vasca: 306, raddrizzatore: 5}],
  ["66" , {vasca: 306, raddrizzatore: 6}],
  ["67" , {vasca: 306, raddrizzatore: 7}],
  ["68" , {vasca: 306, raddrizzatore: 8}],
  ["69" , {vasca: 306, raddrizzatore: 9}],
  ["70" , {vasca: 306, raddrizzatore: 10}],
  ["71" , {vasca: 306, raddrizzatore: 11}],
  ["72" , {vasca: 306, raddrizzatore: 12}],
  ["73" , {vasca: 307, raddrizzatore: 1}],
  ["74" , {vasca: 307, raddrizzatore: 2}],
  ["75" , {vasca: 307, raddrizzatore: 3}],
  ["76" , {vasca: 307, raddrizzatore: 4}],
  ["77" , {vasca: 307, raddrizzatore: 5}],
  ["78" , {vasca: 307, raddrizzatore: 6}],
  ["79" , {vasca: 307, raddrizzatore: 7}],
  ["80" , {vasca: 307, raddrizzatore: 8}],
  ["81" , {vasca: 307, raddrizzatore: 9}],
  ["82" , {vasca: 307, raddrizzatore: 10}],
  ["83" , {vasca: 307, raddrizzatore: 11}],
  ["84" , {vasca: 307, raddrizzatore: 12}],
  ["85" , {vasca: 308, raddrizzatore: 1}],
  ["86" , {vasca: 308, raddrizzatore: 2}],
  ["87" , {vasca: 308, raddrizzatore: 3}],
  ["88" , {vasca: 308, raddrizzatore: 4}],
  ["89" , {vasca: 308, raddrizzatore: 5}],
  ["90" , {vasca: 308, raddrizzatore: 6}],
  ["91" , {vasca: 308, raddrizzatore: 7}],
  ["92" , {vasca: 308, raddrizzatore: 8}],
  ["93" , {vasca: 308, raddrizzatore: 9}],
  ["94" , {vasca: 308, raddrizzatore: 10}],
  ["95" , {vasca: 308, raddrizzatore: 11}],
  ["96" , {vasca: 308, raddrizzatore: 12}],
  ["97" , {vasca: 309, raddrizzatore: 1}],
  ["98" , {vasca: 309, raddrizzatore: 2}],
  ["99" , {vasca: 309, raddrizzatore: 3}],
  ["100" , {vasca: 309, raddrizzatore: 4}],
  ["101" , {vasca: 309, raddrizzatore: 5}],
  ["102" , {vasca: 309, raddrizzatore: 6}],
  ["103" , {vasca: 309, raddrizzatore: 7}],
  ["104" , {vasca: 309, raddrizzatore: 8}],
  ["105" , {vasca: 309, raddrizzatore: 9}],
  ["106" , {vasca: 309, raddrizzatore: 10}],
  ["107" , {vasca: 309, raddrizzatore: 11}],
  ["108" , {vasca: 309, raddrizzatore: 12}],
  ["109" , {vasca: 310, raddrizzatore: 1}],
  ["110" , {vasca: 310, raddrizzatore: 2}],
  ["111" , {vasca: 310, raddrizzatore: 3}],
  ["112" , {vasca: 310, raddrizzatore: 4}],
  ["113" , {vasca: 310, raddrizzatore: 5}],
  ["114" , {vasca: 310, raddrizzatore: 6}],
  ["115" , {vasca: 310, raddrizzatore: 7}],
  ["116" , {vasca: 310, raddrizzatore: 8}],
  ["117" , {vasca: 310, raddrizzatore: 9}],
  ["118" , {vasca: 310, raddrizzatore: 10}],
  ["119" , {vasca: 310, raddrizzatore: 11}],
  ["120" , {vasca: 310, raddrizzatore: 12}],
  ["121" , {vasca: 311, raddrizzatore: 1}],
  ["122" , {vasca: 311, raddrizzatore: 2}],
  ["123" , {vasca: 311, raddrizzatore: 3}],
  ["124" , {vasca: 311, raddrizzatore: 4}],
  ["125" , {vasca: 311, raddrizzatore: 5}],
  ["126" , {vasca: 311, raddrizzatore: 6}],
  ["127" , {vasca: 311, raddrizzatore: 7}],
  ["128" , {vasca: 311, raddrizzatore: 8}],
  ["129" , {vasca: 311, raddrizzatore: 9}],
  ["130" , {vasca: 311, raddrizzatore: 10}],
  ["131" , {vasca: 311, raddrizzatore: 11}],
  ["132" , {vasca: 311, raddrizzatore: 12}],
  ["133" , {vasca: 312, raddrizzatore: 1}],
  ["134" , {vasca: 312, raddrizzatore: 2}],
  ["135" , {vasca: 312, raddrizzatore: 3}],
  ["136" , {vasca: 312, raddrizzatore: 4}],
  ["137" , {vasca: 312, raddrizzatore: 5}],
  ["138" , {vasca: 312, raddrizzatore: 6}],
  ["139" , {vasca: 312, raddrizzatore: 7}],
  ["140" , {vasca: 312, raddrizzatore: 8}],
  ["141" , {vasca: 312, raddrizzatore: 9}],
  ["142" , {vasca: 312, raddrizzatore: 10}],
  ["143" , {vasca: 312, raddrizzatore: 11}],
  ["144" , {vasca: 312, raddrizzatore: 12}],
  ["145" , {vasca: 313, raddrizzatore: 1}],
  ["146" , {vasca: 313, raddrizzatore: 2}],
  ["147" , {vasca: 313, raddrizzatore: 3}],
  ["148" , {vasca: 313, raddrizzatore: 4}],
  ["149" , {vasca: 313, raddrizzatore: 5}],
  ["150" , {vasca: 313, raddrizzatore: 6}],
  ["151" , {vasca: 313, raddrizzatore: 7}],
  ["152" , {vasca: 313, raddrizzatore: 8}],
  ["153" , {vasca: 313, raddrizzatore: 9}],
  ["154" , {vasca: 313, raddrizzatore: 10}],
  ["155" , {vasca: 313, raddrizzatore: 11}],
  ["156" , {vasca: 313, raddrizzatore: 12}],
  ["157" , {vasca: 314, raddrizzatore: 1}],
  ["158" , {vasca: 314, raddrizzatore: 2}],
  ["159" , {vasca: 314, raddrizzatore: 3}],
  ["160" , {vasca: 314, raddrizzatore: 4}],
  ["161" , {vasca: 314, raddrizzatore: 5}],
  ["162" , {vasca: 314, raddrizzatore: 6}],
  ["163" , {vasca: 314, raddrizzatore: 7}],
  ["164" , {vasca: 314, raddrizzatore: 8}],
  ["165" , {vasca: 314, raddrizzatore: 9}],
  ["166" , {vasca: 314, raddrizzatore: 10}],
  ["167" , {vasca: 314, raddrizzatore: 11}],
  ["168" , {vasca: 314, raddrizzatore: 12}],
  ["169" , {vasca: 315, raddrizzatore: 1}],
  ["170" , {vasca: 315, raddrizzatore: 2}],
  ["171" , {vasca: 315, raddrizzatore: 3}],
  ["172" , {vasca: 315, raddrizzatore: 4}],
  ["173" , {vasca: 315, raddrizzatore: 5}],
  ["174" , {vasca: 315, raddrizzatore: 6}],
  ["175" , {vasca: 315, raddrizzatore: 7}],
  ["176" , {vasca: 315, raddrizzatore: 8}],
  ["177" , {vasca: 315, raddrizzatore: 9}],
  ["178" , {vasca: 315, raddrizzatore: 10}],
  ["179" , {vasca: 315, raddrizzatore: 11}],
  ["180" , {vasca: 315, raddrizzatore: 12}],
  ["181" , {vasca: 316, raddrizzatore: 1}],
  ["182" , {vasca: 316, raddrizzatore: 2}],
  ["183" , {vasca: 316, raddrizzatore: 3}],
  ["184" , {vasca: 316, raddrizzatore: 4}],
  ["185" , {vasca: 316, raddrizzatore: 5}],
  ["186" , {vasca: 316, raddrizzatore: 6}],
  ["187" , {vasca: 316, raddrizzatore: 7}],
  ["188" , {vasca: 316, raddrizzatore: 8}],
  ["189" , {vasca: 316, raddrizzatore: 9}],
  ["190" , {vasca: 316, raddrizzatore: 10}],
  ["191" , {vasca: 316, raddrizzatore: 11}],
  ["192" , {vasca: 316, raddrizzatore: 12}],
  ["193" , {vasca: 317, raddrizzatore: 1}],
  ["194" , {vasca: 317, raddrizzatore: 2}],
  ["195" , {vasca: 317, raddrizzatore: 3}],
  ["196" , {vasca: 317, raddrizzatore: 4}],
  ["197" , {vasca: 317, raddrizzatore: 5}],
  ["198" , {vasca: 317, raddrizzatore: 6}],
  ["199" , {vasca: 317, raddrizzatore: 7}],
  ["200" , {vasca: 317, raddrizzatore: 8}],
  ["201" , {vasca: 317, raddrizzatore: 9}],
  ["202" , {vasca: 317, raddrizzatore: 10}],
  ["203" , {vasca: 317, raddrizzatore: 11}],
  ["204" , {vasca: 317, raddrizzatore: 12}],
  ["205" , {vasca: 318, raddrizzatore: 1}],
  ["206" , {vasca: 318, raddrizzatore: 2}],
  ["207" , {vasca: 318, raddrizzatore: 3}],
  ["208" , {vasca: 318, raddrizzatore: 4}],
  ["209" , {vasca: 318, raddrizzatore: 5}],
  ["210" , {vasca: 318, raddrizzatore: 6}],
  ["211" , {vasca: 318, raddrizzatore: 7}],
  ["212" , {vasca: 318, raddrizzatore: 8}],
  ["213" , {vasca: 318, raddrizzatore: 9}],
  ["214" , {vasca: 318, raddrizzatore: 10}],
  ["215" , {vasca: 318, raddrizzatore: 11}],
  ["216" , {vasca: 318, raddrizzatore: 12}],
  ["217" , {vasca: 319, raddrizzatore: 1}],
  ["218" , {vasca: 319, raddrizzatore: 2}],
  ["219" , {vasca: 319, raddrizzatore: 3}],
  ["220" , {vasca: 319, raddrizzatore: 4}],
  ["221" , {vasca: 319, raddrizzatore: 5}],
  ["222" , {vasca: 319, raddrizzatore: 6}],
  ["223" , {vasca: 319, raddrizzatore: 7}],
  ["224" , {vasca: 319, raddrizzatore: 8}],
  ["225" , {vasca: 319, raddrizzatore: 9}],
  ["226" , {vasca: 319, raddrizzatore: 10}],
  ["227" , {vasca: 319, raddrizzatore: 11}],
  ["228" , {vasca: 319, raddrizzatore: 12}],
  ["229" , {vasca: 320, raddrizzatore: 1}],
  ["230" , {vasca: 320, raddrizzatore: 2}],
  ["231" , {vasca: 320, raddrizzatore: 3}],
  ["232" , {vasca: 320, raddrizzatore: 4}],
  ["233" , {vasca: 320, raddrizzatore: 5}],
  ["234" , {vasca: 320, raddrizzatore: 6}],
  ["235" , {vasca: 320, raddrizzatore: 7}],
  ["236" , {vasca: 320, raddrizzatore: 8}],
  ["237" , {vasca: 320, raddrizzatore: 9}],
  ["238" , {vasca: 320, raddrizzatore: 10}],
  ["239" , {vasca: 320, raddrizzatore: 11}],
  ["240" , {vasca: 320, raddrizzatore: 12}]
];

// Map with Raddrizzatori ID binding with the Vasca and Raddrizzatore number 
var vascheMap = new Map(vasche);
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
let strEncoding = 'utf8';
if(os.platform() === 'win32') {
  let [dwMajorVersion, dwMinorVersion, dwBuildNumber] = os.release().split(".").map(Number);
  if(dwMajorVersion < 6) {
    infoLogger.info(`@MACHINE >> ${os.platform()} - ${dwMajorVersion}`);
    strEncoding = 'binary';
  }
} else {
  infoLogger.info(`@MACHINE >> ${os.platform()}`);
}

// ----------------------------------------- Passport ----------------------------------------
// Passport (Authentication)
var passport = require('passport');
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

let tmp = "";

let updateConfigFile = () => {

  let newConfig = {
    user: User,
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


