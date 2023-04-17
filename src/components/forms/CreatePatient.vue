<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="onSubmit">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div class="flex justify-between">
          <h2 class="text-2xl font-medium leading-6 text-gray-900">Create Patients for <span class="text-green-500">{{ hospitalStore.activeHospital.name }}</span> </h2>
          <button @click.prevent="emits('close')" class="global-btn danger-btn">Cancel</button>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="full-name" class="report-label">Full name <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <input v-model="data.name" type="text" name="full-name" id="full-name" autocomplete="given-name"
                class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="email" class="report-label">Email address</label>
            <div class="mt-1">
              <input v-model="data.email" id="email" name="email" type="email" autocomplete="email"
                class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="phone" class="report-label">Phone Number <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <input v-model="data.phone" type="text" name="phone" id="phone" autocomplete="phone" class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="address" class="report-label">Address</label>
            <div class="mt-1">
              <input v-model="data.address" type="text" name="address" id="address" autocomplete="address"
                class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="age" class="report-label">Age <span class="text-red-600">*</span></label>
            <div class="mt-1 flex justify-start items-center gap-x-5">
              <input v-model="data.age.age_value" id="age_value" name="age_value" type="number" class="report-input w-20"
                min="0" />

              <fieldset name="fieldsetAge" class="w-full relative">
                <legend class="sr-only">Age Type</legend>
                <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-2">
                  <div class="flex items-center">
                    <input value="years" v-model="data.age.age_unit" id="years" name="age-method" type="radio" checked
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="years" class="ml-3 block text-sm font-medium text-gray-700">Years</label>
                  </div>

                  <div class="flex items-center">
                    <input value="months" v-model="data.age.age_unit" id="months" name="age-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="months" class="ml-3 block text-sm font-medium text-gray-700">Months</label>
                  </div>

                  <div class="flex items-center">
                    <input value="days" v-model="data.age.age_unit" id="days" name="age-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="days" class="ml-3 block text-sm font-medium text-gray-700">Days</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="sm:col-span-3">
            <div>
              <label class="report-label">Gender <span class="text-red-600">*</span></label>
              <fieldset name="fieldsetGender" class="mt-2">
                <legend class="sr-only">Gender Selection</legend>
                <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <div class="flex items-center">
                    <input value="male" v-model="data.gender" id="male" name="gender-method" type="radio" checked
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="male" class="ml-3 block text-sm font-medium text-gray-700">Male</label>
                  </div>

                  <div class="flex items-center">
                    <input value="female" v-model="data.gender" id="female" name="gender-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="female" class="ml-3 block text-sm font-medium text-gray-700">Female</label>
                  </div>

                  <div class="flex items-center">
                    <input value="others" v-model="data.gender" id="others" name="gender-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="others" class="ml-3 block text-sm font-medium text-gray-700">Others</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="refer-by" class="report-label">Refer by</label>
            <div class="mt-1">
              <input v-model="data.refer_by" type="text" name="refer-by" id="refer-by" autocomplete="address-level2"
                class="report-input" />
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
        <button @click.prevent="onlyCreate"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
        <button type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Save
          & Request</button>

      </div>
    </div>
  </form>
</template>


<script setup>
import { reactive } from 'vue';
import { usePatientStore } from '../../store/patient';
import { useHospitalStore } from '../../store/hospital';

const emits = defineEmits(['close', 'success', 'patientCreated']);

const patientStore = usePatientStore()
const hospitalStore = useHospitalStore()

let data = reactive({
  name: '',
  email: '',
  age: {
    age_value: '',
    age_unit: 'years',
  },
  gender: 'male',
  address: '',
  refer_by: '',
  phone: '',
})

const onSubmit = async () => {
  const response = await patientStore.createPatient({ ...data, age: JSON.stringify(data.age), hospital_id: hospitalStore.activeHospital.id });
  if (response.status === 201) {
    resetData()
    emits('success', response.data)
  }
}

const onlyCreate = async () => {
  const response = await patientStore.createPatient({ ...data, age: JSON.stringify(data.age), hospital_id: hospitalStore.activeHospital.id });
  if (response.status === 201) {
    resetData()
    emits('patientCreated')
  }
}

const resetData = () => {
  data = {
    name: '',
    email: '',
    age: {
      age_value: '',
      age_unit: 'years',
    },
    gender: 'male',
    address: '',
    refer_by: '',
    phone: '',
  }
}
</script>