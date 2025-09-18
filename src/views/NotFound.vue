<template>
    <div class="w-full min-h-dvh flex flex-col justify-center items-center gap-2">
        <h3 class="font-bold text-primaryText text-2xl">
            404 {{ $t("notFound.titleNotFound") }}
        </h3>
        <router-link to="/" class="text-white cursor-pointer bg-secondaryText rounded-md px-3 py-1">
            {{ $t("notFound.ctaNotFound") }}
        </router-link>
    </div>
</template>
