<script lang="ts" setup>
const article = useArticle()
</script>

<template>
  <div>
    <div>Here is your article layout</div>
    <h1>{{ article.title }}</h1>
  </div>
</template>
