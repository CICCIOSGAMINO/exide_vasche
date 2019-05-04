"use strict";

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Exide - Vasche / Raddrizzatori SW 
 */
var version = 'v2.0.2';

var fs = require('fs');

var path = require('path');

var readline = require('readline'); // Load config file 


var CONFIG_FILE = 'config.json';
var config = JSON.parse(fs.readFileSync(`./${CONFIG_FILE}`, 'utf8'));
var User = config.user;

var session = require('express-session');

var express = require('express');

var app = express();
var port = 8080; // Winston Logger 

var winston = require('winston'); // Winston - Creating Info Logger on Console 


var infoLogger = new winston.Logger({
  transports: [new winston.transports.Console(), new winston.transports.File({
    filename: 'logs/info.log'
  })]
}); // Winston - Creataing Error/Warning Logger on File 

var errorLogger = new winston.Logger({
  transports: [new winston.transports.File({
    filename: 'logs/errors.log'
  })]
});
winston.handleExceptions(new winston.transports.File({
  filename: 'logs/exceptions.log'
})); // Path to ../csv/data.csv

var pathCsv = path.join(__dirname, 'csv', 'data.csv'); // Path to ../reg

var pathReg = path.join(__dirname, 'reg'); // Path to ../reg/temp

var pathRegTemp = path.join(__dirname, 'reg', 'temp');
var vasche = [["1", {
  vasca: 301,
  raddrizzatore: 1
}], ["2", {
  vasca: 301,
  raddrizzatore: 2
}], ["3", {
  vasca: 301,
  raddrizzatore: 3
}], ["4", {
  vasca: 301,
  raddrizzatore: 4
}], ["5", {
  vasca: 301,
  raddrizzatore: 5
}], ["6", {
  vasca: 301,
  raddrizzatore: 6
}], ["7", {
  vasca: 301,
  raddrizzatore: 7
}], ["8", {
  vasca: 301,
  raddrizzatore: 8
}], ["9", {
  vasca: 301,
  raddrizzatore: 9
}], ["10", {
  vasca: 301,
  raddrizzatore: 10
}], ["11", {
  vasca: 301,
  raddrizzatore: 11
}], ["12", {
  vasca: 301,
  raddrizzatore: 12
}], ["13", {
  vasca: 302,
  raddrizzatore: 1
}], ["14", {
  vasca: 302,
  raddrizzatore: 2
}], ["15", {
  vasca: 302,
  raddrizzatore: 3
}], ["16", {
  vasca: 302,
  raddrizzatore: 4
}], ["17", {
  vasca: 302,
  raddrizzatore: 5
}], ["18", {
  vasca: 302,
  raddrizzatore: 6
}], ["19", {
  vasca: 302,
  raddrizzatore: 7
}], ["20", {
  vasca: 302,
  raddrizzatore: 8
}], ["21", {
  vasca: 302,
  raddrizzatore: 9
}], ["22", {
  vasca: 302,
  raddrizzatore: 10
}], ["23", {
  vasca: 302,
  raddrizzatore: 11
}], ["24", {
  vasca: 302,
  raddrizzatore: 12
}], ["25", {
  vasca: 303,
  raddrizzatore: 1
}], ["26", {
  vasca: 303,
  raddrizzatore: 2
}], ["27", {
  vasca: 303,
  raddrizzatore: 3
}], ["28", {
  vasca: 303,
  raddrizzatore: 4
}], ["29", {
  vasca: 303,
  raddrizzatore: 5
}], ["30", {
  vasca: 303,
  raddrizzatore: 6
}], ["31", {
  vasca: 303,
  raddrizzatore: 7
}], ["32", {
  vasca: 303,
  raddrizzatore: 8
}], ["33", {
  vasca: 303,
  raddrizzatore: 9
}], ["34", {
  vasca: 303,
  raddrizzatore: 10
}], ["35", {
  vasca: 303,
  raddrizzatore: 11
}], ["36", {
  vasca: 303,
  raddrizzatore: 12
}], ["37", {
  vasca: 304,
  raddrizzatore: 1
}], ["38", {
  vasca: 304,
  raddrizzatore: 2
}], ["39", {
  vasca: 304,
  raddrizzatore: 3
}], ["40", {
  vasca: 304,
  raddrizzatore: 4
}], ["41", {
  vasca: 304,
  raddrizzatore: 5
}], ["42", {
  vasca: 304,
  raddrizzatore: 6
}], ["43", {
  vasca: 304,
  raddrizzatore: 7
}], ["44", {
  vasca: 304,
  raddrizzatore: 8
}], ["45", {
  vasca: 304,
  raddrizzatore: 9
}], ["46", {
  vasca: 304,
  raddrizzatore: 10
}], ["47", {
  vasca: 304,
  raddrizzatore: 11
}], ["48", {
  vasca: 304,
  raddrizzatore: 12
}], ["49", {
  vasca: 305,
  raddrizzatore: 1
}], ["50", {
  vasca: 305,
  raddrizzatore: 2
}], ["51", {
  vasca: 305,
  raddrizzatore: 3
}], ["52", {
  vasca: 305,
  raddrizzatore: 4
}], ["53", {
  vasca: 305,
  raddrizzatore: 5
}], ["54", {
  vasca: 305,
  raddrizzatore: 6
}], ["55", {
  vasca: 305,
  raddrizzatore: 7
}], ["56", {
  vasca: 305,
  raddrizzatore: 8
}], ["57", {
  vasca: 305,
  raddrizzatore: 9
}], ["58", {
  vasca: 305,
  raddrizzatore: 10
}], ["59", {
  vasca: 305,
  raddrizzatore: 11
}], ["60", {
  vasca: 305,
  raddrizzatore: 12
}], ["61", {
  vasca: 306,
  raddrizzatore: 1
}], ["62", {
  vasca: 306,
  raddrizzatore: 2
}], ["63", {
  vasca: 306,
  raddrizzatore: 3
}], ["64", {
  vasca: 306,
  raddrizzatore: 4
}], ["65", {
  vasca: 306,
  raddrizzatore: 5
}], ["66", {
  vasca: 306,
  raddrizzatore: 6
}], ["67", {
  vasca: 306,
  raddrizzatore: 7
}], ["68", {
  vasca: 306,
  raddrizzatore: 8
}], ["69", {
  vasca: 306,
  raddrizzatore: 9
}], ["70", {
  vasca: 306,
  raddrizzatore: 10
}], ["71", {
  vasca: 306,
  raddrizzatore: 11
}], ["72", {
  vasca: 306,
  raddrizzatore: 12
}], ["73", {
  vasca: 307,
  raddrizzatore: 1
}], ["74", {
  vasca: 307,
  raddrizzatore: 2
}], ["75", {
  vasca: 307,
  raddrizzatore: 3
}], ["76", {
  vasca: 307,
  raddrizzatore: 4
}], ["77", {
  vasca: 307,
  raddrizzatore: 5
}], ["78", {
  vasca: 307,
  raddrizzatore: 6
}], ["79", {
  vasca: 307,
  raddrizzatore: 7
}], ["80", {
  vasca: 307,
  raddrizzatore: 8
}], ["81", {
  vasca: 307,
  raddrizzatore: 9
}], ["82", {
  vasca: 307,
  raddrizzatore: 10
}], ["83", {
  vasca: 307,
  raddrizzatore: 11
}], ["84", {
  vasca: 307,
  raddrizzatore: 12
}], ["85", {
  vasca: 308,
  raddrizzatore: 1
}], ["86", {
  vasca: 308,
  raddrizzatore: 2
}], ["87", {
  vasca: 308,
  raddrizzatore: 3
}], ["88", {
  vasca: 308,
  raddrizzatore: 4
}], ["89", {
  vasca: 308,
  raddrizzatore: 5
}], ["90", {
  vasca: 308,
  raddrizzatore: 6
}], ["91", {
  vasca: 308,
  raddrizzatore: 7
}], ["92", {
  vasca: 308,
  raddrizzatore: 8
}], ["93", {
  vasca: 308,
  raddrizzatore: 9
}], ["94", {
  vasca: 308,
  raddrizzatore: 10
}], ["95", {
  vasca: 308,
  raddrizzatore: 11
}], ["96", {
  vasca: 308,
  raddrizzatore: 12
}], ["97", {
  vasca: 309,
  raddrizzatore: 1
}], ["98", {
  vasca: 309,
  raddrizzatore: 2
}], ["99", {
  vasca: 309,
  raddrizzatore: 3
}], ["100", {
  vasca: 309,
  raddrizzatore: 4
}], ["101", {
  vasca: 309,
  raddrizzatore: 5
}], ["102", {
  vasca: 309,
  raddrizzatore: 6
}], ["103", {
  vasca: 309,
  raddrizzatore: 7
}], ["104", {
  vasca: 309,
  raddrizzatore: 8
}], ["105", {
  vasca: 309,
  raddrizzatore: 9
}], ["106", {
  vasca: 309,
  raddrizzatore: 10
}], ["107", {
  vasca: 309,
  raddrizzatore: 11
}], ["108", {
  vasca: 309,
  raddrizzatore: 12
}], ["109", {
  vasca: 310,
  raddrizzatore: 1
}], ["110", {
  vasca: 310,
  raddrizzatore: 2
}], ["111", {
  vasca: 310,
  raddrizzatore: 3
}], ["112", {
  vasca: 310,
  raddrizzatore: 4
}], ["113", {
  vasca: 310,
  raddrizzatore: 5
}], ["114", {
  vasca: 310,
  raddrizzatore: 6
}], ["115", {
  vasca: 310,
  raddrizzatore: 7
}], ["116", {
  vasca: 310,
  raddrizzatore: 8
}], ["117", {
  vasca: 310,
  raddrizzatore: 9
}], ["118", {
  vasca: 310,
  raddrizzatore: 10
}], ["119", {
  vasca: 310,
  raddrizzatore: 11
}], ["120", {
  vasca: 310,
  raddrizzatore: 12
}], ["121", {
  vasca: 311,
  raddrizzatore: 1
}], ["122", {
  vasca: 311,
  raddrizzatore: 2
}], ["123", {
  vasca: 311,
  raddrizzatore: 3
}], ["124", {
  vasca: 311,
  raddrizzatore: 4
}], ["125", {
  vasca: 311,
  raddrizzatore: 5
}], ["126", {
  vasca: 311,
  raddrizzatore: 6
}], ["127", {
  vasca: 311,
  raddrizzatore: 7
}], ["128", {
  vasca: 311,
  raddrizzatore: 8
}], ["129", {
  vasca: 311,
  raddrizzatore: 9
}], ["130", {
  vasca: 311,
  raddrizzatore: 10
}], ["131", {
  vasca: 311,
  raddrizzatore: 11
}], ["132", {
  vasca: 311,
  raddrizzatore: 12
}], ["133", {
  vasca: 312,
  raddrizzatore: 1
}], ["134", {
  vasca: 312,
  raddrizzatore: 2
}], ["135", {
  vasca: 312,
  raddrizzatore: 3
}], ["136", {
  vasca: 312,
  raddrizzatore: 4
}], ["137", {
  vasca: 312,
  raddrizzatore: 5
}], ["138", {
  vasca: 312,
  raddrizzatore: 6
}], ["139", {
  vasca: 312,
  raddrizzatore: 7
}], ["140", {
  vasca: 312,
  raddrizzatore: 8
}], ["141", {
  vasca: 312,
  raddrizzatore: 9
}], ["142", {
  vasca: 312,
  raddrizzatore: 10
}], ["143", {
  vasca: 312,
  raddrizzatore: 11
}], ["144", {
  vasca: 312,
  raddrizzatore: 12
}], ["145", {
  vasca: 313,
  raddrizzatore: 1
}], ["146", {
  vasca: 313,
  raddrizzatore: 2
}], ["147", {
  vasca: 313,
  raddrizzatore: 3
}], ["148", {
  vasca: 313,
  raddrizzatore: 4
}], ["149", {
  vasca: 313,
  raddrizzatore: 5
}], ["150", {
  vasca: 313,
  raddrizzatore: 6
}], ["151", {
  vasca: 313,
  raddrizzatore: 7
}], ["152", {
  vasca: 313,
  raddrizzatore: 8
}], ["153", {
  vasca: 313,
  raddrizzatore: 9
}], ["154", {
  vasca: 313,
  raddrizzatore: 10
}], ["155", {
  vasca: 313,
  raddrizzatore: 11
}], ["156", {
  vasca: 313,
  raddrizzatore: 12
}], ["157", {
  vasca: 314,
  raddrizzatore: 1
}], ["158", {
  vasca: 314,
  raddrizzatore: 2
}], ["159", {
  vasca: 314,
  raddrizzatore: 3
}], ["160", {
  vasca: 314,
  raddrizzatore: 4
}], ["161", {
  vasca: 314,
  raddrizzatore: 5
}], ["162", {
  vasca: 314,
  raddrizzatore: 6
}], ["163", {
  vasca: 314,
  raddrizzatore: 7
}], ["164", {
  vasca: 314,
  raddrizzatore: 8
}], ["165", {
  vasca: 314,
  raddrizzatore: 9
}], ["166", {
  vasca: 314,
  raddrizzatore: 10
}], ["167", {
  vasca: 314,
  raddrizzatore: 11
}], ["168", {
  vasca: 314,
  raddrizzatore: 12
}], ["169", {
  vasca: 315,
  raddrizzatore: 1
}], ["170", {
  vasca: 315,
  raddrizzatore: 2
}], ["171", {
  vasca: 315,
  raddrizzatore: 3
}], ["172", {
  vasca: 315,
  raddrizzatore: 4
}], ["173", {
  vasca: 315,
  raddrizzatore: 5
}], ["174", {
  vasca: 315,
  raddrizzatore: 6
}], ["175", {
  vasca: 315,
  raddrizzatore: 7
}], ["176", {
  vasca: 315,
  raddrizzatore: 8
}], ["177", {
  vasca: 315,
  raddrizzatore: 9
}], ["178", {
  vasca: 315,
  raddrizzatore: 10
}], ["179", {
  vasca: 315,
  raddrizzatore: 11
}], ["180", {
  vasca: 315,
  raddrizzatore: 12
}], ["181", {
  vasca: 316,
  raddrizzatore: 1
}], ["182", {
  vasca: 316,
  raddrizzatore: 2
}], ["183", {
  vasca: 316,
  raddrizzatore: 3
}], ["184", {
  vasca: 316,
  raddrizzatore: 4
}], ["185", {
  vasca: 316,
  raddrizzatore: 5
}], ["186", {
  vasca: 316,
  raddrizzatore: 6
}], ["187", {
  vasca: 316,
  raddrizzatore: 7
}], ["188", {
  vasca: 316,
  raddrizzatore: 8
}], ["189", {
  vasca: 316,
  raddrizzatore: 9
}], ["190", {
  vasca: 316,
  raddrizzatore: 10
}], ["191", {
  vasca: 316,
  raddrizzatore: 11
}], ["192", {
  vasca: 316,
  raddrizzatore: 12
}], ["193", {
  vasca: 317,
  raddrizzatore: 1
}], ["194", {
  vasca: 317,
  raddrizzatore: 2
}], ["195", {
  vasca: 317,
  raddrizzatore: 3
}], ["196", {
  vasca: 317,
  raddrizzatore: 4
}], ["197", {
  vasca: 317,
  raddrizzatore: 5
}], ["198", {
  vasca: 317,
  raddrizzatore: 6
}], ["199", {
  vasca: 317,
  raddrizzatore: 7
}], ["200", {
  vasca: 317,
  raddrizzatore: 8
}], ["201", {
  vasca: 317,
  raddrizzatore: 9
}], ["202", {
  vasca: 317,
  raddrizzatore: 10
}], ["203", {
  vasca: 317,
  raddrizzatore: 11
}], ["204", {
  vasca: 317,
  raddrizzatore: 12
}], ["205", {
  vasca: 318,
  raddrizzatore: 1
}], ["206", {
  vasca: 318,
  raddrizzatore: 2
}], ["207", {
  vasca: 318,
  raddrizzatore: 3
}], ["208", {
  vasca: 318,
  raddrizzatore: 4
}], ["209", {
  vasca: 318,
  raddrizzatore: 5
}], ["210", {
  vasca: 318,
  raddrizzatore: 6
}], ["211", {
  vasca: 318,
  raddrizzatore: 7
}], ["212", {
  vasca: 318,
  raddrizzatore: 8
}], ["213", {
  vasca: 318,
  raddrizzatore: 9
}], ["214", {
  vasca: 318,
  raddrizzatore: 10
}], ["215", {
  vasca: 318,
  raddrizzatore: 11
}], ["216", {
  vasca: 318,
  raddrizzatore: 12
}], ["217", {
  vasca: 319,
  raddrizzatore: 1
}], ["218", {
  vasca: 319,
  raddrizzatore: 2
}], ["219", {
  vasca: 319,
  raddrizzatore: 3
}], ["220", {
  vasca: 319,
  raddrizzatore: 4
}], ["221", {
  vasca: 319,
  raddrizzatore: 5
}], ["222", {
  vasca: 319,
  raddrizzatore: 6
}], ["223", {
  vasca: 319,
  raddrizzatore: 7
}], ["224", {
  vasca: 319,
  raddrizzatore: 8
}], ["225", {
  vasca: 319,
  raddrizzatore: 9
}], ["226", {
  vasca: 319,
  raddrizzatore: 10
}], ["227", {
  vasca: 319,
  raddrizzatore: 11
}], ["228", {
  vasca: 319,
  raddrizzatore: 12
}], ["229", {
  vasca: 320,
  raddrizzatore: 1
}], ["230", {
  vasca: 320,
  raddrizzatore: 2
}], ["231", {
  vasca: 320,
  raddrizzatore: 3
}], ["232", {
  vasca: 320,
  raddrizzatore: 4
}], ["233", {
  vasca: 320,
  raddrizzatore: 5
}], ["234", {
  vasca: 320,
  raddrizzatore: 6
}], ["235", {
  vasca: 320,
  raddrizzatore: 7
}], ["236", {
  vasca: 320,
  raddrizzatore: 8
}], ["237", {
  vasca: 320,
  raddrizzatore: 9
}], ["238", {
  vasca: 320,
  raddrizzatore: 10
}], ["239", {
  vasca: 320,
  raddrizzatore: 11
}], ["240", {
  vasca: 320,
  raddrizzatore: 12
}]]; // Map with Raddrizzatori ID binding with the Vasca and Raddrizzatore number 

