import fs from "fs"
import path from "path"
import { UnexpectedComment } from './error'
import { ParseState, letters, LowercaseGreekLetter, UppercaseGreekLetter } from "./definition"

const state: ParseState = { lineNumber: 1 }
const p = [...Object.values(LowercaseGreekLetter), ...Object.values(UppercaseGreekLetter)]
console.log(p)
const parser = (source: string, state: ParseState) => {
    let p = 0
    const t = source
    const c = t[p]
    const s = {
        lnum: state.lineNumber
    }
    if (letters.includes(c)) {
        while(true){
            p++
        }
    }
    switch (c) {
        case 'f':
            s.lnum++
            p++
        case '/':
            if (t[p + 1] === '*') {
                p += 2;
                while (true) {
                    if (t[p] === '\0' && p >= t.length-1) {
                        throw UnexpectedComment
                    }
                    if (t[p] === '\n'){
                        s.lnum++
                    }
                    if (t[p] === '*' && t[p+1] == '/') {
                        break
                    }
                    p++
                }
            }
    }
};
