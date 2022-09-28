import { AxiosError } from "axios";

export default function logger(serviceName: string) {

    return {
        err: {
            logAxios: (err: AxiosError) => {
                const { config: { baseURL, url, method } } = err

                console.error(`[${serviceName}] failed to ${method?.toUpperCase()} ${baseURL}${url}:`, err)

                return Promise.reject(err);
            },
            mongoose: {

                connect: (err: unknown, mongoConnectionStr: string) => {

                    console.error(`[${serviceName}] failed to connect to ${mongoConnectionStr}:`, err)
                }
            }
        }
    }
}