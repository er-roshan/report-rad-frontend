<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 items-center px-4">
                <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company" /> -->
                <h1>Report Rad</h1>
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto">
                <nav class="space-y-1 px-2">
                  <a v-for="item in navigation" :key="item.name" :href="item.href" v-if="item.visible"
                    :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group rounded-md py-2 px-2 flex items-center text-base font-medium']">
                    <component :is="item.icon"
                      :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-4 flex-shrink-0 h-6 w-6']"
                      aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col bg-gradient-to-r from-sky-300 to-sky-500">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-gradient-to-r from-sky-300 to-sky-500">
        <div class="flex flex-shrink-0 items-center">
          <!-- <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company" /> -->
          <div class="flex items-center justify-center py-4 w-full text-center border-b border-white">
            <img class="w-8"
              src="https://dreamifyitsolution.com.au/wp-content/uploads/2023/07/cropped-dreamify-favicon-1-180x180.png"
              alt="">
            <h1 class="text-xl font-serif uppercase text-white font-bold ml-2">
              <span class="font-medium">R</span>eport Rad
            </h1>
          </div>
        </div>
        <div class="mt-5 flex flex-grow flex-col">
          <nav class="flex-1 space-y-1 px-2 pb-4" v-if="navigation">
            <template v-for="item in navigation" :key="item.name">
              <RouterLink :to="item.href" v-if="item.visible"
                :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-100 hover:bg-gray-50 hover:text-gray-900', 'group rounded-md py-2 px-2 flex items-center text-sm font-medium']">
                <component :is="item.icon"
                  :class="[item.current ? 'text-gray-500' : 'text-gray-100 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']"
                  aria-hidden="true" />
                {{ item.name }}
              </RouterLink>
            </template>

          </nav>
        </div>
      </div>
    </div>

    <div class="md:pl-64">
      <div class="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
        <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
          <button type="button"
            class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon class="h-6 w-6" aria-hidden="true" />
          </button>
          <div class="flex flex-1 justify-between px-4 md:px-0">
            <div class="flex flex-1">
              <form class="flex w-full md:ml-0" action="#" method="GET">
                <label for="search-field" class="sr-only">Search</label>
                <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input id="search-field"
                    class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                    placeholder="Search" type="search" name="search" />
                </div>
              </form>
            </div>
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Active Hospital dropdown -->
              <Menu as="div" class="relative ml-3" v-if="hospitalStore.activeHospital">
                <div>
                  <MenuButton
                    class="flex px-2 py-1 max-w-xs items-center rounded-md text-sm bg-gradient-to-r from-sky-300 to-sky-500 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                    <span class="sr-only">Open user menu</span>
                    {{ hospitalStore.activeHospital.name }}
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="hospital in hospitalStore.hospitals" :key="hospital.name" v-slot="{ active }">
                    <a @click="changeHospital(hospital)"
                      :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700']">{{ hospital.name
                      }}</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                    <a v-if="authStore.user" href="/profile" class="block py-2 px-4 text-sm text-gray-700">Profile({{
                      authStore.user.name
                    }})</a>
                    </MenuItem>
                    <MenuItem>
                    <button @click="logout" class="block py-2 px-4 text-sm text-gray-700">Sign out</button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>

        <main class="flex-1">
          <RouterView />

        </main>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, watch, computed, reactive, onMounted } from 'vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  SquaresPlusIcon,
  BuildingOfficeIcon
} from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { useRoute, useRouter } from 'vue-router';
import { useHospitalStore } from '../store/hospital';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore()

const route = useRoute();

const router = useRouter();

const currentRoute = ref('/dashboard');

const checkPath = (value) => {
  return currentRoute.value === value ? true : false;
}

watch(
  () => route.path,
  (newPath, oldPath) => {
    currentRoute.value = newPath;
  }
)

const navigation = reactive([
  { name: 'Reports', visible: true, href: '/reports', icon: ChartBarIcon, current: computed(() => checkPath('/reports')) },
  // { name: 'Dashboard', visible: computed(() => checkAdmin()), href: '/dashboard', icon: HomeIcon, current: computed(() => checkPath('/dashboard')) },
  { name: 'Hospitals', visible: computed(() => checkAdmin()), href: '/hospitals', icon: BuildingOfficeIcon, current: computed(() => checkPath('/hospitals')) },
  { name: 'Partners', visible: computed(() => checkAdmin()), href: '/partners', icon: CheckBadgeIcon, current: computed(() => checkPath('/partners')) },
  { name: 'Staffs', visible: computed(() => checkAdmin()), href: '/staffs', icon: UsersIcon, current: computed(() => checkPath('/staffs')) },
  { name: 'Management Hub', visible: true, href: '/templates', icon: FolderIcon, current: computed(() => checkPath('/templates')) },
])
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
]

const sidebarOpen = ref(false);

const hospitalStore = useHospitalStore();

onMounted(async () => {
  const storedActiveHospital = localStorage.getItem("ACTIVE_HOSPITAL");
  console.log("Checking", localStorage.getItem("ACTIVE_HOSPITAL") == undefined)
  currentRoute.value = route.path;
  await hospitalStore.getHospitals();
  if (storedActiveHospital == null || storedActiveHospital == "undefined") {
    hospitalStore.changeHospital(hospitalStore.hospitals[0])
  }
  await authStore.getProfile()
})

const changeHospital = (payload) => {
  if (payload.name !== hospitalStore.activeHospital.name) {
    const result = window.confirm(`All the details will be loaded for ${payload.name}. Are you sure you want to change Hospital?`)
    if (result) {
      hospitalStore.changeHospital(payload);
      location.reload()
    } else {
      return
    }
  }
}

const logout = async () => {
  const res = await authStore.logout();
  router.push('/login')
}

const checkAdmin = () => {
  return authStore.user && authStore.user.role === 'admin' ? true : false;
}
</script>