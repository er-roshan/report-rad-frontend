<template>
    <div>
        <table class="w-full">
            <thead>
                <tr>
                    <th>
                        <div id="report-header"></div>
                    </th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <td>
                        <div id="report-footer"></div>
                    </td>
                </tr>
            </tfoot>
            <tbody>
                <tr>
                    <td>
                        <h2 class="text-center text-2xl font-semibold">Report Details of {{
                            reportDetail.entry.patient.name }}</h2>
                        <div
                            class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 border p-4 rounded-md shadow shadow-indigo-300">
                            <div class="sm:col-span-2">
                                <div class="font-medium">Patient Name: {{ reportDetail.entry.patient.name }}</div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="font-medium">Hospital Number: {{ reportDetail.entry.patient.name }}
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="font-medium">Refer by: {{ reportDetail.entry.patient.refer_by }}</div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="font-medium">Address: {{ reportDetail.entry.patient.address }}</div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="font-medium">Phone Number: {{ reportDetail.entry.patient.phone }}</div>
                            </div>
                            <div class="sm:col-span-2">
                                <div class="font-medium">Requested On: {{
                                    reportDetail.entry.patient.created_at.split('T')[0] }}
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 border p-4 rounded-md shadow shadow-indigo-300">
                            <div v-html="reportDetail.content">
                            </div>
                        </div>



                    </td>
                </tr>
            </tbody>
        </table>




        <!-- New Template for Patient REport Card -->

        <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
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
                        Requested On: {{
                            reportDetail.entry.patient.created_at.split('T')[0] }}</th>
                </tr>
            </thead>
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
</template>




