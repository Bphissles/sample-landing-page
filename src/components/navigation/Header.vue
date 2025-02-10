<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-lg">
      <a class="navbar-brand" href="#">
        <img src="/images/torch-trans.png" alt="" height="60">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/blog">Blog</RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Progress</a>
          </li>
        </ul>
        <span class="navbar-text">
          Nugget about the game
        </span>
      </div>
    </div>
  </nav>
</template>