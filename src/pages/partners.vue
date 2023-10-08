<template>
    <div class="py-6">
        <div class="px-4 sm:px-6 md:px-0">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-2xl font-semibold text-gray-900">Partners</h1>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button @click="isOpen = true"
                        class="inline-flex items-center justify-center global-btn primary-btn sm:w-auto">Add
                        Partners</button>
                </div>
            </div>
        </div>
        <FormPopup :isOpen="isOpen" @close="close">
            <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="create">
                <div class="space-y-8 divide-y divide-gray-200">
                    <div>
                        <h2 class="text-2xl font-medium leading-6 text-gray-900 text-center">Create Partners</h2>
                        <div class="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                                <label for="partner-name" class="report-label">Name <span
                                        class="text-red-600">*</span></label>
                                <div class="mt-1">
                                    <input v-model="form_data.name" type="text" name="partner-name" id="partner-name"
                                        autocomplete="given-name" class="report-input"
                                        placeholder="Enter your partner name" />
                                </div>
                            </div>
                            <div class="sm:col-span-6">
                                <label for="partner-email" class="report-label">Email <span
                                        class="text-red-600">*</span></label>
                                <div class="mt-1">
                                    <input v-model="form_data.email" type="email" name="partner-email" id="partner-email"
                                        autocomplete="given-email" class="report-input"
                                        placeholder="Enter your partner email" />
                                </div>
                            </div>
                            <div class="sm:col-span-6">
                                <label for="role" class="report-label">Role <span class="text-red-600">*</span></label>
                                <div class="mt-1 ">
                                    <select v-model="form_data.role" id="role" name="role" class="report-input">
                                        <option selected disabled>Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                        <option value="manager">Manager</option>
                                    </select>
                                </div>
                            </div>
                            <div class="sm:col-span-6">
                                <label for="role" class="report-label">Assign Hospital <span class="text-gray-400 text-xs">(Optional)</span></label>
                                <div class="mt-1 ">
                                    <select v-model="form_data.hospital_id" id="role" name="role" class="report-input">
                                        <option selected disabled>Select Hospital</option>
                                        <option v-for="hospital in hospitalStore.hospitals"
                                            :key="'hospital-item-' + hospital.id" :value="hospital.id">{{ hospital.name }}
                                        </option>
                                    </select>
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
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="py-4">
                <PartnersTable />
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>

<script setup>
import FormPopup from '../components/global/FormPopup.vue'
import { ref, reactive, onMounted } from 'vue';
import { usePartnerStore } from '../store/partner';
import PartnersTable from '../components/tables/PartnersTable.vue';
import { useHospitalStore } from '../store/hospital';
import { notify } from '@kyvg/vue3-notification';

const partnerStore = usePartnerStore()
const hospitalStore = useHospitalStore();

onMounted(() => {
    hospitalStore.getHospitals();
})

const isOpen = ref(false)

const form_data = reactive({
    name: '',
    email: '',
    role: '',
    hospital_id: ''
})

const close = () => {
    isOpen.value = false
}

const create = async () => {
    const data = await partnerStore.createPartner(form_data);
    if (data.status === 201) {
        isOpen.value = false;
        form_data.name = '';
        form_data.email = '';
        notify({
            title: "Created",
            text: "Partners Created successfully",
            type: 'success'
        })
        partnerStore.getPartners()
    }
}

</script>
