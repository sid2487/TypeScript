const getEnv = (key:string, defaultValue?: string):string => {
    const value = process.env[key];

    if(value === undefined){
        throw new Error(`env ${key} is missing`);
    }

    return value;
}

export const PORT = getEnv("PORT", "5001");
export const MONGO_URI = getEnv("MONGO_URI");
export const JWT_PASSWORD = getEnv("JWT_PASSWORD");