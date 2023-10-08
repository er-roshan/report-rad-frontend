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
                <button :class="'global-btn ' + [activeQueryParam === 'PatientList' ? 'primary-btn' : '']"
                    @click="switchComponent('PatientList')">Patient List</button>
                <button :class="'global-btn ' + [activeQueryParam === 'ReportRequestTable' ? 'primary-btn' : '']"
                    @click="switchComponent('ReportRequestTable')">Report Request</button>
                <button :class="'global-btn ' + [activeQueryParam === 'ReportListTable' ? 'primary-btn' : '']"
                    @click="switchComponent('ReportListTable')">Report List</button>
            </div>
            <div class="py-4">
                <template v-if="activeQueryParam === 'PatientList'">
                    <PatientList />
                </template>
                <template v-if="activeQueryParam === 'ReportRequestTable'">
                    <ReportRequestTable />
                </template>
                <template v-if="activeQueryParam === 'ReportListTable'">
                    <ReportListTable />
                </template>
            </div>
            <!-- /End replace -->
        </div>
        <FormPopup :isOpen="isOpen" @close="close" :boxSize="'large'">
            <CreatePatient @close="close" @success="success" @patientCreated="patientCreated" />
        </FormPopup>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ReportRequestTable from '../../components/tables/ReportRequestTable.vue'
import PatientList from '../../components/shared/PatientList.vue';
import FormPopup from '../../components/global/FormPopup.vue';
import CreateRequest from '../../components/forms/CreateRequest.vue';
import { usePatientStore } from '../../store/patient';
import { notify } from '@kyvg/vue3-notification';
import { useHospitalStore } from '../../store/hospital';
import ReportListTable from '../../components/tables/ReportListTable.vue';
import CreatePatient from '../../components/forms/CreatePatient.vue'
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute();

const hospitalStore = useHospitalStore()

onMounted(() => {
    hospitalStore.getHospitals();
})

const activeQueryParam = computed(() => {
    return route.query.active || 'PatientList';
});

const activeComponent = ref(activeQueryParam.value ? activeQueryParam.value : 'PatientList');

const switchComponent = (payload) => {
    router.push({ query: { active: payload } });
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