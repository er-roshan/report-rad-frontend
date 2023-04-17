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
                                <tr v-for="hospital in hospitalStore.hospitals" :key="'hospital-item-' + hospital.id"
                                    v-else>
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
                                        <a href="#" @click="deleteHospital(hospital)"
                                            class="text-red-600 hover:text-red-700">
                                            <TrashIcon class="w-5" /><span class="sr-only">, {{
                                                hospital.name
                                            }}</span>
                                        </a>
                                        <a @click="editHospital(hospital)" class="text-indigo-600 hover:text-indigo-700">
                                            <PencilSquareIcon class="w-5" /><span class="sr-only">, {{
                                                hospital.name
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
        <FormPopup :isOpen="isOpen" @close="close">
            <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="updateHospital">
                <div class="space-y-8 divide-y divide-gray-200">
                    <div>
                        <h2 class="text-2xl font-medium leading-6 text-gray-900 text-center">Update Hospital</h2>
                        <div class="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                                <label for="hospital-name" class="report-label">Name <span
                                        class="text-red-600">*</span></label>
                                <div class="mt-1">
                                    <input v-model="editableData.name" type="text" name="hospital-name" id="hospital-name"
                                        autocomplete="given-name" class="report-input"
                                        placeholder="Enter your hospital name" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-5">
                    <div class="flex justify-end">
                        <button @click.prevent="isOpen = false"
                            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Cancel</button>
                        <button type="submit"
                            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                    </div>
                </div>
            </form>
        </FormPopup>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { notify } from '@kyvg/vue3-notification';
import { useHospitalStore } from '../../store/hospital';
import FormPopup from '../global/FormPopup.vue';

const isOpen = ref(false);
const hospitalStore = useHospitalStore();
const editableData = ref(null)

onMounted(() => {
    hospitalStore.getHospitals();
})

const close = () => {
    isOpen.value = false
}

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

const editHospital = async (value) => {
    isOpen.value = true;
    editableData.value = value
}

const updateHospital = async () => {
    const response = await hospitalStore.updateHospital(editableData.value);
    if (response.status === 200) {
        isOpen.value = false;
        notify({
            title: "Updated",
            text: "Hospital Updated successfully",
            type: 'success'
        })
        hospitalStore.getHospitals();
    }
}
</script>