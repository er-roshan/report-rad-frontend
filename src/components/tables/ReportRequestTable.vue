<template>
    <div class="mt-4 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                    Patient Name
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Department</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Template</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Assigned To</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="entry in entryStore.entries" :key="entry.email">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {{
                                        entry.patient.name
                                    }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ entry.department.name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ entry.template.name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ entry.assignee.name }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span
                                        :class="['capitalize inline-flex rounded-full  px-2 text-xs font-medium leading-5 ', entry.status ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800']">{{
                                            entry.status ? 'Report Created' : 'Need Attention' }}</span>

                                </td>
                                <td
                                    class="relative whitespace-nowrap pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <template v-if="!entry.status">
                                        <div class="flex items-center justify-end gap-x-2 text-right">
                                            <a title="Delete" href="#" class="text-red-600 hover:text-red-700">
                                                <TrashIcon class="w-5" /><span class="sr-only">, {{
                                                    entry.id
                                                }}</span>
                                            </a>
                                            <a title="Edit" href="#"
                                                class="text-indigo-600 hover:text-indigo-700">
                                                <PencilSquareIcon class="w-5" /><span class="sr-only">, {{
                                                    entry.id
                                                }}</span>
                                            </a>
                                            <RouterLink :to="'/reports/create/' + entry.id"
                                                title="Add Report" href="#"
                                                class="text-green-600 hover:text-green-700 flex items-center">
                                                <DocumentPlusIcon class="w-5" /><span class="sr-only">, {{
                                                    entry.id
                                                }}</span>
                                            </RouterLink>

                                        </div>
                                    </template>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { EyeIcon, PencilSquareIcon, TrashIcon, DocumentPlusIcon } from "@heroicons/vue/24/outline"
import { useEntriesStore } from "../../store/entry";
import { onMounted } from "vue";

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

const entryStore = useEntriesStore();

onMounted(() => {
    entryStore.getEntries()
})
</script>