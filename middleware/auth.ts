export default defineNuxtRouteMiddleware(async (to, from) => {
    const {
        data: { success },
    } = await me()

    if (!success) {
        return navigateTo(to)
    } else {
        return true
    }
})

const me = async () => {
    const token = useCookie('token').value || ''

    return await $fetch('/api/auth/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: token,
        }),
    })
        .then((data: any) => {
            return {
                data,
                success: true,
            }
        })
        .catch((error) => {
            console.log(error)

            return {
                data: {},
                success: false,
            }
        })
}
