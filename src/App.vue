<template>
    <div id="app">
      <Navbar />
      <router-view />
      <Footer />
      <!--<FloatingForm />-->
      <CookieConsent />
      <BackToTop />
    </div>
  </template>
  
  <script setup>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  //import FloatingForm from './components/FloatingForm.vue'
  import CookieConsent from './components/CookieConsent.vue'
  import BackToTop from './components/BackToTop.vue'
  </script>
  
  <style scoped>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  </style>  