<template>
    <div class="py-6">
        <div class="px-4 sm:px-6 md:px-0">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-2xl font-semibold text-gray-900">Reports</h1>
                </div>
            </div>
        </div>
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="flex mt-4">
                <button :class="'global-btn ' + [ activeComponent === 'ReportRequestTable' ? 'primary-btn' : '']" @click="switchComponent('ReportRequestTable')">List Request</button>
                <button :class="'global-btn ml-4 '+ [ activeComponent === 'ReportListTable' ? 'primary-btn' : '']" @click="switchComponent('ReportListTable')">List Report</button>
            </div>
            <div class="py-4">
                <ReportRequestTable v-if="activeComponent === 'ReportRequestTable'" />
                <ReportListTable v-else />
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MainHeader from '../../components/shared/MainHeader.vue';
import ReportListTable from '../../components/tables/ReportListTable.vue';
import ReportRequestTable from '../../components/tables/ReportRequestTable.vue'

const activeComponent = ref('ReportRequestTable');
const dynamicComponent = ref(null)

const switchComponent = (payload) => {
    activeComponent.value = payload
}

</script>