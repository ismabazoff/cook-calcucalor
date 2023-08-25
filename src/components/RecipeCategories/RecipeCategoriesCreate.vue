<template>
  <Modal ref="modal">
    <RecipeCategoriesForm
      ref="recipeCategoriesForm"
      @cancel="cancel"
      @save="save"
      title="Создание категории"
    />
  </Modal>
</template>

<script>
import api from "@/api.js";
import RecipeCategoriesForm from "./RecipeCategoriesForm.vue";
export default {
  data() {
    return {
      overlay: false,
      recipesCategory: "",
    };
  },
  methods: {
    open() {
      this.$refs.modal.open();
    },
    cancel() {
      this.$refs.modal.close();
      this.$refs.recipeCategoriesForm.setRecipeCategoryName("");
    },
    async save() {
      const recipesCategory =
        this.$refs.recipeCategoriesForm.getRecipeCategoryName();
      if (recipesCategory == "") {
        return;
      }
      this.$refs.recipeCategoriesForm.showOverlay();
      const response = await api.recipeCategories.create(recipesCategory);
      this.$refs.modal.close();
      this.$refs.recipeCategoriesForm.hideOverlay();
      this.$refs.recipeCategoriesForm.setRecipeCategoryName("");
      this.$emit("afterCreate", {
        recipeCategoryId: response.id,
      });
    },
  },
  components: {
    RecipeCategoriesForm,
  },
};
</script>
