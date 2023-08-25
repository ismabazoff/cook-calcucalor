<template>
  <Modal ref="modal"
    ><RecipesForm
      ref="recipesForm"
      @save="save"
      @cancel="cancelUpdateRecipe"
      title="Редактирование рецепта"
  /></Modal>
</template>

<script>
import api from "@/api.js";
import RecipesForm from "./RecipesForm.vue";
export default {
  props: {
    afterSave: {
      default() {
        return function () {
          this.$router.go(-1);
        };
      },
    },
    cancel: {
      default() {
        return function () {
          this.$router.go(-1);
        };
      },
    },
  },
  async mounted() {
    this.$refs.modal.open();
    if (this.$route.params.recipeId) {
      this.recipeId = this.$route.params.recipeId;
      this.loadRecipe(this.$route.params.recipeId);
    }
  },
  data() {
    return {
      recipeId: null,
    };
  },
  methods: {
    async save() {
      this.$refs.recipesForm.showOverlay();
      let formData = new FormData();
      formData.append("name", this.$refs.recipesForm.getRecipesName());
      formData.append(
        "recipeCategoryId",
        this.$refs.recipesForm.getSelectName()
      );
      formData.append(
        "numberPersons",
        this.$refs.recipesForm.getAmountPeople()
      );
      formData.append(
        "cookingMethod",
        this.$refs.recipesForm.getCookingMethod()
      );
      formData.append(
        "products",
        JSON.stringify(this.$refs.recipesForm.getRecipeProducts())
      );
      await api.recipes.update(this.recipeId, formData);

      this.$refs.recipesForm.hideOverlay();
      this.afterSave();

      // 1-нажимаем на копку сохранить
      // 2-Сохраняем на сервер значение инпута
      // 3-Переходим на страницу назад
      // При клике на кнопку сохранить,сохраняем значение инпута в списке
    },
    cancelUpdateRecipe() {
      this.cancel();
    },
    async loadRecipe(recipeId) {
      this.$refs.recipesForm.showOverlay();
      const response = await api.recipes.read(recipeId);
      this.$refs.recipesForm.setRecipesName(response.name);
      this.$refs.recipesForm.setAmountPeople(response.numberPersons);
      this.$refs.recipesForm.setSelectName(response.recipeCategoryId);
      this.$refs.recipesForm.setCookingMethod(response.cookingMethod);
      this.$refs.recipesForm.setRecipeProducts(response.products);
      this.$refs.recipesForm.hideOverlay();
    },
    setRecipeId(recipeId) {
      this.recipeId = recipeId;
    },
  },
  components: {
    RecipesForm,
  },
};
</script>
