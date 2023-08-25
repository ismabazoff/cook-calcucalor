<template>
  <div class="recipe-categorie-form">
    <h3 class="recipe-categorie-form__heading">{{ title }}</h3>
    <div class="recipe-categorie-form__body">
      <p class="recipe-categorie-form__text">Название:</p>
      <input
        class="recipe-categorie-form__input"
        type="text"
        v-model="recipeCategory"
        maxlength="10"
      />
      <div class="recipe-categorie-form__hint" :class="visible">
        * Максимум 10 символов
      </div>

      <div class="recipe-categorie-form__btn">
        <v-btn variant="flat" color="secondary" @click="cancel"> Отмена </v-btn>
        <v-btn variant="flat" color="purple-darken-1" @click="save">
          Сохранить
        </v-btn>
      </div>
      <Overlay :model-value="overlay" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {},
  },
  data() {
    return {
      overlay: false,
      recipeCategory: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
    getRecipeCategoryName() {
      return this.recipeCategory;
    },
    showOverlay() {
      this.overlay = true;
    },
    hideOverlay() {
      this.overlay = false;
    },
    setRecipeCategoryName(value) {
      this.recipeCategory = value;
    },
  },
  computed: {
    visible() {
      if (this.recipeCategory == undefined) {
        return true;
      } else {
        return {
          "recipe-categorie-form__input_visible":
            this.recipeCategory.length == 10,
        };
      }
    },
  },
};
</script>

<style scoped>
.recipe-categorie-form {
  padding-bottom: 10px;
  overflow-x: scroll;
  height: 365px;
}

.recipe-categorie-form__heading {
  text-align: center;
  border-bottom: 1px solid black;
}
.recipe-categorie-form__text {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.recipe-categorie-form__body {
  padding: 10px;
}
.recipe-categorie-form__item {
  display: flex;
  justify-content: center;
}
.recipe-categorie-form__select {
  outline: 1px solid black;
  height: 35px;
  width: 175px;
  margin-right: 7px;
  border-radius: 5px;
  text-align: center;
}
.recipe-categorie-form__input {
  display: flex;
  justify-content: center;
  width: 250px;
  outline: 1px solid black;
  margin: auto;
}
.recipe-categorie-form__hint {
  font-size: 10px;
  color: red;
  width: 250px;
  visibility: hidden;
  margin: auto;
  font-weight: 500;
}
.recipe-categorie-form__input_visible {
  visibility: visible;
}
.recipe-categorie-form__btn {
  display: flex;
  margin: auto;
  justify-content: space-around;
  margin-top: 20px;
  width: 270px;
}
</style>
