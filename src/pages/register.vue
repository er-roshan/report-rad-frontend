<template>
    <div class="flex min-h-full">
        <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company" />
                    <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Register your account</h2>
                    <p class="mt-2 text-sm text-gray-600">
                        Or
                        {{ ' ' }}
                        <RouterLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Already have an account? Go to Login</RouterLink>
                    </p>
                </div>

                <div class="mt-8">
                    <div class="mt-6">
                        <form @submit.prevent="onSubmit" class="space-y-6">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                                <div class="mt-1">
                                    <input v-model="data.name" id="name" name="name" type="text" autocomplete="name" required=""
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <div class="text-red-600 italic text-sm" v-if="authStore.registerErrors && authStore.registerErrors['name']">*{{ authStore.registerErrors['name'][0] }}</div>
                            </div>
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                                <div class="mt-1">
                                    <input v-model="data.email" id="email" name="email" type="email" autocomplete="email" required=""
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <div class="text-red-600 italic text-sm" v-if="authStore.registerErrors && authStore.registerErrors['email']">*{{ authStore.registerErrors['email'][0] }}</div>
                            </div>

                            <div class="space-y-1">
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <div class="mt-1">
                                    <input v-model="data.password" id="password" name="password" type="password"
                                        required=""
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <div class="text-red-600 italic text-sm" v-if="authStore.registerErrors && authStore.registerErrors['password']">*{{ authStore.registerErrors['password'][0] }}</div>
                            </div>
                            <div class="space-y-1">
                                <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div class="mt-1">
                                    <input v-model="data.password_confirmation" id="password_confirmation" name="password_confirmation" type="password"
                                        required=""
                                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                                </div>
                                <div class="text-red-600 italic text-sm" v-if="authStore.registerErrors && authStore.registerErrors['password']">*{{ authStore.registerErrors['password'][0] }}</div>
                            </div>

                            <div class="flex items-center justify-end">
                                <div class="text-sm">
                                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your
                                        password?</a>
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                    class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign
                                    in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
            <img class="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                alt="" />
        </div>
    </div>
</template>
  

<script setup>
import { useAuthStore } from '../store/auth';
import { reactive,onMounted } from 'vue';

const authStore = useAuthStore();
const data = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const onSubmit = () => {
    authStore.register(data);
}


onMounted(() => {
    authStore.registerErrors = null;
})


</script>