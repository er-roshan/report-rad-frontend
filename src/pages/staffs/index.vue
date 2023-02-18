
import StaffsTable from '../../components/tables/StaffsTable.vue';

<template>
    <div class="py-6">
        <MainHeader title="Staffs" url="/staffs/create" />
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="py-4">
                <StaffsTable />
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>

<script setup>
import MainHeader from '../../components/shared/MainHeader.vue';
import StaffsTable from '../../components/tables/StaffsTable.vue';

</script>