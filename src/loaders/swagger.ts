import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs';
import {Application} from "express";
import path from 'path'

const swaggerSpec = YAML.load(path.resolve(__dirname, '../../swagger/swagger.yaml'))

export default async function(app: Application) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}


