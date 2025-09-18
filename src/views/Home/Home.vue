<template>
    <div class="w-full min-h-dvh px-8 md:pl-30">
        <div class="w-full flex flex-col items-center md:items-start gap-5 pt-20">
            <div class="flex gap-2 items-center">
                <h1 class="font-bold text-secondaryText text-3xl md:text-4xl lg:text-5xl">
                    myIoT Dashboard
                </h1>
                <img class="w-5 md:w-6 lg:w-7" src="/images/logoSensor.png" alt="Logo" />
            </div>
            <p class="text-primaryText w-full text-center md:text-start md:max-w-2xl text-lg md:text-xl lg:text-2xl">
                {{ $t("home.paragraphHome") }}
            </p>
            <router-link to="/sensorList"
                class="text-white cursor-pointer bg-secondaryText rounded-md px-3 py-1 flex justify-center items-center gap-2 text-lg md:text-xl lg:text-2xl max-w-54 md:max-w-58 lg:max-w-68">
                <span>
                    {{ $t("home.ctaHome") }}
                </span>
                <i class="pi pi-wifi"></i>
            </router-link>
        </div>
    </div>
</template>
