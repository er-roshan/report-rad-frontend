<template>
    <div id="printMe">
        <table class="min-w-full divide-y divide-gray-300">
            <thead></thead>
            <tbody class="bg-gray-50">
                <tr class="w-full">
                    <h2 class="text-center text-2xl font-semibold">Report Details of {{
                        data.entry.patient.name }}</h2>
                </tr>
                <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Patient Name: {{ data.entry.patient.name }}
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Hospital Number: {{ data.entry.patient.name }}</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Refer by: {{ data.entry.patient.refer_by }}</th>
                </tr>
                <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Address: {{ data.entry.patient.address }}
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Phone Number: {{ data.entry.patient.phone }}</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date: {{
                            data.entry.patient.created_at.split('T')[0] }}</th>
                </tr>
            </tbody>
            <tbody class="divide-y divide-gray-200 bg-white">
                <tr>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div v-html="data.content">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pt-5">
        <div class="flex justify-end">
            <button @click.prevent="close"
                class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Cancel</button>
            <button @click="print"
                class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Print
            </button>
        </div>
    </div>
</template>


<script setup>
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { onMounted, ref } from "vue";
import { useReportsStore } from "../../store/report";
import DetailPopup from "../global/DetailPopup.vue";
import ReportPdf from "../pdf/ReportPdf.vue";

const props = defineProps({
    data: Object
})

const isOpen = ref(false);

const close = () => {
    isOpen.value = false
}

const reportDetail = ref(null)

const reportStore = useReportsStore();

onMounted(() => {
    reportStore.getReports()
})

const viewReport = (payload) => {
    isOpen.value = true
    reportDetail.value = payload
}

const print = () => {
    const content = document.getElementById("printMe").innerHTML;

    const printWindow = window.open("", "Print");

    // Create a new document in the print window
    const doc = printWindow.document;
    doc.open();

    // Add the content to the new document
    doc.write(`<html><head><title>Print</title></head><body>${content}</body></html>`);

    // Add any stylesheets or styles to the new document
    const styles = document.querySelectorAll("link[rel='stylesheet'], style");
    styles.forEach(style => doc.head.appendChild(style.cloneNode(true)));

    // Print the document
    printWindow.print();

    printWindow.close();
}

</script>

<style>
#printMe {
    page-break-after: always !important;
}

@media print {
    @page {
        size: A4 !important;
        orphans: 6;
        /* Minimum number of lines to keep together at bottom */
        widows: 6;
        /* Minimum number of lines to keep together at top */
    }

    body {
        padding: 0 10mm;
    }

    #printMe {
        page-break-after: always !important;
    }

    /* thead {
		height: 20mm !important;
	} */

    tfoot {
        height: 20mm;
    }
}
</style>