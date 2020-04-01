<template>
  <nav>
    <ul class="pagination">
      <li
        v-for="page in pages"
        :key="page"
        :class="['page-item', { active: currentPage === page }]"
      >
        <a href="#" class="page-link" @click.prevent="changePage(page)">
          {{ page }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class CommonPagination extends Vue {
  @Prop({ required: true }) totalItems!: number;
  @Prop({ required: true }) itemsPerPage!: number;
  @Prop({ required: true }) currentPage!: number;

  get pages(): number[] {
    const res = Array.from(
      Array(Math.ceil(this.totalItems / this.itemsPerPage) + 1).keys()
    );
    res.shift();
    return res;
  }

  @Emit("page-changed")
  changePage(page: number): number {
    return page;
  }
}
</script>
