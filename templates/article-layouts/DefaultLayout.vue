<script setup lang="ts">
import dayjs from 'dayjs'

const article = useArticle()

const { resolveFromResource } = useResourceResolver()
</script>

<template>
  <article class="mx-auto max-w-[708px] px-5">
    <NuxtLink
      :to="`/desks/${article.desk.slug}`"
      class="text-xs font-medium uppercase tracking-[.7px] text-sky-800 hover:underline dark:text-orange-300"
    >
      {{ article.desk.name }}
    </NuxtLink>

    <ArticleTitle
      class="my-2 font-sans text-[1.75rem] font-semibold leading-8 dark:text-white lg:text-[2.5rem] lg:leading-[3rem]"
    />
    <ArticleBlurb class="font-sans text-xl dark:text-white lg:text-2xl" />

    <div class="mt-4 flex flex-wrap gap-2">
      <NuxtLink
        v-for="author in article.authors"
        :key="author.id"
        :to="resolveFromResource('author', author)?.url || `/author/${author.id}`"
        aria-hidden="true"
        :aria-label="author.full_name"
        class="block text-xs font-medium uppercase tracking-[.7px] text-gray-600 hover:underline dark:text-neutral-400"
      >
        <span>{{ author.full_name }}</span>
      </NuxtLink>
    </div>
    <time class="mt-2 block text-xs text-gray-600 dark:text-neutral-400" :datetime="article.published_at">
      {{ dayjs(article.published_at).format('MMMM DD, YYYY') }}
    </time>

    <ClientOnly>
      <ShareBar :image="article.cover?.url" class="mt-4 sm:mt-0" />
    </ClientOnly>

    <hr class="my-8 border-neutral-300" />

    <figure>
      <ArticleHeroPhoto v-if="article.cover?.url" :src="article.cover.url" width="668" height="445" class="w-full" />
      <figcaption v-if="article.cover?.alt" class="pt-2 text-xs text-gray-600 dark:text-neutral-400">
        {{ article.cover?.alt }}
      </figcaption>
    </figure>

    <div class="mt-8 font-sans">
      <ArticleBody class="prose dark:prose-invert lg:prose-lg" />
    </div>
  </article>
</template>
