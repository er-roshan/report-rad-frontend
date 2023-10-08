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
			<div v-if="reportDetail">
				<ReportPdf :data="reportDetail" @close="close" />
			</div>
		</DetailPopup>
	</div>
</template>

<script setup>
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { onMounted, ref } from "vue";
import { useReportsStore } from "../../store/report";
import DetailPopup from "../global/DetailPopup.vue";
import ReportPdf from "../pdf/ReportPdf.vue";

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