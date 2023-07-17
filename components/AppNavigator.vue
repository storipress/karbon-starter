<script lang="ts" setup>
const { desks } = useDesks()
</script>

<template>
  <div class="nav mb-8 border-b-[.5px] shadow-md">
    <div class="m-auto grid w-full max-w-[1400px] px-5 lg:px-8">
      <nav class="flex min-w-0 justify-center uppercase">
        <ul class="flex gap-x-5 overflow-x-scroll py-4">
          <li class="relative whitespace-nowrap text-xs font-semibold">
            <NuxtLink to="/" class="link-hover">Home</NuxtLink>
          </li>
          <li class="relative whitespace-nowrap text-xs font-semibold">
            <NuxtLink to="/latest" aria-hidden="true" aria-label="Latest articles" class="link-hover">
              <span>Latest</span>
            </NuxtLink>
          </li>
          <li v-for="desk in desks" :key="desk.id" class="relative whitespace-nowrap text-xs font-semibold">
            <NuxtLink :to="desk.url" aria-hidden="true" :aria-label="desk.name" class="link-hover">
              <span>{{ desk.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link-hover {
  @apply hover:after:absolute hover:after:top-[0.7rem] hover:after:block hover:after:h-1.5 hover:after:w-full hover:after:bg-sky-800 hover:after:mix-blend-multiply;
  @apply dark:hover:after:bg-orange-300 dark:hover:after:mix-blend-lighten;
}

.nav {
  @apply dark:border-b-[.5px] dark:border-white;
}
</style>
