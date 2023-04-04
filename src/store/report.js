import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axios-client";


export const useReportsStore = defineStore('report', ()=> {
    const reports = ref([]);
    const loading = ref(false);
    const errors = ref(null);
    const router = useRouter();
    const report = ref(null);

    const getReports = async() => {
        loading.value = true;
        await axiosClient.get('/reports').then(({data}) => {
            loading.value = false;
            reports.value = data.data;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const getReport = async(payload) => {
        loading.value = true;
        return await axiosClient.get('/reports/' + payload).then((response) => {
            loading.value = false;
            report.value = response.data;
            return response
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }
 

    const createReport = async(payload)=> {
        loading.value = true;
        return await axiosClient.post('/reports', payload).then((response) => {
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

    const deleteReport = async(payload) => {
        loading.value = true;
        return await axiosClient.delete('/reports/' + payload).then((response) => {
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


    return { reports, report, loading, errors, getReports, getReport, createReport, deleteReport }
})