import Keyword from '../constants/keyword'

const includedDevKey = (keywords: Array<number>) => {
    return keywords.some(e => Keyword.devKey.includes(e))
}

export default {
    includedDevKey
}