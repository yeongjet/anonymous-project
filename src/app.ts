import fs from 'fs'
import path from 'path'
//1.identifier
//2.delimiter: []{}_
//3.keyword

;(async() => {
    const source = fs.readFileSync(path.join(__dirname, '../test/a.mbk'), 'utf-8')
    
})()