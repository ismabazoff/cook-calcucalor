<template>
  <div class="recipe-form">
    <h3 class="recipe-form__heading">{{ title }}</h3>
    <div class="recipe-form__body">
      <p class="recipe-form__text">Название:</p>
      <input
        class="recipe-form__input"
        type="text"
        v-model="recipe"
        maxlength="10"
      />
      <div class="recipe-form__hint" :class="visible">
        * Максимум 10 символов
      </div>
      <p class="recipe-form__text">Категория</p>
      <div class="recipe-form__item">
        <select class="recipe-form__select" v-model="category">
          <option :value="item.id" v-for="item in items">
            {{ item.name }}
          </option>
        </select>
        <v-btn variant="flat" color="purple-darken-1" @click="createCategory"
          >+</v-btn
        >
      </div>
      <p class="recipe-form__text">Количество человек</p>
      <input
        class="recipe-form__input"
        type="number"
        min="1"
        v-model="amount"
      />

      <p class="recipe-form__text" v-if="recipeProducts.length > 0">
        Продукты:
      </p>

      <div class="recipe-form__products" v-if="recipeProducts.length > 0">
        <div class="recipe-form__item" v-for="recipeProduct in recipeProducts">
          <v-container>
            <span>
              <select
                v-model="recipeProduct.productId"
                placeholder="Продукт"
                class="recipe-form__select"
              >
                <option :value="product.id" v-for="product in products">
                  {{ product.name }}
                </option>
              </select>
            </span>

            <span class="icon">
              <fa
                icon="pen-to-square"
                :class="{
                  disabled: !isEditEnabled(recipeProduct.productId),
                  enabled: isEditEnabled(recipeProduct.productId),
                }"
                @click="changeProduct(recipeProduct.productId)"
              />
            </span>
            <span class="icon">
              <fa
                icon="circle-plus"
                style="color: #5c7aad"
                @click="addProduct(recipeProduct)"
              />
            </span>
            <span>
              <input
                type="text"
                class="quantity mr-2"
                v-model="recipeProduct.amount"
                maxlength="3"
              />
            </span>

            <span class="recipe-form__unit mr-2">{{
              getUnitName(recipeProduct.productId)
            }}</span>
            <span class="icon__delete">
              <fa
                icon="trash-can"
                style="color: #c93126"
                @click="deleteProduct(recipeProduct)"
              />
            </span>
          </v-container>
        </div>
      </div>
      <div class="recipe-form__btn">
        <v-btn variant="flat" color="purple-darken-1" @click="addRecipeProduct"
          >Добавить продукт</v-btn
        >
      </div>
      <p class="recipe-form__text">Способ приготовления:</p>
      <div class="recipe-form__item">
        <textarea
          class="recipe-form__textarea"
          name=""
          id=""
          cols="30"
          rows="5"
          v-model="cookingMethod"
        >
        </textarea>
      </div>

      <div class="recipe-form__btn">
        <v-btn variant="flat" color="secondary" @click="cancel"> Отмена </v-btn>
        <v-btn variant="flat" color="purple-darken-1" @click="save">
          Сохранить
        </v-btn>
      </div>
      <Overlay :model-value="overlay" />
      <ProductsCreate ref="productsCreate" @afterCreate="afterProductsCreate" />
      <Modal ref="modal">
        <ProductsUpdate
          ref="productsUpdate"
          :afterSave="() => afterProductSave()"
          :cancel="() => cancelUpdateProduct()"
          @afterUnitCreate="afterUnitCreate"
        />
      </Modal>
      <RecipeCategoryCreate
        ref="recipeCategoryCreate"
        @afterCreate="afterRecipeCategoryCreate"
      />
    </div>
  </div>
</template>

