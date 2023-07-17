<script lang="ts" setup>
import logoLight from '~/assets/logo-light.svg'
import logoDark from '~/assets/logo-dark.svg'

const site = useSite()
const { $paywall } = useNuxtApp()

const isSearchDialogOpened = ref(false)
watch(isSearchDialogOpened, (val) => {
  val ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden')
})

const colorMode = useColorMode()

const isMounted = useMounted()

const logo = computed(() => {
  if (!isMounted.value) {
    return logoLight
  }

  // check colorMode only on client to ensure use correct logo
  if (colorMode.value === 'dark') {
    return logoDark
  }
  return logoLight
})

const isLoggedIn = computed(() => isMounted.value && $paywall?.authInfo.value)
</script>

<template>
  <header class="border-b-[.5px] border-stone-200 py-5 dark:border-white">
    <div
      class="m-auto grid w-full max-w-[1400px] grid-cols-[auto_2fr_auto] items-center gap-x-4 px-5 md:grid-cols-[1fr_2fr_1fr] lg:px-8"
    >
      <div class="order-2 ml-auto flex items-center gap-x-2 uppercase md:order-1 md:ml-0">
        <!-- light/dark mode toggle button -->
        <div
          v-if="$colorMode.value === 'light'"
          role="button"
          class="flex items-center gap-1"
          @click="$colorMode.preference = 'dark'"
        >
          <Icon name="material-symbols:dark-mode" />
          <span class="hidden text-xs font-medium leading-4 tracking-[.044rem] hover:underline lg:block">Dark</span>
        </div>

        <div v-else role="button" class="flex items-center gap-1" @click="$colorMode.preference = 'light'">
          <Icon name="material-symbols:light-mode-outline" />
          <span class="hidden text-xs font-medium leading-4 tracking-[.044rem] hover:underline lg:block">Light</span>
        </div>

        <!-- search button -->
        <div role="button" class="flex items-center gap-1" @click="isSearchDialogOpened = true">
          <Icon name="material-symbols:search" />
          <span class="hidden text-xs font-medium leading-4 tracking-[.044rem] hover:underline lg:block">Search</span>
        </div>
      </div>

      <!-- site logo -->
      <div class="order-1 grow md:order-2">
        <NuxtLink to="/" class="link-hover mx-auto block w-fit">
          <nuxt-img :alt="site.publicationName" class="h-12 max-h-12 w-full max-w-full" :src="logo" />
        </NuxtLink>
      </div>

      <div class="order-3 justify-self-end lg:flex lg:gap-x-4">
        <!-- subscriber sign in button -->
        <button
          type="button"
          class="hidden text-xs font-medium uppercase leading-4 tracking-[.044rem] hover:underline lg:block"
          @click="$paywall.showUserDialog()"
        >
          {{ isLoggedIn ? 'account' : 'sign in' }}
        </button>

        <!-- subscribe button -->
        <button
          v-if="!isLoggedIn"
          type="button"
          class="rounded border border-black px-4 py-2 text-sm font-medium leading-4 tracking-[.044rem] text-black transition-colors hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-black dark:hover:text-white"
          @click="$paywall.showUserDialog()"
        >
          Subscribe
        </button>
      </div>
    </div>

    <SearchDialog v-show="isSearchDialogOpened" @close="isSearchDialogOpened = false" />
  </header>
</template>
