const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');
const mocha = new Mocha({
  reporter: 'list'
});


fs.readdirSync(__dirname)
  .filter(function(file) {
    return path.basename(file) === 'level08.test.js';
  })
  .forEach(function(file) {
      console.log(file)
    mocha.addFile(path.join(__dirname, file));
  });

// Run the tests.
mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
});