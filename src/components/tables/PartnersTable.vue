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
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Email</th>
                                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span class="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-if="partnerStore.loading">Loading....</tr>
                                <tr v-else-if="partnerStore.partners.length === 0">
                                    <div class="p-4 text-center">No Partners Available Currently...</div>
                                </tr>
                                <tr v-for="partner in partnerStore.partners" :key="'partner-item-' + partner.id" v-else>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {{
                                            partner.name
                                        }}</td>
                                    <td class="whitespace-nowrap py-4 px-3 text-sm text-left font-medium text-gray-900">
                                        {{
                                            partner.email
                                        }}</td>
                                    <td
                                        class="relative whitespace-nowrap flex items-center justify-end gap-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <a href="#" @click="deletePartner(partner)" class="text-red-600 hover:text-red-700">
                                            <TrashIcon class="w-5" /><span class="sr-only">, {{
                                                partner.name
                                            }}</span>
                                        </a>
                                        <RouterLink :to="'/partners/edit/' + partner.id"
                                            class="text-indigo-600 hover:text-indigo-700">
                                            <PencilSquareIcon class="w-5" /><span class="sr-only">, {{
                                                partner.name
                                            }}</span>
                                        </RouterLink>
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
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { usePartnerStore } from '../../store/partner';
import { notify } from '@kyvg/vue3-notification';


const partnerStore = usePartnerStore();

onMounted(() => {
    partnerStore.getPartners();
})

const deletePartner = async (value) => {
    const result = window.confirm(`Are you sure you want to delete ${value.name}`)
    if (result) {
        const res = await partnerStore.deletePartner(value.id);
        if (res.status === 204) {
            notify({
                title: "Deleted",
                text: "Partners Deleted successfully",
                type: 'success'
            })
            partnerStore.getPartners()
        }
    }
}
</script>