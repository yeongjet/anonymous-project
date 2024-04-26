import fs from "fs"
import path from "path"
import { UnknownEscapeChar, UnknownKeyword, MissingSquareBracketClosing } from './error'
import { literalChars, escapeChars, Token, TokenType, delimiters, Keyword } from "./definition"

const keywords = Object.values(Keyword)

let row = 1, col = 1
let p = 0
let nextTokens: Token[] = []

const wrapToken = (type: TokenType, value: string, _col: number = col): Token => {
    return { row, col: _col, type, value}
}

const getToken = (source: string): Token => {
    const s = source
    while(true){
        if (nextTokens.length > 0) {
            return nextTokens.shift()!
        }
        const c = s[p]
        if (literalChars.includes(c)) {
            const token = wrapToken(TokenType.Literal, c)
            p++
            col++
            return token
        }
        if (["_", "{", "}"].includes(c)) {
            const token = wrapToken(TokenType.Delimiter, c)
            p++
            col++
            return token
        }
        if (c==='\\') {
            if (escapeChars.includes(s[p+1])) {
                const token = wrapToken(TokenType.Literal, s[p+1])
                p+=2
                col+=2
                return token
            } else {
                throw UnknownEscapeChar
            }
        }
        if (c === '[') {
            let k = ''
            const v1 = col
            p++
            col++
            const v2 = col
            while(s[p] !== ']') {
                k += s[p]
                p++
                col++
                if(s[p] === undefined) {
                    throw MissingSquareBracketClosing
                }
            }
            console.log(k)
            if (keywords.includes(k as Keyword)) {
                nextTokens.push(wrapToken(TokenType.Keyword, k, v2), wrapToken(TokenType.Delimiter, s[p]))
            } else {
                throw UnknownKeyword
            }
            return wrapToken(TokenType.Delimiter, c, v1)
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
