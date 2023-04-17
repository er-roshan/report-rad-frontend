<template>
    <div class="py-6">
        <div class="px-4 sm:px-6 md:px-0">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-2xl font-semibold text-gray-900">Patients</h1>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button @click="isOpen = true"
                        class="inline-flex items-center justify-center global-btn primary-btn sm:w-auto">Add
                        Patient</button>
                </div>
            </div>
        </div>
        <FormPopup :isOpen="isOpen" @close="close" :boxSize="'large'">
            <CreatePatient @close="close" @success="success" @patientCreated="patientCreated"
                v-if="visibleForm === 'patient'" />
            <CreateRequest @close="close" @entrySuccess="entrySuccess" :patientData="patientData" v-else />
        </FormPopup>
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="py-4">
                <PatientsTable @requestReport="requestReport" />
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import FormPopup from '../../components/global/FormPopup.vue';
import MainHeader from '../../components/shared/MainHeader.vue';
import PatientsTable from '../../components/tables/PatientsTable.vue';
import CreatePatient from '../../components/forms/CreatePatient.vue';
import CreateRequest from '../../components/forms/CreateRequest.vue';
import { usePatientStore } from '../../store/patient';
import { notify } from '@kyvg/vue3-notification';

const isOpen = ref(false);

const visibleForm = ref('patient');

const patientData = ref(null)

const patientStore = usePatientStore()

const close = () => {
    isOpen.value = false
}

const success = (payload) => {
    visibleForm.value = 'request';
    patientData.value = payload;
}

const patientCreated = () => {
    isOpen.value = false;
    notify({
        title: "Created",
        text: "Patient Created successfully",
        type: 'success'
    })
    patientStore.getPatients()
}

const entrySuccess = () => {
    isOpen.value = false;
    notify({
        title: "Created",
        text: "Report Requested Successfully",
        type: 'success'
    })
}

const requestReport = (payload) => {
    visibleForm.value = 'request';
    isOpen.value = true;
    patientData.value = payload;
}

</script>