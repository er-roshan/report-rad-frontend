<template>
    <div class="py-6">
        <MainHeader title="Patients" url="/patients" />
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="py-4">
                <PatientsTable />
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>

<script setup>
import MainHeader from '../../components/shared/MainHeader.vue';
import PatientsTable from '../../components/tables/PatientsTable.vue';

</script>