import fs from 'fs'
import path from 'path'

const keywords = [
    'eq',
    'times',
    'frac',
    'sqrt',
    'pi',
    'sigma',
    'power',
    'minus',
    'func'
]
interface Node{
    operator: string,
    params: (string | Node)[]
}

const findChildren = (text: string) => {
    let leftBracket = 0, rightBracket = 0
    const children: string[] = []
    for(let i = 0; i < text.length; i++) {
        const char = text[i]
        if (char === '{') {
            leftBracket++
        }
        if (char === '}') {
            rightBracket++
        }
        if (leftBracket === rightBracket && leftBracket !==0 && rightBracket !== 0) {
            const nextDot = text.indexOf(',', i)
            if (nextDot >= 0) {
                children.push(text.substring(0, nextDot))
                const nextText = text.substring(nextDot+1, text.length)
                children.push(...findChildren(nextText))
            } else {
                children.push(text)
            }
            break
        }
    }
    return children
}

// const children = findChildren('func{x},times{frac{1,sqrt{times{2,pi,sigma}}},power{e,minus{times{frac{1,times{2,power{sigma,2}}},power{sub{x,u},2}}}}},a{}')

// console.log(children)

const parse = (text: string) => {

    const startBracket = text.indexOf('{')
    const operator = text.substring(0, startBracket)
    console.log(operator)
    if(!keywords.includes(operator)) {
        throw Error(`unknown operator: ${operator}`)
    }
    
    const closedBracket = text.lastIndexOf('}')
    const node: Node = { operator, params: [] }
    console.log(text.substring(startBracket+1, closedBracket))
    const children = findChildren(text.substring(startBracket+1, closedBracket))
    node.params = children.map(n => parse(n))
    console.log(children)
    return node
}
;(async() => {
    const source = fs.readFileSync(path.join(__dirname, '../test/a.mbk'), 'utf-8')
    const mathBlocks = source.match(/`([\s\S]*?)`/gi)?.map(n => n.substring(1, n.length-1).replace(/[\n\ ]/g, ''))
    const trees = mathBlocks?.map(n => parse(n))
    console.log(trees)
})()