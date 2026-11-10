// Just copies the pre-built .tgz - no compilation needed
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
const dst = process.argv[3];
fs.copyFileSync(src, dst);
