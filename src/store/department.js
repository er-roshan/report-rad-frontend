import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axios-client";


export const useDepartmentStore = defineStore('department', ()=> {
    const departments = ref([]);
    const loading = ref(false);
    const errors = ref(null);
    const router = useRouter();

    const getDepartments = async() => {
        loading.value = true;
        await axiosClient.get('/departments').then(({data}) => {
            loading.value = false;
            departments.value = data.data;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const createDepartment = async(payload)=> {
        loading.value = true;
        return await axiosClient.post('/departments', payload).then((response) => {
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

    const updateDepartment = async(payload) => {
        loading.value = true;
        return await axiosClient.patch('/departments/' + payload.id, {
            name: payload.name
        }).then(response => {
            loading.value = false;
            return response
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status === 422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const deleteDepartment = async(payload) => {
        loading.value = true;
        return await axiosClient.delete('/departments/' + payload).then((response) => {
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


    return { departments, loading, errors, getDepartments, createDepartment, deleteDepartment, updateDepartment }
})