<template>
  <div class="categorie-list">
    <ButtonCreate @click="openCreate"> Создать категорию </ButtonCreate>
    <h3 class="categorie-list__text" v-if="categories.length > 0">
      Категории:
    </h3>
    <ul class="categorie-list__list">
      <Item
        v-for="categorie in categories"
        :text="categorie.name"
        :urlUpdate="`/categories/update/${categorie.id}`"
        @removeClick="remove(categorie.id)"
      />
    </ul>
    <Overlay :model-value="overlay" />
    <CategoriesCreate ref="categoriesCreate" @create="onCreate" />
  </div>
</template>

<script>
import api from "@/api.js";
import CategoriesCreate from "./CategoriesCreate.vue";
export default {
  data() {
    return {
      categories: [],
      overlay: false,
    };
  },
  created() {
    this.overlay = true;
    this.loadCategories();
    this.overlay = false;
  },
  methods: {
    openCreate() {
      this.$refs.categoriesCreate.open();
    },
    async onCreate() {
      this.loadCategories();
    },
    async remove(categoryId) {
      await api.categories.delete(categoryId);
      this.loadCategories();
    },
    async loadCategories() {
      const response = await api.categories.list();
      this.categories = response.data;
    },
  },
  components: {
    CategoriesCreate,
  },
};
</script>

<style scoped>
.categorie-list__list {
  display: flex;
  flex-direction: column;
}
.list__item {
  list-style-type: none;
  margin-bottom: 5px;
  width: 550px;
}
.list__name {
  display: inline-block;
  width: 90px;
}
.list__link {
  width: 160px;
  margin-right: 10px;
}
.categorie-list__text {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
