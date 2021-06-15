<template>
    <Layout/>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Layout from "@/components/Layout.vue";

    export default Vue.extend({
        name: 'App',
        components: {Layout},
        data: () => ({
            //
        }),

    });
</script>

<style>
    html {
        overflow: hidden !important;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    html::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    body {
        font-family: Montserrat, sans-serif;
    }

    * {
        box-sizing: border-box;
        scrollbar-width: thin;
        scrollbar-color: inset 0 0 6px rgba(0, 0, 0, 0.3) #F5F5F5;
    }

    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    *::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
        border-radius: 10px;
    }

    *::-webkit-scrollbar-thumb {
        background-color: #AAA;
        border-radius: 50px;
        border: 3px solid #AAA;
    }

    .btn {
        text-transform: capitalize !important;
    }
</style>
