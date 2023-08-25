<template>
  <div class="recipe-list">
    <ButtonCreate @click="openCreate"> Создать рецепт </ButtonCreate>
    <h3 class="recipe-list__text" v-if="recipes.length > 0">Рецепты:</h3>
    <ul class="recipe-list__list">
      <template v-for="categorie in categories">
        <li
          class="recipe-list__item"
          v-if="getRecipesForCategory(categorie).length > 0"
        >
          <h4>
            {{ categorie.name }}
          </h4>
          <ul class="recipe-list__list">
            <Item
              v-for="recipe in getRecipesForCategory(categorie)"
              :text="recipe.name"
              :urlUpdate="`/recipes/update/${recipe.id}`"
              @removeClick="remove(recipe.id)"
            />
          </ul>
        </li>
      </template>
      <!--  -->
      <li class="recipe-list__item">
        <h4 v-if="recipesWithoutCategory.length > 0">Рецепты без категории</h4>
        <ul class="recipe-list__list">
          <Item
            v-for="recipe in recipesWithoutCategory"
            :text="recipe.name"
            :urlUpdate="`/recipes/update/${recipe.id}`"
            @removeClick="remove(recipe.id)"
          />
        </ul>
      </li>
    </ul>

    <Overlay :model-value="overlay" />
    <RecipesCreate ref="recipesCreate" @afterCreate="onCreate" />
  </div>
</template>

<script>
import api from "@/api.js";
import RecipesCreate from "./RecipesCreate.vue";
export default {
  data() {
    return {
      recipes: [],
      categories: [],
      overlay: false,
    };
  },
  created() {
    this.overlay = true;
    this.loadRecipeCategories();
    this.loadRecipes();
    this.overlay = false;
  },
  methods: {
    openCreate() {
      this.$refs.recipesCreate.open();
    },
    async onCreate() {
      this.loadRecipeCategories();
      this.loadRecipes();
    },
    async remove(recipeId) {
      await api.recipes.delete(recipeId);
      this.loadRecipes();
    },
    async loadRecipeCategories() {
      const response = await api.recipeCategories.list();
      this.categories = response.data;
    },
    async loadRecipes() {
      const response = await api.recipes.list();
      this.recipes = response.data;
    },
    getRecipesForCategory(categorie) {
      return this.recipes.filter(
        (recipe) => categorie.id == recipe.recipeCategoryId
      );
    },
  },
  computed: {
    recipesWithoutCategory() {
      return this.recipes.filter((recipe) => {
        if (recipe.recipeCategoryId == null) {
          return true;
        } else if (
          !this.categories.find(
            (category) => category.id == recipe.recipeCategoryId
          )
        ) {
          return true;
        }
      });
    },
  },
  components: {
    RecipesCreate,
  },
};
</script>

<style scoped>
.recipe-list__list {
  display: flex;
  flex-direction: column;
}
.recipe-list__item {
  list-style-type: none;
  margin-bottom: 5px;
  width: 550px;
}

.recipe-list__text {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
