import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import UnitList from "@/views/Unit.vue";
import UnitUpdate from "@/components/Unit/UnitUpdate.vue";
import CategoriesList from "@/views/Categories.vue";
import CategoriesUpdate from "@/components/Categories/CategoriesUpdate.vue";
import ProductsList from "@/views/Products.vue";
import ProductsUpdate from "@/components/Products/ProductsUpdate.vue";
import MenuList from "@/views/Menu.vue";
import MenuUpdate from "@/components/Menu/MenuUpdate.vue";
import RecipesList from "@/views/Recipes.vue";
import RecipesUpdate from "@/components/Recipes/RecipesUpdate.vue";
import RecipeCategoriesList from "@/views/RecipeCategories.vue";
import RecipeCategoriesUpdate from "@/components/RecipeCategories/RecipeCategoriesUpdate.vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/unit/",
      children: [
        { path: "list", component: UnitList },
        { path: "update/:unitId", component: UnitUpdate },
      ],
    },
    {
      path: "/categories/",
      children: [
        { path: "list", component: CategoriesList },
        { path: "update/:categoryId", component: CategoriesUpdate },
      ],
    },
    {
      path: "/products/",
      children: [
        { path: "list", component: ProductsList },
        { path: "update/:productId", component: ProductsUpdate },
      ],
    },
    {
      path: "/menu/",
      children: [
        { path: "list", component: MenuList },
        { path: "update/:menuId", component: MenuUpdate },
      ],
    },
    {
      path: "/recipes/",
      children: [
        { path: "list", component: RecipesList },
        { path: "update/:recipeId", component: RecipesUpdate },
      ],
    },
    {
      path: "/recipe-categories/",
      children: [
        { path: "list", component: RecipeCategoriesList },
        {
          path: "update/:recipeCategoriesId",
          component: RecipeCategoriesUpdate,
        },
      ],
    },
  ],
});

export default router;
