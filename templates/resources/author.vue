<script lang="ts" setup>
const author = setupAuthorPage()

const { preload, loadMore: loadMoreArticle } = useArticleLoader({
  preload: 16,
  chunk: 16,
  condition: [{ type: 'author', key: 'id', value: author.value.id }],
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
  <section class="px-5 lg:px-8">
    <div class="mb-8">
      <div class="m-auto grid w-full max-w-[1400px] gap-8 md:grid-cols-2">
        <div>
          <picture>
            <img :alt="author.full_name" :src="author.avatar" class="mb-4 h-24 w-24 rounded-full" />
          </picture>

          <h1 class="text-[1.75rem] font-medium leading-8">
            {{ author.full_name }}
          </h1>

          <p v-html="author.bioHTML" class="mt-2 prose md:prose-lg md:text-lg font-normal leading-7"></p>

          <div class="mt-4 text-gray-600 dark:text-neutral-400">
            <a
              v-for="(link, social) in author.socials"
              :key="social"
              :href="`https://${link}`"
              target="_blank"
              rel="noopener"
              class="mr-2 underline"
              >{{ social }}</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-[1400px] pb-16">
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
  </section>
</template>
