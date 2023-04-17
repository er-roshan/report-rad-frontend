<template>
    <div class="px-4 sm:px-6 md:px-0">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-2xl font-semibold text-gray-900">{{props.title}}</h1>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <RouterLink :to="props.url"
                    class="inline-flex items-center justify-center global-btn primary-btn sm:w-auto">Add
                    {{props.title}}</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['title', 'url'])
</script>