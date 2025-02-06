<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/navigation/Header.vue'
import Footer from '@/components/navigation/Footer.vue'
</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="mt-5">
    <Footer />
  </footer>
</template>
