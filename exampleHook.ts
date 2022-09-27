

import { useState, useEffect } from "react"

type Request<T> = () => Promise<T>

type Sus<T> = { request: Request<T> }

type Input = { [key: string]: { request: Request<any> } }

type Response<Data> = { data: Data | null, err: unknown | null }

// type Output = { responses: { [key: string]: Response }, hasErrs: boolean }

type Amugos = {

    moin: string
}

type Output<Input> = {
    // responses: { [key: string]: string }, hasErrs: boolean

    responses: {
        [Key in keyof Input]: Response<Input[Key]["request"]>
    },
    hasErrs: boolean
}

async function fireRequests(input: Input): Promise<{ [key: string]: Response<Input> }> {

    const amogus = Object.entries(input).map(async ([key, value]) => {

        const result = { data: null, err: null }

        try {

            result.data = (await value.request()) ?? null

        } catch (err) {

            result.err = err
        }
        return [key, result]
    })
    return Object.fromEntries(await Promise.all(amogus))
}

const useInitialData = (input: Input) => {

    const [results, setResults] = useState<Output<Input>>({ hasErrs: false, responses: {} })

    useEffect(() => {

        fireRequests(input).then(responses => {

            const hasErrs = Object.values(responses).some(i => i.err != null)

            setResults({ hasErrs, responses })
        })
    }, [])

    return results
}
export default useInitialData



function Test() {

    const { hasErrs, responses: { lessons } } = useInitialData({ lessons: { request: async () => ["ballern", "bakern"] } })

    if (hasErrs) return "loading..."

    const ding = lessons.data?.request

    return lessons
}