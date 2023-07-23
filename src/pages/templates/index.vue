<template>
    <div class="py-6">
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="flex mt-4 gap-x-4 border-b-2 pb-4">
                <button :class="'global-btn ' + [activeComponent === 'DepartmentList' ? 'primary-btn' : '']"
                    @click="switchComponent('DepartmentList')">Department List</button>
                <button :class="'global-btn ' + [activeComponent === 'TemplateList' ? 'primary-btn' : '']"
                    @click="switchComponent('TemplateList')">Template List</button>
            </div>
            <div class="py-4">
                <TemplateList v-if="activeComponent === 'TemplateList'" />
                <DepartmentList v-else />
            </div>
            <!-- /End replace -->
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import DepartmentList from '../../components/shared/DepartmentList.vue';
import TemplateList from '../../components/shared/TemplateList.vue';

const activeComponent = ref('DepartmentList');
const switchComponent = (payload) => {
    activeComponent.value = payload
}

</script>