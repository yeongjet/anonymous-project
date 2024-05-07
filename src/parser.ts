import fs from 'fs'
import path from 'path'
import {
    UnknownEscapeChar,
    UnknownKeyword,
    MissingSquareBracketClosing,
    MissingBraceClosing,
    ExpectBraceStarting
} from './error'
import { literalChars, escapeChars, Token, TokenType, delimiters, Keyword } from './definition'

const keywords = Object.values(Keyword)
let s: string = ''
let token: string | null = null
let row = 1,
    col = 1
let p = -1
let ltkn: string | null = null

export const init = (source: string) => {
    s = source
}

const getToken = () => {
    while (true) {
        col += token?.length ?? 0
        p++
        const c = s[p]
        if (ltkn !== '\\' && token === '[') {
            let k = ''
            while (s[p] && s[p] !== ']') {
                k += s[p]
                p++
            }
            ltkn = token
            token = k
            p--
            break
        } else if ([...literalChars, '_', '{', '}', '[', ']', '\\'].includes(c)) {
            ltkn = token
            token = c
            break
        }
        if (c === '\n') {
            row++
            col = 1
        }
        token = null
        if (c === undefined) {
            break
        }
    }
}

const A1 = () => {
    getToken()
    if (!token) {
        throw UnknownEscapeChar
    }
    if (['[', ']', '_', '{', '}', '\\'].includes(token)) {
        console.log('A1', token)
    } else {
        throw UnknownEscapeChar
    }
}

const A2 = () => {
    console.log('A2', token)
}

const A3 = () => {
    getToken()
    if (!token) {
        throw MissingSquareBracketClosing
    }
    if (keywords.includes(token as Keyword)) {
        console.log('A3', token)
    }
    getToken()
    // @ts-ignore
    if (token !== ']') {
        throw MissingSquareBracketClosing
    }
}

const U = () => {
    if (token! === '\\') {
        A1()
    } else if (literalChars.includes(token!)) {
        A2()
    } else if (token! === '[') {
        A3()
    }
    getToken()
    while (token === '_') {
        console.log(token)
        getToken()
    }
    if (token === '{'){
        while (token === '{') {
            getToken()
            U()
            getToken()
            // @ts-ignore
            if (token !== '}') {
                throw MissingBraceClosing
            }
            getToken()
        }
    } else {
        throw ExpectBraceStarting
    }
}

export const parse = () => {
    getToken()
    while (token) {
        U()
    }
    // while (token) {
    //     getToken(text)
    //     console.log({token, col, row})
    // }
    console.log('end')
}
