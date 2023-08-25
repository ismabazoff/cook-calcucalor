<template>
  <div class="recipe-categorie-list">
    <ButtonCreate @click="openCreate"> Создать категорию </ButtonCreate>
    <h3 class="recipe-categorie-list__text" v-if="recipeCategories.length > 0">
      Категории рецептов:
    </h3>
    <ul class="recipe-categorie-list__list">
      <Item
        v-for="recipeCategorie in recipeCategories"
        :text="recipeCategorie.name"
        :urlUpdate="`/recipe-categories/update/${recipeCategorie.id}`"
        @removeClick="remove(recipeCategorie.id)"
      />
    </ul>
    <Overlay :model-value="overlay" />
    <RecipeCategoriesCreate
      ref="recipeCategoriesCreate"
      @afterCreate="onCreate"
    />
  </div>
</template>

<script>
import api from "@/api.js";
import RecipeCategoriesCreate from "./RecipeCategoriesCreate.vue";
export default {
  data() {
    return {
      recipeCategories: [],
      overlay: false,
    };
  },
  created() {
    this.overlay = true;
    this.loadRecipeCategories();
    this.overlay = false;
  },
  methods: {
    openCreate() {
      this.$refs.recipeCategoriesCreate.open();
    },
    async onCreate() {
      this.loadRecipeCategories();
    },
    async remove(recipeCategoriesId) {
      await api.recipeCategories.delete(recipeCategoriesId);
      this.loadRecipeCategories();
    },
    async loadRecipeCategories() {
      const response = await api.recipeCategories.list();
      this.recipeCategories = response.data;
    },
  },
  components: {
    RecipeCategoriesCreate,
  },
};
</script>

<style scoped>
.recipe-categorie-list__list {
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
.recipe-categorie-list__text {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
