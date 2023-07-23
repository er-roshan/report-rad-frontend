<template>
    <div class="mt-4 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Patient Name
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Phone</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Email</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Refer By</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-if="patientStore.loading">Loading....</tr>
                            <tr v-else-if="patientStore.patients.length === 0">
                                <div class="p-4 text-center">No Data Available Currently...</div>
                            </tr>
                            <tr v-for="person in patientStore.patients" :key="person.email" v-else>
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {{
                                        person.name
                                    }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.phone }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.email }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.refer_by }}</td>
                                <td
                                    class="relative flex items-center justify-end gap-x-2 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a title="Delete" href="#" class="text-red-600 hover:text-red-700">
                                        <TrashIcon class="w-5" /><span class="sr-only">, {{
                                            person.name
                                        }}</span>
                                    </a>
                                    <a title="Edit" href="#" class="text-indigo-600 hover:text-indigo-700">
                                        <PencilSquareIcon class="w-5" /><span class="sr-only">, {{
                                            person.name
                                        }}</span>
                                    </a>
                                    <a @click="emits('requestReport', person)"
                                        class="cursor-pointer text-green-600 hover:text-green-700 flex items-center"
                                        title="Request Report">
                                        <DocumentPlusIcon class="w-5" /><span class="sr-only">, {{
                                            person.name
                                        }}</span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePatientStore } from '../../store/patient';
import { EyeIcon, PencilSquareIcon, TrashIcon, DocumentPlusIcon } from "@heroicons/vue/24/outline"

const emits = defineEmits(['requestReport'])


const patientStore = usePatientStore();

onMounted(() => {
    patientStore.getPatients();
})
</script>