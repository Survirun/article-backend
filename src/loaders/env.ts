export const ENV = [
    'MONGODB_URL',
    'PORT',
    //google-firebase
    'PROJECT_ID',
    'PRIVATE_KEY_ID',
    'PRIVATE_KEY',
    'CLIENT_EMAIL',
    'CLIENT_ID',
    'CLIENT_X509_CERT_URL'
]

export default async () => {
    if (!process.env.NODE_ENV) process.env.NODE_ENV = 'production'
    if (!process.env.PORT) process.env.PORT = '3000'
    for (const env_name of ENV)
        if (!process.env[env_name]) throw new Error(`Environment Variable ${env_name} was not found`)
}