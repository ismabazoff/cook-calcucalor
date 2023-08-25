<template>
  <Modal ref="modal">
    <ProductsForm
      ref="productsForm"
      @cancel="cancel"
      @save="save"
      title="Создание продукта"
    />
  </Modal>
</template>

<script>
import api from "@/api.js";
import ProductsForm from "./ProductsForm.vue";
export default {
  methods: {
    open() {
      this.$refs.modal.open();
    },
    cancel() {
      this.$refs.modal.close();
      this.$refs.productsForm.setProductName("");
    },
    async save() {
      const product = this.$refs.productsForm.getProductName();
      const categoryId = this.$refs.productsForm.getSelectName();
      const unitId = this.$refs.productsForm.getUnitId();
      if (product == "") {
        return;
      }
      this.$refs.productsForm.showOverlay();
      const response = await api.products.create(product, categoryId, unitId);
      this.$refs.modal.close();
      this.$refs.productsForm.hideOverlay();
      this.$refs.productsForm.setSelectName("");
      this.$refs.productsForm.setUnitId("");
      this.$refs.productsForm.setProductName("");
      this.$emit("afterCreate", {
        productId: response.id,
      });
    },
  },
  components: {
    ProductsForm,
  },
};
</script>
