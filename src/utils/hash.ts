import * as crypto from "crypto";

export default (str: string) => {
    return crypto.createHash('sha512').update(str).digest('base64')
}