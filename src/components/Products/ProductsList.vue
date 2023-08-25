<template>
  <div class="products-list">
    <ButtonCreate @click="openCreate"> Создать продукт </ButtonCreate>

    <h3 class="products-list__text" v-if="products.length > 0">Продукты:</h3>
    <ul class="products-list__list">
      <template v-for="categorie in categories">
        <li
          class="products-list__item"
          v-if="getProductsForCategory(categorie).length > 0"
        >
          <h4>
            {{ categorie.name }}
          </h4>
          <ul class="list">
            <Item
              v-for="product in getProductsForCategory(categorie)"
              :text="product.name"
              :urlUpdate="`/products/update/${product.id}`"
              @removeClick="remove(product.id)"
            />
          </ul>
        </li>
      </template>

      <li class="products-list__item">
        <h4 v-if="productsWithoutCategory.length > 0">
          Продукты без категории
        </h4>
        <ul class="list">
          <Item
            v-for="product in productsWithoutCategory"
            :text="product.name"
            :urlUpdate="`/products/update/${product.id}`"
            @removeClick="remove(product.id)"
          />
        </ul>
      </li>
    </ul>
    <Overlay :model-value="overlay" />
    <ProductsCreate ref="productsCreate" @afterCreate="onCreate" />
  </div>
</template>

<script>
import api from "@/api.js";
import ProductsCreate from "./ProductsCreate.vue";
export default {
  data() {
    return {
      products: [],
      categories: [],
      overlay: false,
    };
  },
  created() {
    this.overlay = true;
    this.loadCategories();
    this.loadProducts();
    this.overlay = false;
  },
  methods: {
    openCreate() {
      this.$refs.productsCreate.open();
    },
    async onCreate() {
      this.loadCategories();
      this.loadProducts();
    },
    async remove(productId) {
      await api.products.delete(productId);
      this.loadProducts();
    },
    async loadProducts() {
      const response = await api.products.list();
      this.products = response.data;
    },
    async loadCategories() {
      const response = await api.categories.list();
      this.categories = response.data;
    },
    getProductsForCategory(categorie) {
      return this.products.filter(
        (product) => categorie.id == product.category_id
      );
    },
  },
  computed: {
    productsWithoutCategory() {
      return this.products.filter((product) => {
        if (product.category_id == null) {
          return true;
        } else if (
          !this.categories.find(
            (category) => category.id == product.category_id
          )
        ) {
          return true;
        }
      });
    },
  },
  components: {
    ProductsCreate,
  },
};
</script>

<style scoped>
.products-list__list {
  display: flex;
  flex-direction: column;
}
.products-list__item {
  list-style-type: none;
  margin-bottom: 5px;
  width: 550px;
}
.products-list__text {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
