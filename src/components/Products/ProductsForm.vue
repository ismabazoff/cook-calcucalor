<template>
  <div class="products-form">
    <h3 class="products-form__heading">{{ title }}</h3>
    <div class="products-form__body">
      <p class="products-form__text">Название продукта:</p>
      <input
        class="products-form__input"
        type="text"
        v-model="product"
        maxlength="10"
      />
      <div class="products-form__hint" :class="visible">
        * Максимум 10 символов
      </div>
      <p class="products-form__text">Категория по умолчанию:</p>
      <div class="products-form__item">
        <select class="products-form__select" v-model="category">
          <option :value="category.id" v-for="category in categories">
            {{ category.name }}
          </option>
        </select>
        <v-btn variant="flat" color="purple-darken-1" @click="createCategory"
          >+</v-btn
        >
      </div>
      <p class="products-form__text">Единицы по умолчанию:</p>
      <div class="products-form__item">
        <select class="products-form__select" v-model="unitId">
          <option :value="unit.id" v-for="unit in units">
            {{ unit.name }}
          </option>
        </select>
        <v-btn variant="flat" color="purple-darken-1" @click="createUnit"
          >+</v-btn
        >
      </div>
      <div class="products-form__btn">
        <v-btn variant="flat" color="secondary" @click="cancel"> Отмена </v-btn>
        <v-btn variant="flat" color="purple-darken-1" @click="save">
          Сохранить
        </v-btn>
      </div>
      <Overlay :model-value="overlay" />
      <CategoryCreate ref="categoryCreate" @afterCreate="afterCategoryCreate" />
      <UnitCreate ref="unitCreate" @afterCreate="afterUnitCreate" />
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import CategoryCreate from "@/components/Categories/CategoriesCreate.vue";
import UnitCreate from "@/components/Unit/UnitCreate.vue";
export default {
  props: {
    title: {},
  },
  data() {
    return {
      overlay: false,
      product: "",
      categories: null,
      category: "",
      unitId: "",
      units: null,
    };
  },
  async created() {
    this.fetchList();
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
    getProductName() {
      return this.product;
    },
    showOverlay() {
      this.overlay = true;
    },
    hideOverlay() {
      this.overlay = false;
    },
    setProductName(value) {
      this.product = value;
    },
    getSelectName() {
      return this.category;
    },
    getUnitId() {
      return this.unitId;
    },
    setUnitId(value) {
      this.unitId = value;
    },
    setSelectName(value) {
      this.category = value;
    },
    createCategory() {
      this.$refs.categoryCreate.open();
    },
    createUnit() {
      this.$refs.unitCreate.open();
    },
    async fetchList() {
      this.loadCategories();
      this.loadUnits();
    },
    async loadCategories() {
      const response = await api.categories.list();
      this.categories = response.data;
    },
    async loadUnits() {
      const response = await api.unit.list();
      this.units = response.data;
    },
    async afterCategoryCreate(params) {
      await this.fetchList();
      this.category = params.categoryId;
    },
    async afterUnitCreate(params) {
      await this.fetchList();
      this.unitId = params.unitId;
      this.$emit("afterUnitCreate");
    },
  },
  computed: {
    visible() {
      if (this.product == undefined) {
        return true;
      } else {
        return { "products-form__input_visible": this.product.length == 10 };
      }
    },
  },
  components: {
    CategoryCreate,
    UnitCreate,
  },
};
</script>

<style scoped>
.products-form {
  padding-bottom: 10px;
  overflow-x: scroll;
  height: 365px;
}

.products-form__heading {
  text-align: center;
  border-bottom: 1px solid black;
}
.products-form__text {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.products-form__body {
  padding: 10px;
}
.products-form__item {
  display: flex;
  justify-content: center;
}
.products-form__select {
  outline: 1px solid black;
  height: 35px;
  width: 175px;
  margin-right: 7px;
  border-radius: 5px;
  text-align: center;
}
.products-form__input {
  display: flex;
  justify-content: center;
  width: 250px;
  outline: 1px solid black;
  margin: auto;
}
.products-form__hint {
  font-size: 10px;
  color: red;
  width: 250px;
  visibility: hidden;
  margin: auto;
  font-weight: 500;
}
.products-form__input_visible {
  visibility: visible;
}
.products-form__btn {
  display: flex;
  margin: auto;
  justify-content: space-around;
  margin-top: 20px;
  width: 270px;
}
</style>