var vascheMap = new Map(vasche); // Map with the Web Data [Vasca, [0, 0, 0, 0, 52.29, 0, 0, 0, 0, 49, 0, 0]]

var tempPhaseOneSevenMap = new Map();
var tempPhaseEightEndMap = new Map(); // Map the Value Duration, Tmax1-7, Tmax8-17 from data.csv file 

var tempDurationOneSevenMap = new Map();
var tempOneSevenBlob = [];
var tempEightEndBlob = [];
var tempDurationBlob = []; // Set the Temperature MAX (red the background in web page)

var alarmMaxTempOneSeven = config.alarmMaxTempOneSeven;
var alarmMaxTempEightEnd = config.alarmMaxTempEightEnd;
var durationh = config.durationh; // Prevent the Double event on fs.watch 

var doNotDoubleWatchOne = false;
var doNotDoubleWatchTwo = false;
var doNotDoubleWatchThree = false; // ----------------------------------------- Passport ----------------------------------------
// Passport (Authentication)

var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
  if (User.username != username) {
    return done(null, false, {
      message: 'Incorrect username'
    });
  }

  if (User.password != password) {
    return done(null, false, {
      message: 'Incorrect password'
    });
  }

  return done(null, User);
}));
passport.serializeUser(function (user, done) {
  done(null, User.username);
});
passport.deserializeUser(function (id, done) {
  done(null, User);
}); // ----------------------------------------- Express ------------------------------------------

