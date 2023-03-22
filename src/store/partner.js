import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axios-client";


export const usePartnerStore = defineStore('partner', ()=> {
    const partners = ref([]);
    const loading = ref(false);
    const errors = ref(null);
    const router = useRouter();

    const getPartners = async() => {
        loading.value = true;
        await axiosClient.get('/partners').then(({data}) => {
            loading.value = false;
            partners.value = data.data;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const createPartner = async(payload)=> {
        loading.value = true;
        return await axiosClient.post('/partners', payload).then((response) => {
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

    const deletePartner = async(payload) => {
        loading.value = true;
        return await axiosClient.delete('/partners/' + payload).then((response) => {
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


    return { partners, loading, errors, getPartners, createPartner, deletePartner }
})