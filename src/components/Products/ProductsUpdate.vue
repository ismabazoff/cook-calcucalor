<template>
  <Modal ref="modal"
    ><ProductsForm
      ref="productsForm"
      @save="save"
      @cancel="cancelUpdateProduct"
      title="Редактирование продукта"
      @afterUnitCreate="afterUnitCreate"
  /></Modal>
</template>

<script>
import api from "@/api.js";
import ProductsForm from "./ProductsForm.vue";
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
  data() {
    return {
      productId: null,
    };
  },
  async mounted() {
    this.$refs.modal.open();
    if (this.$route.params.productId) {
      this.productId = this.$route.params.productId;
      this.loadProduct(this.productId);
    }
  },
  methods: {
    async save() {
      this.$refs.productsForm.showOverlay();
      let formData = new FormData();
      formData.append("name", this.$refs.productsForm.getProductName());
      formData.append("category_id", this.$refs.productsForm.getSelectName());
      formData.append("unit_id", this.$refs.productsForm.getUnitId());
      await api.products.update(this.productId, formData);
      this.$refs.productsForm.hideOverlay();
      this.afterSave();
      // 1-нажимаем на копку сохранить
      // 2-Сохраняем на сервер значение инпута
      // 3-Переходим на страницу назад
      // При клике на кнопку сохранить,сохраняем значение инпута в списке
    },
    cancelUpdateProduct() {
      this.cancel();
    },
    async loadProduct(productId) {
      this.$refs.productsForm.showOverlay();
      const response = await api.products.read(productId);
      this.$refs.productsForm.setProductName(response.name);
      this.$refs.productsForm.setSelectName(response.category_id);
      this.$refs.productsForm.setUnitId(response.unit_id);
      this.$refs.productsForm.hideOverlay();
    },
    afterUnitCreate() {
      this.$emit("afterUnitCreate");
    },
    setProductId(productId) {
      this.productId = productId;
    },
  },
  components: {
    ProductsForm,
  },
};
</script>
