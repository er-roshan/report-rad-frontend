<template>
    <div>
        <MainHeader title="Templates" url="/templates/create" />
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="py-4">
                <TemplatesTable />
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>

<script setup>
import MainHeader from '../../components/shared/MainHeader.vue';
import TemplatesTable from '../../components/tables/TemplatesTable.vue';
</script>