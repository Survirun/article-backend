import crypto from 'crypto'

export default {
    getRandomInt: (a: number, b: number) => {
        return a + (parseInt(crypto.randomBytes(2).toString('hex'), 16) % (b-a+1) )
    }
}