app.use(express.static(path.join(__dirname, 'public'))); // express-session must be used before passport 

app.use(session({
  secret: 'CICCIO',
  resave: false,
  saveUninitialized: false
})); // Support JSON & URL encoded bodies middleware

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/', function (req, res, next) {
  res.render('index', {
    dataOneSeven: tempOneSevenBlob,
    dataEightEnd: tempEightEndBlob,
    alarmMaxTempOneSeven: alarmMaxTempOneSeven,
    alarmMaxTempEightEnd: alarmMaxTempEightEnd,
    logged: req.user ? true : false,
    version: version
  });
});
app.get('/csv', function (req, res, next) {
  res.render('csv', {
    csvData: tempDurationBlob,
    alarmMaxDuration: durationh,
    tmaxone: alarmMaxTempOneSeven,
    tmaxend: alarmMaxTempEightEnd
  });
});
app.get('/login', function (req, res) {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login', {});
  }
});
app.post("/login", passport.authenticate('local', {
  failureRedirect: '/login'
}), function (req, res) {
  res.redirect('/');
});
app.get("/params", function (req, res) {
  // Check auth 
  if (req.user) {
    res.render('params', {
      tmaxone: alarmMaxTempOneSeven,
      tmaxend: alarmMaxTempEightEnd,
      durationh: durationh
    });
  } else {
    res.render('error404');
  }
});
app.post("/save", function (req, res) {
  if (!isNaN(req.body.durationh) && !isNaN(req.body.tmaxone) && !isNaN(req.body.tmaxend)) {
    durationh = req.body.durationh;
    alarmMaxTempOneSeven = req.body.tmaxone;
    alarmMaxTempEightEnd = req.body.tmaxend;
    updateConfigFile();
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});
app.get("/error", function (req, res) {
  res.render('error404', {});
});
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect('/');
});
app.all('*', function (req, res) {
  res.redirect('/error');
});
app.listen(port, function () {
  infoLogger.info(`@SERVER >> ACTIVE ON PORT:${port}`);
});
var tmp = "";

