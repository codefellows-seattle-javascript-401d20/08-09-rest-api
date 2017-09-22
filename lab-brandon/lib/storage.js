const fs = require('fs-extra');

//ensures the stroage file exists
fs.pathExists(process.env.STORAGE_PATH)
.then((exists) => {
  if(!exists)
    fs.writeJSON(process.env.STORAGE_PATH, []);
});
