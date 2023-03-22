<template>
    <div class="py-6">
        <div class="flex justify-between items-center mb-4">
            <RouterLink to="/patients" class="flex items-center gap-x-2 global-btn primary-btn"><ArrowLeftIcon class="w-4" />Go Back</RouterLink>
            <h2 class="text-2xl font-medium leading-6 text-gray-700 underline">Patient Details</h2>
            <RouterLink to="/patients" class="flex items-center gap-x-2 global-btn bg-green-600 text-gray-50"><PencilSquareIcon class="w-4" />Edit</RouterLink>
        </div>
        <section aria-labelledby="applicant-information-title">
            <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h2 id="applicant-information-title" class="text-lg font-medium leading-6 text-gray-900">Patient
                        Information</h2>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:px-6" v-if="patientStore.patient">
                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Patient Name </dt>
                            <dd class="mt-1 text-sm text-gray-900">{{patientStore.patient.name}}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Email address</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{patientStore.patient.email}}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Address</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{patientStore.patient.address}}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{patientStore.patient.phone}}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Age</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{patientStore.patient.age.age_value}} {{patientStore.patient.age.age_unit}}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Gender</dt>
                            <dd class="mt-1 text-sm text-gray-900 capitalize">{{patientStore.patient.gender}}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Refer by</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{patientStore.patient.refer_by}}</dd>
                        </div>
                        
                        <div class="sm:col-span-2">
                            <dt class="text-sm font-medium text-gray-500">Reports</dt>
                            <dd class="mt-1 text-sm text-gray-900">
                                <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
                                    <li v-for="attachment in attachments" :key="attachment.name"
                                        class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div class="flex w-0 flex-1 items-center">
                                            <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <span class="ml-2 w-0 flex-1 truncate">{{ attachment.name }}</span>
                                        </div>
                                        <div class="ml-4 flex-shrink-0">
                                            <a :href="attachment.href"
                                                class="font-medium text-blue-600 hover:text-blue-500">Download</a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:px-6" v-else>
                    <h4 class="text-center">Patient Details Doesn't Exits</h4>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>

import { onMounted, computed } from 'vue';
import { usePatientStore } from '../../store/patient';
import {
    CheckIcon,
    HandThumbUpIcon,
    PaperClipIcon,
    UserIcon
} from '@heroicons/vue/20/solid'
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/vue/24/outline"
import { useRoute } from 'vue-router';

const user = {
    name: 'Whitney Francis',
    email: 'whitney@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}
const attachments = [
    { name: 'resume_front_end_developer.pdf', href: '#' },
    { name: 'coverletter_front_end_developer.pdf', href: '#' },
]
const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}

const route = useRoute()

const patientId = computed(() => {
    return route.params.id;
})
const patientStore = usePatientStore();

onMounted(() => {
    patientStore.getPatient(patientId.value);  
})

</script>