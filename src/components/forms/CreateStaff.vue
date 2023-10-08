<template>
  <form class="space-y-8 divide-y divide-gray-200" @submit.prevent="onSubmit">
    <div class="space-y-8 divide-y divide-gray-200">
      <div>
        <div class="flex justify-between">
          <h2 class="text-2xl font-medium leading-6 text-gray-900">Create Staff</h2>
          <RouterLink to="/staffs" class="global-btn danger-btn">Cancel</RouterLink>
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
            <label for="password" class="report-label">Password</label>
            <div class="mt-1">
              <input v-model="data.password" id="password" name="password" type="password" autocomplete="password"
                class="report-input" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="password_confirmation" class="report-label">Password Confirmation</label>
            <div class="mt-1">
              <input v-model="data.password_confirmation" id="password_confirmation" name="password_confirmation"
                type="password" autocomplete="password_confirmation" class="report-input" />
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
              <input v-model="data.phone" type="text" name="phone" id="phone" autocomplete="phone" class="report-input" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-5">
      <div class="flex justify-end">
        <RouterLink to="/staffs"
          class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Cancel</RouterLink>
        <button type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </form>
</template>


<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStaffStore } from '../../store/staff';
import { notify } from '@kyvg/vue3-notification';

const router = useRouter()

const staffStore = useStaffStore()

const data = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  address: '',
  phone: '',
})

const onSubmit = async () => {
  const response = await staffStore.createStaff(data)
  if (response.status === 201) {
    notify({
      title: "Created",
      text: "Staff Account Created successfully",
      type: 'success'
    })
    await router.push('/staffs');
  } else {
    console.log(response)
    await notify({
      title: "Error",
      text: response.message,
      type: 'error'
    })
  }
}
</script>