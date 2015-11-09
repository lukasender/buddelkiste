/**
 * Statistical data such as view counts for each post are stored in a JSON
 * file (see STATS_FILE).
 *
 * STATS_FILE is read once when initialising the module (ensureStatsExists).
 *
 * Stats are stored for every ``<requestsCount> % <THRESHOLD> == 0`` request
 * to the STATS_FILE.
 */

var fs = require('fs');

var STATS_FILE = __dirname + '/stats.json';
var statsData = {};

var requestsCount = 0;
var THRESHOLD = 5;

function ensureStatsExists() {
  // Does it exist?
  fs.exists(STATS_FILE, function(exists) {
    if (!exists) {
      // Create it with an empty JSON object.
      fs.writeFile(STATS_FILE, '{}', function() {
        console.log('Ensured that stats file \'' + STATS_FILE + '\' exists.');
      });
    } else {
      // read it and initialise ``statsData``
      console.log('Stats file \'' + STATS_FILE + '\' already existed.');
      readStats(function(err, stats) {
        if (err) throw err;  // the file may be corrupt -> fail hard.
        statsData = stats;
      });
    }
  });
}
ensureStatsExists();

function readStats(cb) {
  // Read STATS_FILE
  fs.readFile(STATS_FILE, {encoding: 'utf8'}, function(err, data) {
    if (err) return cb(err);
    var dataJson = null;
    try {
      dataJson = JSON.parse(data);
    } catch (exception) {
      return cb(exception);
    }
    cb(null, dataJson);
  });
}

function writeStats(stats) {
  // Write to STATS_FILE
  var statsStr = JSON.stringify(stats);  // do not catch exceptions,
                                         // let it fail hard
  fs.writeFile(STATS_FILE, statsStr, function(err) {
    if (err) {
      console.log('Could not write to \'' + STATS_FILE + '\'');
      // fail hard.
      throw err;
    }
  });
}

function updateStats(path, newValueCallback, threshold) {
  /**
   * @param path: a unique identifier: The blog posts's path in this case.
   */
  var value = statsData[path] || 0;
  var syncThreshold = threshold || THRESHOLD;
  statsData[path] = ++value;
  // update the STATS_FILE if enough visitors viewed posts.
  if (++requestsCount % syncThreshold == 0) {
    writeStats(statsData);
  }
  newValueCallback(value);
}

module.exports = {
  updateStats: updateStats,
  readStats: readStats,
  writeStats: writeStats
};
