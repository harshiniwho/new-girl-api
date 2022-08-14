const fs = require('fs');
let result = "fdsfdf"
fs.writeFile('out.json', result, err => {
    if (err) {
        console.error(err)
        return
    }
});