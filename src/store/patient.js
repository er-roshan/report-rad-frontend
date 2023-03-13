import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axios-client"


export const usePatientStore = defineStore('patient', ()=> {
    const patients = ref([]);
    const loading = ref(false);
    const errors = ref(null);
    const router = useRouter();

    const getPatients = async() => {
        loading.value = true;
        await axiosClient.get('/patients').then(({data}) => {
            loading.value = false;
            patients.value = data.data;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const createPatient = async(payload)=> {
        loading.value = true;
        await axiosClient.post('/patients', payload).then(({ data }) => {
            loading.value = false;
            router.push('/patients')
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    return { patients, loading, errors, getPatients, createPatient}
})