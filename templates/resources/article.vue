<script lang="ts" setup>
type Article = ReturnType<typeof setupArticlePage>['value']

const article = setupPage({
  type: 'article',
})

useSeoMeta(() => {
  return {
    title: article.value.title,
  }
})

const recommendArticles: Ref<Article[]> = useRecommendArticle(article.value, {
  count: 4,
})
const { articles: lastArticles } = useFillArticles(4)
</script>

<template>
  <ArticleLayout :article="article" class="m-4" />
  <div class="mx-auto max-w-[1400px] px-8 pb-16">
    <div v-if="recommendArticles?.length" class="mt-16">
      <h2 class="my-2 mb-6 border-b border-neutral-600 pb-2 font-sans text-[2rem] font-bold leading-10 dark:text-white">
        Related
      </h2>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <ArticleCard
          v-for="recommendArticle of recommendArticles"
          :key="recommendArticle.id"
          :article="recommendArticle"
        />
      </div>
    </div>
    <div class="mt-16">
      <h2 class="my-2 mb-6 border-b border-neutral-600 pb-2 font-sans text-[2rem] font-bold leading-10 dark:text-white">
        Latest
      </h2>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <ArticleCard v-for="lastArticle of lastArticles" :key="lastArticle.id" :article="lastArticle" />
      </div>
    </div>
  </div>
</template>
