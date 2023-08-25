<template>
  <Modal ref="modal">
    <RecipesForm
      ref="recipesForm"
      @cancel="cancel"
      @save="save"
      title="Создание рецепта"
    />
  </Modal>
</template>

<script>
import api from "@/api.js";
import RecipesForm from "./RecipesForm.vue";
export default {
  methods: {
    open() {
      this.$refs.modal.open();
    },
    cancel() {
      this.$refs.modal.close();
      this.$refs.recipesForm.setRecipesName("");
    },
    async save() {
      const recipe = this.$refs.recipesForm.getRecipesName();
      const amount = this.$refs.recipesForm.getAmountPeople();
      const categoryId = this.$refs.recipesForm.getRecipesCategory();
      const cookingMethodText = this.$refs.recipesForm.getCookingMethod();
      const recipeProducts = this.$refs.recipesForm.getRecipeProducts();
      if (recipe == "") {
        return;
      }
      this.$refs.recipesForm.showOverlay();
      const response = await api.recipes.create(
        recipe,
        amount,
        categoryId,
        cookingMethodText,
        recipeProducts
      );
      this.$refs.modal.close();
      this.$refs.recipesForm.hideOverlay();
      this.$refs.recipesForm.setRecipesName("");
      this.$refs.recipesForm.setRecipesCategory("");
      this.$refs.recipesForm.setAmountPeople("");
      this.$refs.recipesForm.setCookingMethod("");
      this.$refs.recipesForm.setRecipeProducts([]);
      this.$emit("afterCreate", {
        recipeId: response.id,
      });
    },
  },
  components: {
    RecipesForm,
  },
};
</script>
