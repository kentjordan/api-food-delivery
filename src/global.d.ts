declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_HOST: string
            API_PORT: number
            SECRET_KEY: string
        }
    }
}

export { }