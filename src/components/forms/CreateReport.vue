<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="createReport">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div class="flex justify-between">
          <h2 class="text-2xl font-medium leading-6 text-gray-900">Create Report</h2>
          <RouterLink to="/reports" class="global-btn danger-btn">Cancel</RouterLink>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-2">
            <label for="patient" class="report-label">Patient <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <select v-model="form_data.patientSelected" id="patient" name="patient" autocomplete="patient"
                class="report-input" @change="handlePatientChange">
                <option value="" :selected="form_data.patientSelected === ''" disabled>Select Patient</option>
                <option v-for="patient in patientStore.patients" :key="patient.id" :value="patient.id">{{ patient.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="address" class="report-label">Address</label>
            <div class="mt-1">
              <input v-model="form_data.address" type="text" name="address" id="address" autocomplete="address"
                class="report-input" :disabled="form_data.patientSelected === ''" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="phone" class="report-label">Phone Number <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <input v-model="form_data.phone" type="text" name="phone" id="phone" autocomplete="phone"
                class="report-input" :disabled="form_data.patientSelected === ''" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="report-label">Age <span class="text-red-600">*</span></label>
            <div class="mt-1 flex justify-center gap-x-2">
              <input v-model="form_data.age.age_value" id="age_value" name="age_value" type="text" class="report-input" :disabled="form_data.patientSelected === ''" />

              <select v-model="form_data.age.age_unit" id="age-unit" name="age-unit" 
                class="report-input" :disabled="form_data.patientSelected === ''">
                <option selected disabled>Select Unit</option>
                <option value="years">Years</option>
                <option value="months">Months</option>
                <option value="days">Days</option>
              </select>
              <select v-model="form_data.age.age_type" id="age-type" name="age-type"
                class="report-input" :disabled="form_data.patientSelected === ''">
                <option value="adult">Adult</option>
                <option value="kids">Kids</option>
                <option value="infants">Infants</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="template" class="report-label">Template</label>
            <div class="mt-1">
              <select v-model="templateSelected" id="template" name="template" autocomplete="template"
                class="report-input" :disabled="form_data.patientSelected === ''">
                <option value="" :selected="templateSelected === ''" disabled>Select Template</option>
                <option v-for="template in templateStore.templates" :key="template.id" :value="template.id">{{
                  template.name }}</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-6" v-if="templateSelected">
            <QuillEditor theme="snow" v-model:content="form_data.content" content-type="html" />
          </div>

          <div class="sm:col-span-6 text-gray-500 font-bold" v-else>
            <h3>Select Template to start creating report...</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <RouterLink to="/reports"
          class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Cancel</RouterLink>
        <button type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </form>
</template>


<script setup>
import { reactive, ref, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { onMounted } from 'vue';
import { useTemplateStore } from '../../store/template';
import { usePatientStore } from '../../store/patient';


// Initialize Store variable
const patientStore = usePatientStore();
const templateStore = useTemplateStore();

onMounted(() => {
  patientStore.getPatients();
  templateStore.getTemplates();
})

const templateSelected = ref('');

const form_data = reactive({
  patientSelected: '',
  content: '',
  address: '',
  phone: '',
  age: {
    age_value: '',
    age_unit: '',
    age_type: '',
  },
})

const handlePatientChange = ()=> {
  const patient = patientStore.patients.find(pt => pt.id === form_data.patientSelected);
  form_data.address = patient.address;
  form_data.phone = patient.phone;
  form_data.age.age_value = patient.age.age_value;
  form_data.age.age_unit = patient.age.age_unit;
  form_data.age.age_type = patient.age.age_type;
  console.log(patient)
}


const createReport = () => {
  console.table(form_data)
}

watch(templateSelected, (newVal) => {
  const template = templateStore.templates.find(temp => temp.id === newVal);
  form_data.content = template.content;
})

</script>