var updateConfigFile = function updateConfigFile() {
  var newConfig = {
    user: User,
    alarmMaxTempOneSeven: alarmMaxTempOneSeven,
    alarmMaxTempEightEnd: alarmMaxTempEightEnd,
    durationh: durationh
  };
  var data = JSON.stringify(newConfig, null, 2);
  fs.writeFileSync(CONFIG_FILE, data);
}; // ------------------------------------- Watching csv/data.csv --------------------------


fs.watch(pathCsv, function (eventType, filename) {
  doNotDoubleWatchThree = !doNotDoubleWatchThree;

  if (doNotDoubleWatchThree) {
    try {
      // File Exist 
      if (fs.existsSync(pathCsv)) {
        // Create the LineReader and the ReadStream
        var readStream = fs.createReadStream(pathCsv);
        var lineReader = readline.createInterface({
          input: readStream
        });
        lineReader.on('line', function (line) {
          var _line$trim$split = line.trim().split(';'),
              _line$trim$split2 = _slicedToArray(_line$trim$split, 7),
              vascas = _line$trim$split2[0],
              radds = _line$trim$split2[1],
              ibat = _line$trim$split2[2],
              dates = _line$trim$split2[3],
              durations = _line$trim$split2[4],
              tmaxones = _line$trim$split2[5],
              tmaxends = _line$trim$split2[6];

          var vasca = parseInt(vascas);
          var radd = parseInt(radds);
          var date = new Date(dates); // Check right record read

          if (!isNaN(vasca) && !isNaN(radd)) {
            // Get the hours (to compare, the string to print is durations already ok)
            var durath = parseInt(durations);
            var tmaxone = parseFloat(tmaxones.replace(',', '.')).toPrecision(4);
            var tmaxend = parseFloat(tmaxends.replace(',', '.')).toPrecision(4); // crate a key vasca;radd

            var vascradd = `${vasca};${radd}`; // get actual value in the map (vasca;radd key) date;

            var actual = tempDurationOneSevenMap.get(vascradd);

            if (actual != undefined) {
              // Save the recent value 
              if (actual[0].getTime() <= date.getTime()) {
                tempDurationOneSevenMap.set(vascradd, [date, durath, durations, tmaxone, tmaxend]);
              }
            } else {
              // Key not present write record date, duration(h), tmaxone(float), tmaxend(float)
              tempDurationOneSevenMap.set(vascradd, [date, durath, durations, tmaxone, tmaxend]);
            }
          }
        }).on('close', function () {
          // update the blob 
          updateCsvBlob();
        });
      }
    } catch (err) {
      errorLogger.error(`@ERROR(CATCH) >> data.csv: ${err}`);
    }
  } // End doNotDoubleWatchThree 

});
/**
 * Update the Blob of CSV table - Prepare the data for the Pug template 
 */

