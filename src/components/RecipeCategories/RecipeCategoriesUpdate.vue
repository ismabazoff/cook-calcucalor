<template>
  <Modal ref="modal"
    ><RecipeCategoriesForm
      ref="recipeCategoriesForm"
      @save="save"
      @cancel="cancel"
      title="Редактирование категории"
  /></Modal>
</template>

<script>
import api from "@/api.js";
import RecipeCategoriesForm from "./RecipeCategoriesForm.vue";
export default {
  async mounted() {
    this.$refs.modal.open();
    this.$refs.recipeCategoriesForm.showOverlay();
    const response = await api.recipeCategories.read(
      this.$route.params.recipeCategoriesId
    );
    this.$refs.recipeCategoriesForm.setRecipeCategoryName(response.name);
    this.$refs.recipeCategoriesForm.hideOverlay();
  },
  methods: {
    async save() {
      this.$refs.recipeCategoriesForm.showOverlay();

      let formData = new FormData();
      formData.append(
        "name",
        this.$refs.recipeCategoriesForm.getRecipeCategoryName()
      );
      await api.recipeCategories.update(
        this.$route.params.recipeCategoriesId,
        formData
      );

      this.$router.go(-1);
      this.$refs.recipeCategoriesForm.hideOverlay();
      // 1-нажимаем на копку сохранить
      // 2-Сохраняем на сервер значение инпута
      // 3-Переходим на страницу назад
      // При клике на кнопку сохранить,сохраняем значение инпута в списке
    },
    cancel() {
      this.$refs.recipeCategoriesForm.showOverlay();
      this.$refs.recipeCategoriesForm.hideOverlay();
      this.$router.go(-1);
    },
  },
  components: {
    RecipeCategoriesForm,
  },
};
</script>
