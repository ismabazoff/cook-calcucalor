<template>
  <Modal ref="modal"
    ><CategoriesForm
      ref="categoriesForm"
      @save="save"
      @cancel="cancel"
      title="Редактирование категории"
  /></Modal>
</template>

<script>
import api from "@/api.js";
import CategoriesForm from "./CategoriesForm.vue";
export default {
  async mounted() {
    this.$refs.modal.open();
    this.$refs.categoriesForm.showOverlay();
    const response = await api.categories.read(this.$route.params.categoryId);
    this.$refs.categoriesForm.setCategoryName(response.name);
    this.$refs.categoriesForm.hideOverlay();
  },
  methods: {
    async save() {
      this.$refs.categoriesForm.showOverlay();

      let formData = new FormData();
      formData.append("name", this.$refs.categoriesForm.getCategoryName());
      await api.categories.update(this.$route.params.categoryId, formData);

      this.$router.go(-1);
      this.$refs.categoriesForm.hideOverlay();
      // 1-нажимаем на копку сохранить
      // 2-Сохраняем на сервер значение инпута
      // 3-Переходим на страницу назад
      // При клике на кнопку сохранить,сохраняем значение инпута в списке
    },
    cancel() {
      this.$refs.categoriesForm.showOverlay();
      this.$refs.categoriesForm.hideOverlay();
      this.$router.go(-1);
    },
  },
  components: {
    CategoriesForm,
  },
};
</script>
