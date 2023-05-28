const nconf = require('nconf');

// I don't like initialising nconf here;
// but at the moment, Cucumber is the only place
// where it's used. Moreover, this file is one
// of the several possible entrypoints into
// the package (as it would be executed via
// a package.json script or directly on the command-line
// from cucumber cli)

nconf.env(); //.argv() doesn't work as we can't pass
//additional arguments to cucumber that it doesn't recognise
//(it throws an error)

nconf.defaults({
  //name coverage collection config settings same as Jest,
  //and give them same values as we set for Jest (in jest.config.js)
  //or as are defaulted/derived by Jest
  collectCoverage: true,
  coverageDirectory: './coverage',
});

module.exports = {};
