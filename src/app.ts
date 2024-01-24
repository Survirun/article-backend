import express from 'express';
import dotenv from 'dotenv';
import loader from './loaders/index';

export default async function bootstrap() {
    const app = express();
    dotenv.config();
    await loader(app);

    app.listen(app.get('service_port'), () => {
        console.log(`Server is listening port ${app.get('service_port')}`)
    })
}

bootstrap();