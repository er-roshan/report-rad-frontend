<template>
    <div class="py-6">
        <div class="px-4 sm:px-6 md:px-0">
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-2xl font-semibold text-gray-900">Departments</h1>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button @click="isOpen = true"
                        class="inline-flex items-center justify-center global-btn primary-btn sm:w-auto">Add
                        Department</button>
                </div>
            </div>
        </div>
        <FormPopup :isOpen="isOpen" @close="close">
            <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="create">
                <div class="space-y-8 divide-y divide-gray-200">
                    <div>
                        <h2 class="text-2xl font-medium leading-6 text-gray-900 text-center">Create Department</h2>
                        <div class="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                                <label for="department-name" class="report-label">Name <span
                                        class="text-red-600">*</span></label>
                                <div class="mt-1">
                                    <input v-model="form_data.name" type="text" name="department-name" id="department-name"
                                        autocomplete="given-name" class="report-input"
                                        placeholder="Enter your department name" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-5">
                    <div class="flex justify-end">
                        <button @click.prevent="isOpen = false"
                            class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Cancel</button>
                        <button type="submit"
                            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                    </div>
                </div>
            </form>
        </FormPopup>
        <div class="px-4 sm:px-6 md:px-0">
            <!-- Replace with your content -->
            <div class="py-4">
                <DepartmentsTable />
            </div>
            <!-- /End replace -->
        </div>
    </div>
</template>

<script setup>
import FormPopup from '../../components/global/FormPopup.vue'
import { ref, reactive, onMounted } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import DepartmentsTable from '../../components/tables/DepartmentsTable.vue';
import { useDepartmentStore } from '../../store/department';

const departmentStore = useDepartmentStore()

const isOpen = ref(false)

const form_data = reactive({
    name: '',
})

const close = () => {
    isOpen.value = false
}

const create = async () => {
    const data = await departmentStore.createDepartment(form_data);
    if (data.status === 201) {
        isOpen.value = false;
        form_data.name = '';
        notify({
            title: "Created",
            text: "Department Created successfully",
            type: 'success'
        })
        departmentStore.getDepartments()
    }
}

</script>
