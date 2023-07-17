<script setup lang="ts">
import dayjs from 'dayjs'

defineProps<{
  // FIXME: import type from @storipress/karbon/helper
  article: any
  classHeroPhoto?: string
  classHeroPhotoImg?: string
  classArticle?: string
  classContent?: string
  classMeta?: string
  classDesk?: string
  classTitle?: string
  classBlurb?: string
  classAuthor?: string
}>()

const { _resolveFromMetaSync } = useResourceResolver()
</script>

<template>
  <article class="group" :class="classArticle">
    <NuxtLink :to="article.url" class="relative block" :class="classHeroPhoto">
      <ArticleHeroPhoto
        v-if="article.cover?.url"
        width="652"
        height="391"
        :src="article.cover.url"
        :alt="article.cover?.alt"
        class="aspect-[5/3] w-full rounded-3xl object-cover transition duration-200 ease-in"
        :class="classHeroPhotoImg"
      />
      <div
        v-else
        class="aspect-[3/2] rounded-3xl bg-gray-100 transition duration-200 ease-in"
        :class="classHeroPhotoImg"
      />
      <slot name="image">
        <div
          class="pointer-events-none absolute bottom-0 top-auto h-full w-full translate-y-0 rounded-3xl bg-gradient-to-t from-white/10 to-transparent dark:from-black/20"
        />
        <div
          class="pointer-events-none absolute bottom-0 top-auto h-1/3 w-full translate-y-0 rounded-3xl bg-gradient-to-t from-white/20 to-transparent dark:from-black/30"
        />
      </slot>
    </NuxtLink>

    <div class="relative -mt-24 flex flex-col lg:ml-[9rem]" :class="classContent">
      <div class="text-xs uppercase leading-4 tracking-[.044rem] text-sky-800 dark:text-orange-300" :class="classDesk">
        <NuxtLink
          v-if="article.desk?.name"
          :to="_resolveFromMetaSync('desk', article.desk)?.url"
          aria-hidden="true"
          :aria-label="article.desk.name"
          class="hover:underline"
        >
          {{ article.desk.name }}
        </NuxtLink>
      </div>

      <NuxtLink :to="article.url" aria-hidden="true" :aria-label="article.title">
        <ArticleTitle
          :value="article.title"
          class="mt-2 inline break-words font-serif text-[4.375rem] font-medium leading-[3.375rem] group-hover:shadow-[0_0_#000,0_0_#000,0_0_#000,0_0_#000,inset_0_-2.5rem_0_0_#000] group-hover:shadow-sky-800 dark:group-hover:shadow-[0_0_#000,0_0_#000,0_0_#000,0_0_#000,inset_0_-2.5rem_0_0_#000] dark:group-hover:shadow-orange-300"
          :class="classTitle"
        />
      </NuxtLink>
      <ArticleBlurb :value="article.blurb" class="mt-2 text-lg leading-6" :class="classBlurb" />

      <div class="mt-2 flex flex-col gap-2 text-xs text-gray-600 dark:text-neutral-400" :class="classMeta">
        <div class="line-clamp-2 uppercase" :class="classAuthor">
          <NuxtLink
            v-for="author in article.authors"
            :key="author.id"
            :to="_resolveFromMetaSync('author', author)?.url"
            aria-hidden="true"
            aria-label="author page"
            class="mr-1 last:mr-0 hover:underline"
          >
            {{ author.full_name }}
          </NuxtLink>
        </div>

        <time>{{ dayjs(article.published_at).format('MMMM D, YYYY') }}</time>
      </div>
    </div>
  </article>
</template>
