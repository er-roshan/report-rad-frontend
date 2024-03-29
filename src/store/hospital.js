import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../axios-client";

export const useHospitalStore = defineStore("hospital", () => {
  const hospitals = ref([]);
  const loading = ref(false);
  const errors = ref(null);
  const router = useRouter();
  const activeHospital = ref(computed(() => getActiveHospital()));

  const getActiveHospital = () => {
    const storedActiveHospital = localStorage.getItem("ACTIVE_HOSPITAL");
    console.log("Checking localstorage", storedActiveHospital)

    if (storedActiveHospital !== null && storedActiveHospital !== "undefined") {
      return JSON.parse(storedActiveHospital);
    } else if (hospitals.value.length > 0) {
      return hospitals.value[0]; // Use the first hospital if not found in local storage
    } else {
      return null; // No hospitals available
    }
  };

  const getHospitals = async () => {
    loading.value = true;
    await axiosClient
      .get("/hospitals")
      .then(({ data }) => {
        loading.value = false;
        hospitals.value = data.data;
      })
      .catch((err) => {
        loading.value = false;
        const response = err.response;
        if (response && response.status === 422) {
          errors.value = response.data.errors;
        }
      });
  };

  const createHospital = async (payload) => {
    loading.value = true;
    return await axiosClient
      .post("/hospitals", payload)
      .then((response) => {
        loading.value = false;
        return response;
      })
      .catch((err) => {
        loading.value = false;
        const response = err.response;
        if (response && response.status === 422) {
          errors.value = response.data.errors;
        }
      });
  };

  const updateHospital = async (payload) => {
    loading.value = true;
    return await axiosClient
      .patch("/hospitals/" + payload.id, {
        name: payload.name,
      })
      .then((response) => {
        loading.value = false;
        return response;
      })
      .catch((err) => {
        loading.value = false;
        const response = err.response;
        if (response && response.status === 422) {
          errors.value = response.data.errors;
        }
      });
  };

  const deleteHospital = async (payload) => {
    loading.value = true;
    return await axiosClient
      .delete("/hospitals/" + payload)
      .then((response) => {
        loading.value = false;
        return response;
      })
      .catch((err) => {
        loading.value = false;
        const response = err.response;
        if (response && response.status === 422) {
          errors.value = response.data.errors;
        }
      });
  };

  const changeHospital = (payload) => {
    localStorage.setItem("ACTIVE_HOSPITAL", JSON.stringify(payload));
    getActiveHospital();
    // activeHospital.value = payload;
  };

  return {
    hospitals,
    activeHospital,
    loading,
    errors,
    getHospitals,
    createHospital,
    deleteHospital,
    changeHospital,
    updateHospital,
    getActiveHospital,
  };
});
