<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="createPatient">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div class="flex justify-between">
          <h2 class="text-2xl font-medium leading-6 text-gray-900">Create Report</h2>
          <RouterLink to="/reports" class="global-btn danger-btn">Cancel</RouterLink>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="full-name" class="report-label">Patient name <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <input v-model="form_data.full_name" type="text" name="full-name" id="full-name" autocomplete="given-name"
                class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-6">
            <QuillEditor theme="snow" v-model:content="form_data.content" content-type="html" />
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
import { reactive, ref } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const form_data = reactive({
  full_name: '',
  content: ''
})


const createPatient = () => {
  console.table(form_data)

}

</script>