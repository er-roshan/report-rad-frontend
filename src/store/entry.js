import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axios-client";
import { useHospitalStore } from './hospital'


export const useEntriesStore = defineStore('entry', ()=> {
    const entries = ref([]);
    const loading = ref(false);
    const errors = ref(null);
    const router = useRouter();
    const entry = ref(null);
    const hospitalStore = useHospitalStore()

    const getEntries = async() => {
        loading.value = true;
        await axiosClient.get('/entries', {
            params: {
                hospital_id: hospitalStore.activeHospital.id
            }
        }).then(({data}) => {
            loading.value = false;
            entries.value = data.data;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const getEntry = async(payload) => {
        loading.value = true;
        return await axiosClient.get('/entries/' + payload).then((response) => {
            loading.value = false;
            entry.value = response.data;
            return response
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }
 

    const createEntry = async(payload)=> {
        loading.value = true;
        return await axiosClient.post('/entries', payload).then((response) => {
            loading.value = false;
            return response
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const deleteEntry = async(payload) => {
        loading.value = true;
        return await axiosClient.delete('/entries/' + payload).then((response) => {
            loading.value = false;
            return response
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }


    return { entries, entry, loading, errors, getEntries, getEntry, createEntry, deleteEntry }
})