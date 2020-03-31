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
import Vue from "vue";
import Component from "vue-class-component";

const CommonPaginationProps = Vue.extend({
  props: {
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  }
});

@Component
export default class CommonPagination extends CommonPaginationProps {
  get pages(): number[] {
    const res = Array.from(
      Array(Math.ceil(this.totalItems / this.itemsPerPage) + 1).keys()
    );
    res.shift();
    return res;
  }

  changePage(page: number): void {
    this.$emit("page-changed", page);
  }
}
</script>
