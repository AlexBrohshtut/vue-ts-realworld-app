<template>
  <article-editor />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ArticleEditor from "@/components/ArticleEditor.vue";

@Component({
  components: {
    ArticleEditor
  }
})
export default class ArticleCreate extends Vue {}
</script>
