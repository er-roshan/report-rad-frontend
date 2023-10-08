<template>
    <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="onSubmit">
        <div class="space-y-8 divide-y divide-gray-200">
            <div>
                <div class="flex justify-between">
                    <h2 class="text-2xl font-medium leading-6 text-gray-900">Request Report</h2>
                    <button @click.prevent="emits('close')" class="global-btn danger-btn">Cancel</button>
                </div>
                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <label for="full-name" class="report-label">Patient name <span class="text-red-600">*</span></label>
                        <div class="mt-1">
                            <input v-model="patientData.name" type="text" name="full-name" id="full-name"
                                autocomplete="given-name" class="report-input" disabled />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="status" class="report-label">Assign To</label>
                        <div class="mt-1">
                            <select v-model="data.assign_to" id="status" name="status" autocomplete="status"
                                class="report-input">
                                <option v-for="staff in staffStore.staffs" :value="staff.id">
                                    {{ staff.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="status" class="report-label">Department</label>
                        <div class="mt-1">
                            <select v-model="data.department_id" id="status" name="status" autocomplete="status"
                                class="report-input">
                                <option v-for="department in departmentStore.departments" :value="department.id">
                                    {{ department.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label for="status" class="report-label">Template</label>
                        <div class="mt-1">
                            <select v-model="data.template_id" id="status" name="status" autocomplete="status"
                                class="report-input" :disabled="!data.department_id">
                                <template v-for="template in templateStore.templates">
                                    <option :value="template.id" v-if="template.department_id == data.department_id">
                                        {{ template.name }}</option>
                                </template>

                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-5">
            <div class="flex justify-end">
                <button @click.prevent="emits('close')"
                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Cancel</button>
                <button type="submit"
                    class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Send
                </button>
            </div>
        </div>
    </form>
</template>
  
  
<script setup>
import { reactive, onMounted } from 'vue';
import { useDepartmentStore } from '../../store/department';
import { useEntriesStore } from '../../store/entry';
import { usePatientStore } from '../../store/patient';
import { useTemplateStore } from '../../store/template';
import { useStaffStore } from '../../store/staff';
import { useHospitalStore } from '../../store/hospital';

const emits = defineEmits(['close', 'entrySuccess']);

const props = defineProps(['patientData'])

const staffStore = useStaffStore()
const departmentStore = useDepartmentStore()
const templateStore = useTemplateStore()
const entryStore = useEntriesStore()
const hospitalStore = useHospitalStore()


const data = reactive({
    patient_id: '',
    department_id: '',
    template_id: '',
    assign_to: ''
})

const onSubmit = async () => {
    data.patient_id = props.patientData.id;
    const res = await entryStore.createEntry({ ...data, hospital_id: hospitalStore.activeHospital.id });
    if (res.status === 201) {
        emits('entrySuccess')
    }
}


onMounted(() => {
    departmentStore.getDepartments();
    templateStore.getTemplates();
    staffStore.getStaffs();
})
</script>