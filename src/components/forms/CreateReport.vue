<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="createReport">
    <div class="space-y-8 divide-y divide-gray-200">
      <div v-if="entryStore.entry">
        <div class="flex justify-between">
          <h2 class="text-2xl font-medium leading-6 text-gray-900">Create Report for <span
              class="text-indigo-600 italic underline">{{ selectedTemplateName }}</span> </h2>
          <RouterLink to="/reports" class="global-btn danger-btn">Cancel</RouterLink>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 border p-4 rounded-md shadow shadow-indigo-300">
          <div class="sm:col-span-2">
            <div class="font-medium">Patient Name: {{ entryStore.entry.patient.name }}</div>
          </div>
          <div class="sm:col-span-2">
            <div class="font-medium">Hospital Number: {{ entryStore.entry.patient.name }}</div>
          </div>
          <div class="sm:col-span-2">
            <div class="font-medium">Refer by: {{ entryStore.entry.patient.refer_by }}</div>
          </div>
          <div class="sm:col-span-2">
            <div class="font-medium">Address: {{ entryStore.entry.patient.address }}</div>
          </div>
          <div class="sm:col-span-2">
            <div class="font-medium">Phone Number: {{ entryStore.entry.patient.phone }}</div>
          </div>
          <div class="sm:col-span-2">
            <div class="font-medium">Requested On: {{ entryStore.entry.patient.created_at.split('T')[0] }}<br> ({{ new NepaliDate(entryStore.entry.patient.created_at.split('T')[0]) }})</div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 border-t pt-4 mb-4">
          <div class="sm:col-span-3">
            <label for="current-template" class="report-label font-semibold">Current Template</label>
            <div class="mt-1">
              {{ selectedTemplateName }}
            </div>
          </div>
          <div class="sm:col-span-3">
            <label for="template" class="report-label font-semibold">Change Template</label>
            <div class="mt-1">
              <select v-model="templateSelected" id="template" name="template" autocomplete="template"
                class="report-input" @change="onTemplateSelectedChange">
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

    <div class="pt-10">
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
import { reactive, ref, watch, nextTick } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { onMounted, computed } from 'vue';
import { useTemplateStore } from '../../store/template';
import { usePatientStore } from '../../store/patient';
import { useRoute, useRouter } from 'vue-router';
import { useEntriesStore } from '../../store/entry';
import { useReportsStore } from '../../store/report';
import { notify } from '@kyvg/vue3-notification';
import NepaliDate from 'nepali-date-converter';


const route = useRoute()
const router = useRouter()

const jsDate = new Date();

const nepaliDate = new NepaliDate(jsDate);

// Initialize Store variable
const patientStore = usePatientStore();
const templateStore = useTemplateStore();
const entryStore = useEntriesStore();
const reportStore = useReportsStore();

const form_data = reactive({
  patientSelected: '',
  content: '',
})
const selectedTemplateName = ref('')
const userSelectedTemplate = ref(false)
const templateSelected = ref('');
const templateData = ref(null);

onMounted(async () => {
  const entryResponse = await entryStore.getEntry(route.params.id);
  if (entryResponse.status === 200) {
    templateSelected.value = entryResponse.data.template.id;
    form_data.content = entryResponse.data.template.content;
    templateData.value = entryResponse.data.template;
    selectedTemplateName.value = entryResponse.data.template.name
  }
  await templateStore.getTemplates();
  userSelectedTemplate.value = true;
})

const templateChanged = (newVal, oldVal) => {
  console.log("I am about to run")
  console.log("Checking user selection ",userSelectedTemplate.value)
  if (newVal !== oldVal && userSelectedTemplate.value) {
    const result = window.confirm(`Changed will be discarded. Are you sure you want to change Template?`)
    if (result) {
      console.log("template is changed", newVal)
      const template = templateStore.templates.find(temp => temp.id === newVal);
      form_data.content = template.content;
      selectedTemplateName.value = template.name;
    } else {
      templateSelected.value = oldVal;
      userSelectedTemplate.value = false
    }
  }
}

watch(
  () => templateSelected.value,
  async (newVal, oldVal) => {
    await nextTick();
    await templateChanged(newVal, oldVal)
  }
)

function onTemplateSelectedChange() {
  console.log("I will run now look look")
  userSelectedTemplate.value = true
}

const createReport = async () => {
  const response = await reportStore.createReport({
    entry_id: entryStore.entry.id,
    content: form_data.content,
  });
  if(response.status === 201) {
    notify({
      title: "Created",
      text: "Report Created Successfully",
      type: 'success'
    })
    router.push('/reports');
  }
}

</script>