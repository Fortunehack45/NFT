const fs = require('fs');
const data = JSON.parse(fs.readFileSync('artifacts/build-info/17b9767b0ab7a72d52d96348e59b3f5f.json'));
console.log(JSON.stringify(data.input.settings, null, 2));
console.log('solcVersion:', data.solcVersion);
