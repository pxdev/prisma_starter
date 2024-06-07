<script setup>
const _name = ref(null)
const _email = ref(null)
const token = useCookie('token').value || ''

const me = async () => {
    return await $fetch('/api/auth/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: token,
        }),
    })
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.log(error)
        })
}

const {
    user: { name, surname, email },
} = await me()
_name.value = `${name} ${surname}`
_email.value = email
</script>

<template>
    <header class="fixed z-30   border-b-white/10 text-white/60 inset-x-0 top-0  ">
        <u-container>
            <div class="flex justify-between  items-center py-6 rounded-b-lg">
                <div class="flex items-center text-2xl font-bold text-white/90">Prisma</div>
                <div class="flex items-center gap-2">
                    <div class="flex items-center">
                        <language-switcher />
                        <color-theme />
                    </div>
                    <profile-menu v-if="_email" :email="_email" :name="_name" />
                </div>
            </div>
        </u-container>
    </header>
    <!-- << app header >> -->
</template>

<style scoped></style>
