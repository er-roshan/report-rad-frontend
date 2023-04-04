import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axios-client";


export const useStaffStore = defineStore('staff', ()=> {
    const staffs = ref([]);
    const loading = ref(false);
    const errors = ref(null);
    const router = useRouter();

    const getStaffs = async() => {
        loading.value = true;
        await axiosClient.get('/staffs').then(({data}) => {
            loading.value = false;
            staffs.value = data.data;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const createStaff = async(payload)=> {
        loading.value = true;
        return await axiosClient.post('/staffs', payload).then((response) => {
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

    const deleteStaff = async(payload) => {
        loading.value = true;
        return await axiosClient.delete('/staffs/' + payload).then((response) => {
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


    return { staffs, loading, errors, getStaffs, createStaff, deleteStaff }
})