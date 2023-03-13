<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="onSubmit">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div class="flex justify-between">
          <h2 class="text-2xl font-medium leading-6 text-gray-900">Create Patients</h2>
          <RouterLink to="/patients" class="global-btn danger-btn">Cancel</RouterLink>
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
              <input v-model="data.email" id="email" name="email" type="email" autocomplete="email" class="report-input" />
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
            <label for="phone" class="report-label">Phone Number <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <input v-model="data.phone" type="text" name="phone" id="phone" autocomplete="phone"
                class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="report-label">Age <span class="text-red-600">*</span></label>
            <div class="mt-1 flex justify-center gap-x-2">
              <input v-model="data.age.age_value" id="age_value" name="age_value" type="text" class="report-input" />

              <select v-model="data.age.age_unit" id="age-unit" name="age-unit" 
                class="report-input">
                <option selected disabled>Select Unit</option>
                <option value="years">Years</option>
                <option value="months">Months</option>
                <option value="days">Days</option>
              </select>
              <select v-model="data.age.age_type" id="age-type" name="age-type"
                class="report-input">
                <option value="adult">Adult</option>
                <option value="kids">Kids</option>
                <option value="infants">Infants</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-3">
            <div>
              <label class="report-label">Gender <span class="text-red-600">*</span></label>
              <fieldset class="mt-2">
                <legend class="sr-only">Notification method</legend>
                <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  <div class="flex items-center">
                    <input value="male" v-model="data.gender" id="email" name="notification-method" type="radio" checked
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="email" class="ml-3 block text-sm font-medium text-gray-700">Male</label>
                  </div>

                  <div class="flex items-center">
                    <input value="female" v-model="data.gender" id="sms" name="notification-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="sms" class="ml-3 block text-sm font-medium text-gray-700">Female</label>
                  </div>

                  <div class="flex items-center">
                    <input value="others" v-model="data.gender" id="push" name="notification-method" type="radio"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500">
                    <label for="push" class="ml-3 block text-sm font-medium text-gray-700">Others</label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          

          <div class="sm:col-span-3">
            <label for="refer-by" class="report-label">Refer by</label>
            <div class="mt-1">
              <input v-model="data.refer_by" type="text" name="refer-by" id="refer-by" autocomplete="address-level2" class="report-input" />
            </div>
          </div>

          <!-- <div class="sm:col-span-3">
            <label for="region" class="report-label">Investigation <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <input v-model="data.investigation" type="text" name="region" id="region" autocomplete="address-level1" class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="postal-code" class="report-label">Performing Doctor <span class="text-red-600">*</span></label>
            <div class="mt-1">
              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="status" class="report-label">Template</label>
            <div class="mt-1">
              <select v-model="data.status" id="status" name="status" autocomplete="status"
                class="report-input">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <button type="button"
          class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
        <button type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </form>
</template>


<script setup>
import { reactive } from 'vue';
import { usePatientStore } from '../../store/patient';

const patientStore = usePatientStore()

const data = reactive({
  name: '',
  email: '',
  age: {
    age_value: '',
    age_unit: '',
    age_type: '',
  },
  gender: 'male',
  address: '',
  refer_by: '',
  phone: '',
})

const onSubmit = ()=> {
  patientStore.createPatient({ ...data , age: JSON.stringify(data.age)})
}
</script>