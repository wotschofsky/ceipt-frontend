import { AxiosError } from "axios";

export default function logger(serviceName: string) {

    return {
        err: {
            logAxios: (err: AxiosError) => {
                const { config: { baseURL, url, method } } = err

                console.error(`[${serviceName}] failed to ${method?.toUpperCase()} ${baseURL}${url}:`, err)
            }
        }
    }
}