var updateCsvBlob = function updateCsvBlob() {
  tempDurationBlob = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = tempDurationOneSevenMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      var _key$split = key.split(';'),
          _key$split2 = _slicedToArray(_key$split, 2),
          vasca = _key$split2[0],
          radd = _key$split2[1];

      var _value = _slicedToArray(value, 5),
          date = _value[0],
          durath = _value[1],
          durations = _value[2],
          maxtone = _value[3],
          maxtend = _value[4];

      tempDurationBlob.push([vasca, radd, date, durath, durations, maxtone, maxtend]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}; // ------------------------------------- Watching /reg ----------------------------------
// Files write at the end of process 


fs.watch(pathReg, function (eventType, filename) {
  doNotDoubleWatchOne = !doNotDoubleWatchOne;

  if (doNotDoubleWatchOne && filename != tmp) {
    tmp = filename; // recomponse file name due to problem with windows XP win1252 encoding

    var buffFilename = `${Buffer(filename, 'binary').toString()}`; // Windows XP Windows XP Windows XP Windows XP
    // Linux/Windows10 env you can use filename 
    // let buffFilename = filename                       // Linux Linux Linux Linux Linux Linux Linux Linux Linux Linux Linux

    var p = path.join(pathReg, buffFilename); // If is a file process it or skip if folder 

    if (path.parse(p).ext === '.TRR' || path.parse(p).ext === '.trr') {
      // Extract values from file.name eg. numbers for vasca, radd etc  >> 115 308,5,5559,20,02,08,03,11,2016
      var _filename$match = filename.match(/^\d+|\d+\b|\d+(?=\w)/g),
          _filename$match2 = _toArray(_filename$match),
          id = _filename$match2[0],
          vasc = _filename$match2[1],
          radd = _filename$match2[2],
          battery = _filename$match2[3],
          date = _filename$match2.slice(4); // If File Exist and File_Name parsed correct open it 


      try {
        if (vasc !== 'undefined' && fs.existsSync(p)) {
          // Create the LineReader and the ReadStream
          var readStream = fs.createReadStream(p);
          var lineReader = readline.createInterface({
            input: readStream
          }); // Two MAX temp one for Phase 1-7 one for phase 8-17

          var maxTempPhaseEightEnd = 0.0;
          var maxTempPhaseOneSeven = 0.0;
          var startDate = new Date();
          var endDate = new Date(0); // Read the line from file 

          lineReader.on('line', function (line) {
            var _line$trim$split3 = line.trim().split(';'),
                _line$trim$split4 = _slicedToArray(_line$trim$split3, 10),
                status = _line$trim$split4[0],
                type = _line$trim$split4[1],
                nphase = _line$trim$split4[2],
                datePhase = _line$trim$split4[3],
                tprg = _line$trim$split4[4],
                ibat = _line$trim$split4[5],
                vbat = _line$trim$split4[6],
                tbat = _line$trim$split4[7],
                vout = _line$trim$split4[8],
                faults = _line$trim$split4[9];

            var jsDate = new Date(datePhase); // Check good reading (easy one only on first three fields)

            if (status !== 'undefined' && type !== 'undefined' && nphase !== 'undefined' && !isNaN(jsDate)) {
              var phase = parseInt(nphase);
              var temp = parseFloat(tbat.replace(',', '.')).toPrecision(4); // Find the Process endDate as starting from 1970 to raise 

              if (jsDate > endDate) {
                endDate = jsDate;
              } // Find the Process startDate starting from now() to low down 


              if (jsDate < startDate) {
                startDate = jsDate;
              } // Compute the MaxT in Phase 1-7 


              if (phase >= 1 && phase < 8) {
                if (maxTempPhaseOneSeven <= temp) {
                  maxTempPhaseOneSeven = temp;
                }
              } // Compute the MaxT in Phase 8-17


              if (phase >= 8) {
                if (maxTempPhaseEightEnd <= temp) {
                  maxTempPhaseEightEnd = temp;
                }
              }
            }
          }).on('close', function () {
            // Check Good values before writing them (easy one only two fields)
            if (vasc !== 'undefined' && radd !== 'undefined' && endDate - startDate > 0) {
              // Shape the data you need 
              var durationMins = parseInt((endDate - startDate) / 1000 / 60);
              var durationSec = durationMins % 60;
              var durationHours = parseInt(durationMins / 60);
              var duration = `${durationHours}h ${durationMins % 60}min`;
              var data = {
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
      } catch (err) {
        errorLogger.error(`@ERROR(CATCH) >> ${err}`);
      }
    }
  } // End doNotDoubleWatchOne

}); // ----------------------------------- Watching /reg/temp -------------------------------
// Files write in real-time during the cycle phase 1 -> 17 

fs.watch(pathRegTemp, function (eventType, filename) {
  doNotDoubleWatchTwo = !doNotDoubleWatchTwo;

  if (doNotDoubleWatchTwo) {
    var buffFilename = `${Buffer(filename, 'binary').toString()}`; // Windows 10 Windows 10 Windows 10 Windows 10
    // let buffFilename = filename                                       // Linux Linux  Linux Linux  Linux  Linux  Linux 

    var p = path.join(pathRegTemp, buffFilename);
    var mapKey = path.parse(filename).name; // If is a file process it or skip if folder 

    if (path.parse(p).ext === '.TRR' && vascheMap.has(mapKey)) {
      var _vascheMap$get = vascheMap.get(mapKey),
          vasca = _vascheMap$get.vasca,
          raddrizzatore = _vascheMap$get.raddrizzatore;

      try {
        // Read the file if not deleted or missing 
        if (fs.existsSync(p)) {
          var readStream = fs.createReadStream(p);
          var lineReader = readline.createInterface({
            input: readStream
          }); // Two MAX temp one for Phase 1-7 one for phase 8-17

          var maxTempPhaseEightEnd = 0.0;
          var maxTempPhaseOneSeven = 0.0; // Get the vars i need from into the file 

          lineReader.on('line', function (line) {
            var phase = parseInt(line.trim().split(';')[2]); //  Reset the Temperature MAX when new Phase 1 is found 

            if (phase == 1) {
              maxTempPhaseEightEnd = 0.0;
              maxTempPhaseOneSeven = 0.0;
            } // Handle the  1 < Phase > 8 to search for Temperature MAX 


            if (phase > 1 && phase < 8) {
              var temp = parseFloat(line.trim().split(';')[7].replace(",", ".")).toPrecision(4);

              if (maxTempPhaseOneSeven <= temp) {
                maxTempPhaseOneSeven = temp;
              }
            } // Handle the Phase >= 8 to search for Temperature MAX


            if (phase >= 8) {
              var _temp = parseFloat(line.trim().split(';')[7].replace(",", ".")).toPrecision(4);

              if (maxTempPhaseEightEnd <= _temp) {
                maxTempPhaseEightEnd = _temp;
              }
            }
          }).on('close', function () {
            // Add the new maxTempPhaseOneSeven to the temp Map 
            tempPhaseOneSevenMap.set(vasca, getRightArray(tempPhaseOneSevenMap.get(vasca), raddrizzatore, maxTempPhaseOneSeven)); // Add/Update maxTempPhaseEightEnd to the temp Map

            tempPhaseEightEndMap.set(vasca, getRightArray(tempPhaseEightEndMap.get(vasca), raddrizzatore, maxTempPhaseEightEnd)); // Update the blobs for Web View

            rewriteTemperature();
            readStream.destroy();
          });
        }
      } catch (err) {
        errorLogger.error(`@ERROR(CATCH) >> ${err}`);
      }
    }
  } // End doNotDoubleWatchTwo

});
/**
 *  Write the CSV file with Storic data, set when proces ended and a file is written 
 *  in ../reg folder
 * 
 * @param {*} data 
 */

var writeOnCsv = function writeOnCsv(data) {
  // Prepare the blob of data (easy formatting)
  var blob = `${data.vasca};${data.radd};${data.battery};${data.startDate};${data.duration};${data.maxTempPhaseOneSeven};${data.maxTempPhaseEightEnd}\r\n`; // Reading the file (we don't want duplicate)

  try {
    // Read the file if not deleted or missing 
    if (fs.existsSync(pathCsv)) {
      // File exist read > update line if needed > append if new line 
      // const readStream = fs.createReadStream(pathCsv)
      var readStream = fs.createReadStream(pathCsv);
      var lineReader = readline.createInterface({
        input: readStream
      });
      var match = false; // If i find same line i stopped the process to update file, or append new

      lineReader.on('line', function (line) {
        // Do NOT duplicate the line in CSV file 
        var _line$trim$split5 = line.trim().split(';'),
            _line$trim$split6 = _slicedToArray(_line$trim$split5, 7),
            csvVasca = _line$trim$split6[0],
            csvRadd = _line$trim$split6[1],
            csvBatt = _line$trim$split6[2],
            csvDate = _line$trim$split6[3],
            csvDuration = _line$trim$split6[4],
            csvTemp1 = _line$trim$split6[5],
            csvTemp8 = _line$trim$split6[6]; // Be Careful with the Date object, use the getTime() method to compare 


        if (parseInt(csvVasca) == data.vasca && parseInt(csvRadd) == data.radd && csvBatt == data.battery && data.startDate.getTime() == new Date(csvDate).getTime()) {
          match = true;
          lineReader.close();
        }
      }).on('close', function () {
        if (!match) {
          fs.appendFile(pathCsv, blob, function (err) {
            if (err) errorLogger.error(`@ERROR >> WRITE_CSV: ${err}`); // infoLogger.info(`@MSG >> CREATED data.csv`)
          });
        }

        readStream.destroy();
      });
    } else {
      // File NOT found Create the file with the CSV HEAD and data in first line
      var head = `VASCA;RADD;BATTERY;DATA_START;DURATA;T_MAX_1_7;T_MAX_8_17`;
      var newLine = `${head}\r\n${blob}`;
      fs.writeFile(pathCsv, newLine, function (err) {
        if (err) errorLogger.error(`@ERROR >> WRITE_CSV: ${err}`); // infoLogger.info(`@MSG >> CREATED data.csv`)
      });
    }
  } catch (err) {
    errorLogger.error(`@ERROR(CATCH) >> ${err}`);
  }
};
/**
 * ReWrite the Temperature File 
 */


var rewriteTemperature = function rewriteTemperature() {
  // prepare the stream of UTF-8 CSV data 
  var blob = "";
  tempOneSevenBlob = [];
  tempEightEndBlob = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = tempPhaseOneSevenMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          key = _step2$value[0],
          value = _step2$value[1];

      // Prepare blob to file 
      blob = blob + `${key} | ${value}\n`; // Prepare blob to Web

      tempOneSevenBlob.push([key, value]);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = tempPhaseEightEndMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _slicedToArray(_step3.value, 2),
          key = _step3$value[0],
          value = _step3$value[1];

      // Prepare blob to file 
      blob = blob + `${key} | ${value}\n`; // Prepare blob to Web

      tempEightEndBlob.push([key, value]);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
};
/**
 * Set the right order in the Raddrizzatori Array (each raddrizzatore by position
 * with the right temperature MAX value )
 */
// for max 12 fields 


var getRightArray = function getRightArray(oldArray, radd, temp) {
  if (typeof oldArray == 'undefined') {
    oldArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  oldArray[radd - 1] = temp;
  return oldArray;
};
/**
 * Log when Exit from proces 
 */


process.on('exit', function (code) {
  infoLogger.log(`@EXIT, code : + ${code}`);
});
/**
 * Extreme handling the Uncaught Exceptions 
 */

process.on('uncaughtException', function (err) {
  errorLogger.error(`@EXTREME >> ${err}`);
});
