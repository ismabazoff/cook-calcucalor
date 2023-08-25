<template>
  <Modal ref="modal">
    <CategoriesForm
      ref="categoriesForm"
      @cancel="cancel"
      @save="save"
      title="Создание категории"
    />
  </Modal>
</template>

<script>
import api from "@/api.js";
import CategoriesForm from "./CategoriesForm.vue";
export default {
  methods: {
    open() {
      this.$refs.modal.open();
    },
    cancel() {
      this.$refs.modal.close();
      this.$refs.categoriesForm.setCategoryName("");
    },
    async save() {
      const category = this.$refs.categoriesForm.getCategoryName();
      if (category == "") {
        return;
      }
      this.$refs.categoriesForm.showOverlay();
      const response = await api.categories.create(category);
      this.$emit("afterCreate", {
        categoryId: response.id,
      });
      this.$refs.modal.close();
      this.$refs.categoriesForm.hideOverlay();
      this.$refs.categoriesForm.setCategoryName("");
      this.$emit("create");
    },
  },
  components: {
    CategoriesForm,
  },
};
</script>
