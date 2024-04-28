import fs from "fs"
import path from "path"
import { UnknownEscapeChar, UnknownKeyword, MissingSquareBracketClosing } from './error'
import { literalChars, escapeChars, Token, TokenType, delimiters, Keyword } from "./definition"

const keywords = Object.values(Keyword)

let token: string | null = null
let row = 1, col = 1
let p = -1
let ltkn: string | null = null
const getToken = (source: string) => {
    const s = source
    while(true) {
        col+=token?.length ?? 0
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
/**
 * <E> ::= <E> | <T>
 * <T> ::= <S> | <S>_<C> | [_][{]<T>[}] | [<K>]
 * <C> ::= 
 * <S> ::= 1 | 2 | 3 | a | b | c ...
 * <K> ::= alpha | beta
 */
/**
 *  \[ \] \{ \} \_ \\
 * 1 2 3 a b c
 * [equiv] [ldots]
 * 
 */
/**
 * <S> ::= <U>{<U>}
 * <U> ::= <A>{_}{{<U>}}
 * <A> ::= \<A1> | <A2> | <A3>
 * <A1> ::= "[" | "]" | "_" | "{" | "}" | "\"
 * <A2> ::= "1" | "2" | "3" | "a" | "b" | "c" | "+" | "-" | "(" ...
 * <A3> ::= [<K>]
 * <K> ::= "alpha" | "beta" | "ldots" ...
 */

const A1 = () => {
    if (token && ['[', ']', '_', '{', '}', '\\'].includes(token)) {

    } else {
        throw UnknownEscapeChar
    }
}
const U = () => {
    if (token === '\\') {
        A1()
    }
}
export const parser = (text: string) => {
    getToken(text)    
    while (token) {
        U()
        getToken(text)
        console.log({token, col, row})
    }
    console.log('end')
};