<script>
import ProductsCreate from "@/components/Products/ProductsCreate.vue";
import ProductsUpdate from "@/components/Products/ProductsUpdate.vue";
import RecipeCategoryCreate from "@/components/RecipeCategories/RecipeCategoriesCreate.vue";
import api from "@/api.js";
export default {
  props: {
    title: {},
  },
  data() {
    return {
      overlay: false,
      category: "",
      recipe: "",
      items: null,
      amount: null,
      // Продукт рецепта в котором была нажама кнопка + для создания продукта
      recipeProduct: null,
      cookingMethod: "",
      recipeProducts: [],
      products: [],
      units: [],
    };
  },
  async created() {
    this.loadUnits();
    this.loadRecipeCategories();
    this.loadProducts();
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
    getRecipesName() {
      return this.recipe;
    },
    showOverlay() {
      this.overlay = true;
    },
    hideOverlay() {
      this.overlay = false;
    },
    getSelectName() {
      return this.category;
    },
    setRecipesName(value) {
      this.recipe = value;
    },
    setSelectName(value) {
      this.category = value;
    },
    getRecipesCategory() {
      return this.category;
    },
    setRecipesCategory(value) {
      this.category = value;
    },
    getAmountPeople() {
      return this.amount;
    },
    getCookingMethod() {
      return this.cookingMethod;
    },
    getRecipeProducts() {
      return this.recipeProducts;
    },
    setRecipeProducts(value) {
      this.recipeProducts = value;
    },
    setCookingMethod(value) {
      this.cookingMethod = value;
    },
    setAmountPeople(value) {
      this.amount = value;
    },
    createCategory() {
      this.$refs.recipeCategoryCreate.open();
    },
    addRecipeProduct() {
      this.recipeProducts.push({});
    },
    addProduct(recipeProduct) {
      this.$refs.productsCreate.open();
      this.recipeProduct = recipeProduct;
    },
    getUnitName(productId) {
      try {
        const product = this.products.find(
          (product) => productId == product.id
        );
        const unitId = product.unit_id;
        const unit = this.units.find((unit) => unitId == unit.id);
        return unit.name;
      } catch (error) {
        return "";
      }
    },
    deleteProduct(recipeProduct) {
      let recipeProductIndex = this.recipeProducts.indexOf(recipeProduct);
      this.recipeProducts.splice(recipeProductIndex, 1);
    },
    changeProduct(productId) {
      if (this.isEditEnabled(productId)) {
        this.$refs.modal.open();
        this.$refs.productsUpdate.setProductId(productId);
        this.$refs.productsUpdate.loadProduct(productId);
      }
    },
    async cancelUpdateProduct() {
      this.$refs.modal.close();
    },
    async afterProductSave() {
      this.$refs.modal.close();
      this.loadProducts();
    },
    async afterRecipeCategoryCreate(params) {
      this.loadRecipeCategories();
      this.category = params.recipeCategoryId;
    },
    async afterProductsCreate(params) {
      this.loadProducts();
      this.recipeProduct.productId = params.productId;
    },
    async afterUnitCreate() {
      this.loadUnits();
    },
    async loadProducts() {
      const response = await api.products.list();
      this.products = response.data;
    },
    async loadUnits() {
      const response = await api.unit.list();
      this.units = response.data;
    },

    async loadRecipeCategories() {
      const response = await api.recipeCategories.list();
      this.items = response.data;
    },

    isEditEnabled(productId) {
      return productId != null;
    },
  },
  computed: {
    visible() {
      if (this.recipe == undefined) {
        return true;
      } else {
        return { "recipe-form__input_visible": this.recipe.length == 10 };
      }
    },
  },
  components: {
    RecipeCategoryCreate,
    ProductsCreate,
    ProductsUpdate,
  },
};
</script>

<style scoped>
.disabled {
  color: #c93126;
}

.enabled {
  color: #5c7aad;
}

.v-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.icon {
  margin-left: 10px;
  /* margin-right: 2px; */
  cursor: pointer;
}
.icon__delete {
  cursor: pointer;
}

.recipe-form {
  padding-bottom: 10px;
  overflow-x: scroll;
  height: 365px;
}
.recipe-form__heading {
  text-align: center;
  border-bottom: 1px solid black;
}
.recipe-form__text {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.recipe-form__body {
  padding: 10px;
}
.recipe-form__item {
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
}
.recipe-form__item:last-child {
  margin-bottom: 0;
}

.recipe-form__unit {
  display: inline-block;
  width: 20px;
}

.recipe-form__select {
  outline: 1px solid black;
  height: 35px;
  width: 175px;
  margin-right: 7px;
  border-radius: 5px;
  text-align: center;
  background-color: white;
}
.recipe-form__quantity {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.recipe-form__products .recipe-form__select {
  outline: 1px solid black;
  font-size: 15px;
  height: 21px;
  width: 80px;
  margin-right: 4px;
  border-radius: 5px;
  text-align: center;
  background-color: white;
}

.quantity {
  width: 30px;
  height: 21px;
  border-radius: 5px;
  outline: 1px solid black;
  background-color: white;
  text-align: center;
  margin-left: 10px;
}
.recipe-form__input {
  display: flex;
  justify-content: center;
  width: 250px;
  outline: 1px solid black;
  margin: auto;
}
.recipe-form__products {
  margin: auto;
  outline: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgb(231, 230, 230);
}
.recipe-form__hint {
  font-size: 10px;
  color: red;
  width: 250px;
  visibility: hidden;
  margin: auto;
  font-weight: 500;
}
.recipe-form__input_visible {
  visibility: visible;
}
.recipe-form__textarea {
  outline: 1px solid black;
  resize: none;
}
.recipe-form__btn {
  display: flex;
  margin: auto;
  justify-content: space-around;
  margin-top: 20px;
  width: 270px;
}
</style>
