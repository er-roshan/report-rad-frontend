<template>
    <div id="printMe">
        <div class="page page-header">
        </div>
        <div class="page page-body">
            <table class="min-w-full divide-y divide-gray-300">
                <tbody class="bg-gray-50">
                    <tr class="w-full">
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Patient Name: {{ data.entry.patient.name }}
                        </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Hospital Number: {{ data.entry.patient.name }}
                        </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Refer by: {{ data.entry.patient.refer_by }}
                        </th>
                    </tr>
                    <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Address: {{ data.entry.patient.address }}
                        </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Phone Number: {{ data.entry.patient.phone }}
                        </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date: {{ data.entry.patient.created_at.split('T')[0] }}
                        </th>
                    </tr>
                </tbody>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr>
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <div v-html="data.content"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="page page-footer">
            <!-- Page footer content goes here -->
            <div class="footer-details flex justify-between">
                <p>Date: {{ new Date().toLocaleDateString() }}</p>
                <p>Doctor's Signature: _________________________</p>
            </div>
        </div>
    </div>
    <div class="pt-5">
        <div class="flex justify-end">
            <button @click="emitClose"
                class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Close</button>
            <button @click="print"
                class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Print
            </button>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useReportsStore } from "../../store/report";

const props = defineProps({
    data: Object
})

const emit = defineEmits(['close'])

const isOpen = ref(false);

const emitClose = () => {
    emit('close')
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
  // Get the content to be printed by its ID
  const content = document.getElementById("printMe");

  if (!content) {
    console.error("Element with ID 'printMe' not found.");
    return;
  }

  // Create a new window for printing
  const printWindow = window.open("", "Print");

  if (!printWindow) {
    console.error("Failed to open a print window.");
    return;
  }

  // Create a new document in the print window
  const doc = printWindow.document;
  doc.open();

  // Add the content to the new document
  doc.write(`<html><head><title>Print</title></head><body>${content.innerHTML}</body></html>`);

  // Add any stylesheets or styles to the new document
  const styles = document.querySelectorAll("link[rel='stylesheet'], style");
  styles.forEach(style => {
    const newStyle = style.cloneNode(true);
    newStyle.media = "print";
    doc.head.appendChild(newStyle);
  });

  // Wait for the content to load before printing
  setTimeout(() => {
    // Print the document
    printWindow.print();
  
    // Close the print window
    printWindow.close();
  }, 1000); // Adjust the delay time as needed
};


</script>

<style scoped>
@media print {
    .page {
        page-break-before: always;
    }

    .page-header {
        position: fixed;
        top: 0;
        width: 100%;
        text-align: center;
        background-color: #f0f0f0;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
    }

    .page-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        background-color: #f0f0f0;
        padding: 10px 0;
        border-top: 1px solid #ccc;
    }

    .footer-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0 0;
    }
}
</style>
