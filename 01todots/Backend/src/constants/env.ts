const getEnv = (key:string, defaultValue?: string):string => {
    const value = process.env[key] || defaultValue;

    if(value === undefined){
        throw new Error(`Missing environment varriable ${key}`);
    }

    return value;
}

export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT", "5001");
export const JWT_PASSWORD = getEnv("JWT_PASSWORD");