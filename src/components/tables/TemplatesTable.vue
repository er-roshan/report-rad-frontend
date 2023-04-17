<template>
    <div class="">
        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 text-center">
                                        Status</th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-if="templateStore.loading">Loading....</tr>
                                <tr v-else-if="templateStore.templates.length === 0">
                                    <div class="p-4 text-center">No Data Available Currently...</div>
                                </tr>
                                <tr v-for="template in templateStore.templates" :key="'template-item-' + template.id" v-else>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{
                                            template.name
                                        }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                        <span :class="[ 'capitalize inline-flex rounded-full  px-2 text-xs font-medium leading-5 ', template.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800' ]">{{ template.status }}</span>
                                    </td>
                                    <td
                                        class="relative whitespace-nowrap flex items-center justify-end gap-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <a @click="deleteTemplate(template)" class="text-red-600 hover:text-red-700 cursor-pointer"><TrashIcon class="w-5" /><span
                                                class="sr-only">, {{
                                                    template.name
                                                }}</span></a>
                                        <RouterLink :to="'/templates/edit/' + template.id" class="text-indigo-600 hover:text-indigo-700"><PencilSquareIcon class="w-5" /><span
                                                class="sr-only">, {{
                                                    template.name
                                                }}</span></RouterLink>
                                        <a @click="duplicateTempalte(template)" class="text-gray-600 hover:text-gray-700 flex items-center cursor-pointer"> <DocumentDuplicateIcon class="w-5" /><span
                                                class="sr-only">, {{
                                                    template.name
                                                }}</span></a>
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
import { onMounted } from 'vue';
import { useTemplateStore } from '../../store/template';
import { PencilSquareIcon, TrashIcon,DocumentDuplicateIcon } from "@heroicons/vue/24/outline"
import { notify } from '@kyvg/vue3-notification';


const templateStore = useTemplateStore();

onMounted(() => {
    templateStore.getTemplates();
})

const duplicateTempalte = async (value) => {
    const result = window.confirm(`Are you sure you want to duplicate ${value.name}`)
    if (result) {
        const res = await templateStore.createTemplate({...value, name: value.name + ' Copy#' + Math.floor(Math.random() * 1000000) });
        if (res.status === 201) {
            notify({
                title: "Duplicate",
                text: "Template Duplicated successfully",
                type: 'info'
            })
            templateStore.getTemplates()
        }
    }
}

const deleteTemplate = async (value) => {
    const result = window.confirm(`Are you sure you want to delete ${value.name}?`)
    if (result) {
        const res = await templateStore.deleteTemplate(value.id);
        if (res.status === 204) {
            notify({
                title: "Deleted",
                text: "Template Deleted successfully",
                type: 'success'
            })
            templateStore.getTemplates()
        }
    }
}

</script>