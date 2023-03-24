<script lang="ts" setup>
const author = setupAuthorPage()
</script>

<template>
  <!-- header (shared) -->
  <section class="m-4">header</section>

  <!-- navigation (shared) -->
  <section class="m-4">navigation</section>

  <section class="m-4">
    <picture>
      <img :alt="author.full_name" :src="author.avatar" />
    </picture>

    <h1>{{ author.full_name }}</h1>

    <p>{{ author.bio }}</p>

    <div>
      {{ author.socials }}
    </div>
  </section>
</template>
