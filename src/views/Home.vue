<script setup lang="ts">

</script>

<template>
    <div class="w-full min-h-dvh">
        <div class="w-full pl-28 flex flex-col gap-5 mt-20">
            <div class="flex gap-2 items-center">
                <h1 class="font-bold text-secondaryText text-3xl md:text-4xl lg:text-5xl">
                    IoT Dashboard
                </h1>
                <img class="w-5 md:w-6 lg:w-7" src="/logoSensor.png" alt="Logo" />
            </div>
            <p class="text-primaryText max-w-2xl text-lg md:text-xl lg:text-2xl">
                Welcome to the IoT sensor monitoring dashboard.
                Here you can view real-time data collected from devices, 
                analyze key metrics, and maintain full control over the status of your system.
            </p>
            <router-link to="/sensorList" class="text-white cursor-pointer bg-secondaryText rounded-md px-3 py-1 flex justify-center items-center gap-2 text-lg md:text-xl lg:text-2xl max-w-54 md:max-w-58 lg:max-w-68">
                <span>
                    Check your sensors
                </span>
                <i class="pi pi-wifi"></i>
            </router-link>
        </div>
    </div>
</template>