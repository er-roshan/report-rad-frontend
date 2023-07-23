<template>
    <div class="py-6">
        <div class="px-4 sm:px-6 md:px-0">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-2xl font-semibold text-gray-900">Reports</h1>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button @click="isOpen = true"
                        class="inline-flex items-center justify-center global-btn primary-btn sm:w-auto">Add
                        Patient</button>
                </div>
            </div>
        </div>
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="flex mt-4 gap-x-4">
                <button :class="'global-btn ' + [activeComponent === 'PatientList' ? 'primary-btn' : '']"
                    @click="switchComponent('PatientList')">Patient List</button>
                <button :class="'global-btn ' + [activeComponent === 'ReportRequestTable' ? 'primary-btn' : '']"
                    @click="switchComponent('ReportRequestTable')">Report Request</button>
                <button :class="'global-btn ' + [activeComponent === 'ReportListTable' ? 'primary-btn' : '']"
                    @click="switchComponent('ReportListTable')">Report List</button>
            </div>
            <div class="py-4">
                <PatientList v-if="activeComponent === 'PatientList'" />
                <ReportRequestTable v-else-if="activeComponent === 'ReportRequestTable'" />
                <ReportListTable v-else />
            </div>
            <!-- /End replace -->
        </div>
        <FormPopup :isOpen="isOpen" @close="close" :boxSize="'large'">
            <CreatePatient @close="close" @success="success" @patientCreated="patientCreated" />
        </FormPopup>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ReportListTable from '../../components/tables/ReportListTable.vue';
import ReportRequestTable from '../../components/tables/ReportRequestTable.vue'
import PatientList from '../../components/shared/PatientList.vue';
import FormPopup from '../../components/global/FormPopup.vue';
import CreatePatient from '../../components/forms/CreatePatient.vue';
import CreateRequest from '../../components/forms/CreateRequest.vue';
import { usePatientStore } from '../../store/patient';
import { notify } from '@kyvg/vue3-notification';

const activeComponent = ref('PatientList');
const dynamicComponent = ref(null)

const switchComponent = (payload) => {
    activeComponent.value = payload
}

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