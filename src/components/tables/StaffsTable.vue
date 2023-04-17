<template>
  <div class="">
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="staff in staffStore.staffs" :key="staff.email">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{
                    staff.name
                  }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ staff.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ staff.role }}</td>
                  <td
                    class="relative whitespace-nowrap flex items-center justify-end gap-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" class="text-red-600 hover:text-red-700">
                      <TrashIcon class="w-5" /><span class="sr-only">, {{
                        staff.name
                      }}</span>
                    </a>
                    <a href="#" class="text-indigo-600 hover:text-indigo-700">
                      <PencilSquareIcon class="w-5" /><span class="sr-only">, {{
                        staff.name
                      }}</span>
                    </a>
                    <a href="#" class="text-green-600 hover:text-green-700 flex items-center">
                      <EyeIcon class="w-5" /><span class="sr-only">, {{
                        staff.name
                      }}</span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { onMounted } from 'vue';
import { useStaffStore } from '../../store/staff';

const emits = defineEmits(['requestReport'])


const staffStore = useStaffStore();

onMounted(() => {
    staffStore.getStaffs();  
})
</script>