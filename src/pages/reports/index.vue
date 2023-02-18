
import MainHeader from '../../components/shared/MainHeader.vue';

<template>
    <div class="py-6">
        <MainHeader title="Reports" url="/reports" />
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="py-4">
                <ReportsTable />
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>

<script setup>
import MainHeader from '../../components/shared/MainHeader.vue';
import ReportsTable from '../../components/tables/ReportsTable.vue';

</script>