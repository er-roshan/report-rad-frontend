<template>
    <div class="py-6">
        <div class="px-4 sm:px-6 md:px-0">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-2xl font-semibold text-gray-900">Profile</h1>
                </div>
                <!-- <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button @click="isOpen = true"
                        class="inline-flex items-center justify-center global-btn primary-btn sm:w-auto">Add
                        Partners</button>
                </div> -->
            </div>
        </div>
        <div class="flex mt-5">
            <div class="w-3/5">
                <div class="p-5 shadow-md rounded-md border-t border-teal-300 max-w-md" v-if="authStore.user">
                    <div class="italic">Name: <span class="italic font-semibold">{{ authStore.user.name }}</span> </div>
                    <div class="italic">Email: <span class="italic font-semibold">{{ authStore.user.email }}</span></div>
                    <div class="italic">Phome: <span class="italic font-semibold">{{ authStore.user.phome }}</span></div>
                    <div class="italic">Address: <span class="italic font-semibold">{{ authStore.user.address }}</span>
                    </div>
                    <div class="italic">Role: <span class="italic font-semibold">{{ authStore.user.role }}</span></div>
                </div>
            </div>
            <div class="w-2/5">
                <h3 class="text-xl font-semibold mb-4">Digital Signature</h3>
                <img class="w-40"
                    src="https://static.cdn.wisestamp.com/wp-content/uploads/2020/08/Serena-Williams-handwritten-signature.png"
                    alt="">
                <div class="mt-5">
                    <form action="">
                        <div class="flex items-center">
                            <label class="block">
                                <span class="sr-only">Choose profile photo</span>
                                <input type="file" class="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-teal-50 file:text-sky-700
                            hover:file:bg-violet-100
                            " />
                            </label>
                            <button
                                class="text-sm uppercase px-4 py-1 text-teal-400 border border-teal-400 bg-white hover:text-white hover:bg-teal-400 rounded-md">Update</button>

                        </div>
                    </form>

                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth';


const authStore = useAuthStore()
</script>