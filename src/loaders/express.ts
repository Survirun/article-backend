import express, {Application} from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import bodyParser from 'body-parser'

export default async (app: Application) => {
    app.set('service_port', process.env.PORT || 3000)
    if (process.env.NODE_ENV == 'production') {
        app.use(helmet())
    }
    app.use(compression())
    app.use(morgan(process.env.NODE_ENV == 'production' ? 'combined' : 'dev'))
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
        res.header('Access-Control-Allow-Headers', 'content-type, uid, guest-mode')
        next()
    })
    app.use(cookieParser());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
    app.get('/', (req, res) => {
        return res.status(200).json({ 'msg': 'Hello, World?' })
    })
}
