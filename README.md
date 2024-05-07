unipaper
betternote
betternotes
better-note
*better-notes
betterpaper
betterpapers
better-paper
better-papers
goodpapers
good-papers
问题
改用点乘

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
