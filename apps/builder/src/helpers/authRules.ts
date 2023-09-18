import { fetcher } from '@/helpers/fetcher'

export const canSignup = async (
    email: string
): Promise<boolean> => {
    try {
        const url = (process.env.NEXT_PRE_AUTH_URL as string) + '/my-talk/find-mail'
        const response = await fetcher(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })
        return response.process === 'success'  
    } catch (_) {
        return false
    }
}
