import fs from "fs"
import path from "path"
import { UnknownEscapeChar, UnknownKeyword, MissingSquareBracketClosing } from './error'
import { literalChars, escapeChars, Token, TokenType, delimiters, Keyword } from "./definition"

const keywords = Object.values(Keyword)

let row = 1, col = 1
let p = 0
let isKeywordParsing = false

const getToken = (source: string): Token => {
    const s = source
    while(true){
        const c = s[p]
        if (literalChars.includes(c)) {
            if (isKeywordParsing) {
                let k = ''
                const v = col
                while(s[p] !== ']') {
                    k += s[p]
                    p++
                    col++
                    if(s[p] === undefined) {
                        throw MissingSquareBracketClosing
                    }
                }
                isKeywordParsing = false
                if ((keywords as string[]).includes(k)) {
                    return { row, column: v, type: TokenType.Keyword, value: k }
                } else {
                    throw UnknownKeyword
                }
            }
            const token = { row, column: col, type: TokenType.Literal, value: c }
            p++
            col++
            return token
        }
        if (delimiters.includes(c)) {
            if (c === '[') {
                isKeywordParsing = true
            }
            const token = { row, column: col, type: TokenType.Delimiter, value: c }
            p++
            col++
            return token
        }
        if (c==='\\') {
            if (escapeChars.includes(s[p+1])) {
                const token = { row, column: col, type: TokenType.Literal, value: s[p+1] }
                p+=2
                col+=2
                return token
            } else {
                throw UnknownEscapeChar
            }
        }
        if (c === '\n') {
            row++
            col = 0
        }
        col++
        p++
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
export const parser = (text: string) => {
    while(true) {
        const token = getToken(text)
        console.log(token)
    }

};
