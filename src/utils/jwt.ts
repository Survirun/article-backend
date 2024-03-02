import * as jwt from "jsonwebtoken";
export default {
    publishAccessToken: async (id: string, permission: string) => {        
        return await jwt.sign({
            uid: id,
            permission: permission
        }, process.env.SECRET_KEY_JWT as string, {
            expiresIn: '1d',
            subject: 'userinfo',
            issuer: process.env.HOSTNAME
        });
    }
}