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
									Template</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
									Created by</th>
								<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							<tr v-for="report in reportStore.reports" :key="report.id">
								<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
									{{
										report.entry.patient.name
									}}</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ report.entry.template.name
								}}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ report.creator.name }}
								</td>
								<td
									class="relative whitespace-nowrap flex items-center justify-end gap-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
									<a href="#" class="text-red-600 hover:text-red-700">
										<TrashIcon class="w-5" /><span class="sr-only">, {{
											report.id
										}}</span>
									</a>
									<a href="#" class="text-indigo-600 hover:text-indigo-700">
										<PencilSquareIcon class="w-5" /><span class="sr-only">, {{
											report.id
										}}</span>
									</a>
									<a @click="viewReport(report)"
										class="text-green-600 hover:text-green-700 flex items-center">
										<EyeIcon class="w-5" /><span class="sr-only">, {{
											report.id
										}}</span>
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<DetailPopup :isOpen="isOpen" @close="close" :boxSize="'large'">
			<div id="printMe">
				<table class="min-w-full divide-y divide-gray-300">
					<thead></thead>
					<tbody class="bg-gray-50">
						<tr class="w-full">
							<h2 class="text-center text-2xl font-semibold">Report Details of {{
								reportDetail.entry.patient.name }}</h2>
						</tr>
						<tr>
							<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
								Patient Name: {{ reportDetail.entry.patient.name }}
							</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Hospital Number: {{ reportDetail.entry.patient.name }}</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Refer by: {{ reportDetail.entry.patient.refer_by }}</th>
						</tr>
						<tr>
							<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
								Address: {{ reportDetail.entry.patient.address }}
							</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Phone Number: {{ reportDetail.entry.patient.phone }}</th>
							<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Date: {{
									reportDetail.entry.patient.created_at.split('T')[0] }}</th>
						</tr>
					</tbody>
					<tbody class="divide-y divide-gray-200 bg-white">
						<tr>
							<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
								<div v-html="reportDetail.content">
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

		</DetailPopup>
	</div>
</template>

<script setup>
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { onMounted, ref } from "vue";
import { useReportsStore } from "../../store/report";
import DetailPopup from "../global/DetailPopup.vue";

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