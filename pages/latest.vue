<script lang="ts" setup>
useSeoMeta({
  title: 'Latest articles',
})
const { preload, loadMore: loadMoreArticle } = useArticleLoader({
  preload: 16,
  chunk: 16,
})

type Articles = typeof preload.value

const list = reactive<Articles>([])
const articles = computed<Articles>(() => [...preload.value, ...list])
const loading = ref(false)
const allDone = ref(false)
const loadMore = async () => {
  if (loading.value) return
  loading.value = true

  const { done, value } = await loadMoreArticle()
  if (done) {
    allDone.value = done
    return
  }
  list.push(...value)
  loading.value = false
}
</script>

<template>
  <div class="mx-auto max-w-[1400px] px-8 pb-16">
    <h1 class="mb-8 text-[40px] font-semibold leading-[3rem] tracking-[-.5px] dark:text-white">Latest</h1>
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <ArticleCard v-for="article of articles" :key="article.id" :article="article" />
    </div>
    <button
      v-if="!allDone"
      type="button"
      class="mx-auto mt-16 block rounded-[4px] bg-sky-800 px-6 py-4 text-xs font-medium tracking-[.7px] text-white hover:bg-black dark:bg-orange-300 dark:text-black dark:hover:bg-white"
      @click="loadMore"
    >
      {{ loading ? 'LOADING' : 'LOAD MORE' }}
    </button>
  </div>
</template>
