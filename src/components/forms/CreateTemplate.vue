<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="onSubmit">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div class="flex justify-between">
          <h2 class="text-2xl font-medium leading-6 text-gray-900">Create Templates</h2>
          <RouterLink to="/templates" class="global-btn danger-btn">Cancel</RouterLink>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-8">
          <div class="sm:col-span-4">
            <label for="template-name" class="report-label">Template name <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <input v-model="form_data.name" type="text" name="template-name" id="template-name" autocomplete="given-name"
                class="report-input" />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="status" class="report-label">Department</label>
            <div class="mt-1">
              <select v-model="form_data.department_id" id="status" name="status" autocomplete="status"
                class="report-input">
                <option v-for="department in departmentStore.departments" :value="department.id">{{department.name}}</option>
              </select>
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="status" class="report-label">Status</label>
            <div class="mt-1">
              <select v-model="form_data.status" id="status" name="status" autocomplete="status"
                class="report-input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-8">
            <QuillEditor theme="snow" v-model:content="form_data.content" content-type="html" />
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <RouterLink to="/templates"
          class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Cancel</RouterLink>
        <button type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </form>
</template>


<script setup>
import { reactive, ref, onMounted } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useTemplateStore } from '../../store/template';
import { useDepartmentStore } from '../../store/department';

const templateStore  = useTemplateStore()
const departmentStore = useDepartmentStore()

const form_data = reactive({
  name: '',
  content: '',
  department_id: '',
  status: 'draft'
})


const onSubmit = () => {
  templateStore.createTemplate(form_data);
}

onMounted(() => {
  departmentStore.getDepartments()
})

</script>