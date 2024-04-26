import fs from 'fs'
import path from 'path'
import { parser } from './parser'
//1.identifier
//2.delimiter: []{}_
//3.keyword

;(async() => {
    const source = fs.readFileSync(path.join(__dirname, '../test/c.gpp'), 'utf-8')
    parser(source)
})()