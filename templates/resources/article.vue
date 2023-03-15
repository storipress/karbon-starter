<script lang="ts" setup>
const article = setupArticlePage()
</script>

<template>
  <div>
    <div>Design your article page</div>
    <div>ArticleLayout component will let you to easily select your layout in Storipress</div>
    <ArticleLayout :article="article" />
  </div>
</template>
