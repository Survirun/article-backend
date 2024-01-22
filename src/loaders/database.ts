import mongoose from 'mongoose'

export default async () => {
    mongoose.Promise = global.Promise
    if(process.env.MONGODB_URL) {
        await mongoose.connect(process.env.MONGODB_URL).then(res => {
            console.log('Mongoose DB Connected')
        }).catch(e => {
            console.error(e)
        })
    }

}