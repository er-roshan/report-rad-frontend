<template>
    <div class="">
        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Hospital ID
                                    </th>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-if="hospitalStore.loading">Loading....</tr>
                                <tr v-else-if="hospitalStore.hospitals.length === 0">
                                    <div class="p-4 text-center">No hospitals Available Currently...</div>
                                </tr>
                                <tr v-for="hospital in hospitalStore.hospitals" :key="'hospital-item-' + hospital.id" v-else>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{
                                            hospital.code
                                        }}</td>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{
                                            hospital.name
                                        }}</td>
                                    <td
                                        class="relative whitespace-nowrap flex items-center justify-end gap-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <a href="#" @click="deleteHospital(hospital)" class="text-red-600 hover:text-red-700">
                                            <TrashIcon class="w-5" /><span class="sr-only">, {{
                                                hospital.name
                                            }}</span>
                                        </a>
                                        <RouterLink :to="'/hospitals/edit/' + hospital.id"
                                            class="text-indigo-600 hover:text-indigo-700">
                                            <PencilSquareIcon class="w-5" /><span class="sr-only">, {{
                                                hospital.name
                                            }}</span>
                                        </RouterLink>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { notify } from '@kyvg/vue3-notification';
import { useHospitalStore } from '../../store/hospital';


const hospitalStore = useHospitalStore();

onMounted(() => {
    hospitalStore.getHospitals();
})

const deleteHospital = async (value) => {
    const result = window.confirm(`Are you sure you want to delete ${value.name}`)
    if (result) {
        const res = await hospitalStore.deleteHospital(value.id);
        if (res.status === 204) {
            notify({
                title: "Deleted",
                text: "Hospital Deleted successfully",
                type: 'success'
            })
            hospitalStore.getHospitals()
        }
    }
}
</script>