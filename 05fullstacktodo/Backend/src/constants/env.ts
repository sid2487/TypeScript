const getEnv = (key: string, defaultValue?: string):string => {
    const value = process.env[key] || defaultValue;

    if(value === undefined){
        throw new Error(`env value ${key} is not defined`);
    }

    return value;
}

export const PORT = getEnv("PORT");
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_PASSWORD = getEnv("JWT_PASSWORD");