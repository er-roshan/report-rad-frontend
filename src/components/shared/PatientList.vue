<template>
    <div class="px-4 sm:px-6 md:px-0">
        <!-- Replace with your content -->
        <div class="">
            <PatientsTable @requestReport="requestReport" />
        </div>
        <FormPopup :isOpen="isOpen" @close="close" :boxSize="'large'">
            <CreateRequest @close="close" @entrySuccess="entrySuccess" :patientData="patientData" />
        </FormPopup>
        <!-- /End replace -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import FormPopup from '../global/FormPopup.vue';
import PatientsTable from '../tables/PatientsTable.vue';
import { usePatientStore } from '../../store/patient';
import { notify } from '@kyvg/vue3-notification';
import CreateRequest from '../forms/CreateRequest.vue';

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