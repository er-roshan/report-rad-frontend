import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axiosClient from "../axios-client.js";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("ACCESS_TOKEN") || null);
  const loading = ref(false);
  const loginErrors = ref(null);
  const registerErrors = ref(null);

  const login = async (payload) => {
    console.log(payload);
    loading.value = true;
    return await axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        loading.value = false;
        user.value = data.user;
        localStorage.setItem("ACCESS_TOKEN", data.token);
        return data;
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          loginErrors.value = response.data.errors;
        }
      });
  };
  const register = async (payload) => {
    console.log(payload);
    loading.value = true;
    await axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        loading.value = false;
        user.value = data.user;
        localStorage.setItem("ACCESS_TOKEN", data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          registerErrors.value = response.data.errors;
        }
      });
  };

  const logout = async () => {
    return await axiosClient
      .post("/logout")
      .then((res) => {
        loading.value = false;
        localStorage.removeItem("ACCESS_TOKEN");
        return;
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          registerErrors.value = response.data.errors;
        }
      });
  };

  const getProfile = async () => {
    return await axiosClient
      .get("/user")
      .then(({data}) => {
        loading.value = false;
        user.value = data
        return;
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          registerErrors.value = response.data.errors;
        }
      });
  };

  return {
    user,
    token,
    loginErrors,
    registerErrors,
    login,
    register,
    loading,
    logout,
    getProfile
  };
});
