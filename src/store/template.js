import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'
import axiosClient from "../axios-client";

export const useTemplateStore = defineStore('template', () => {
    const templates = ref([]); // state
    const loading = ref(false);
    const errors = ref(null);
    const router = useRouter();
    const template = ref(null);
    
    const getTemplates = async() => {
        loading.value = true;
        await axiosClient.get('/templates').then(({data}) => {
            loading.value = false;
            templates.value = data.data;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const getTemplate = async(payload) => {
        console.log("Fetching Template Data ", payload)
        loading.value = true;
        await axiosClient.get('/templates/' + payload).then(({data}) => {
            loading.value = false;
            template.value = data;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const createTemplate = async(payload)=> {
        loading.value = true;
        return await axiosClient.post('/templates', payload).then((response) => {
            loading.value = false;
            return response;
        }).catch(err => {
            loading.value = false;
            const response = err.response;
            if(response && response.status ===422 ) {
                errors.value = response.data.errors;
            }
        })
    }

    const deleteTemplate = async(payload) => {
        loading.value = true;
        return await axiosClient.delete('/templates/' + payload).then((response) => {
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



    return { templates, template, loading, errors, getTemplates, getTemplate, createTemplate, deleteTemplate}
})