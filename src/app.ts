import fs from 'fs'
import path from 'path'
import { parse, init } from './parser'
//1.identifier
//2.delimiter: []{}_
//3.keyword

;(async() => {
    const source = fs.readFileSync(path.join(__dirname, '../test/d.gpp'), 'utf-8')
    init(source)
    parse()
})()