<template>
  <div class="categories-form">
    <h3 class="categories-form__heading">{{ title }}</h3>
    <div class="categories-form__body">
      <p class="categories-form__text">Название категории:</p>
      <input
        class="categories-form__input"
        type="text"
        v-model="category"
        maxlength="10"
      />
      <div class="categories-form__hint" :class="visible">
        * Максимум 10 символов
      </div>
      <div class="categories-form__btn">
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
      category: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
    getCategoryName() {
      return this.category;
    },
    showOverlay() {
      this.overlay = true;
    },
    hideOverlay() {
      this.overlay = false;
    },
    setCategoryName(value) {
      this.category = value;
    },
  },
  computed: {
    visible() {
      if (this.category == undefined) {
        return true;
      } else {
        return { "categories-form__input_visible": this.category.length == 10 };
      }
    },
  },
};
</script>

<style scoped>
.categories-form {
  padding-bottom: 10px;
  overflow-x: scroll;
  height: 365px;
}
.categories-form__heading {
  text-align: center;
  border-bottom: 1px solid black;
}
.categories-form__text {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.categories-form__body {
  padding: 10px;
}
.categories-form__item {
  display: flex;
  justify-content: center;
}
.categories-form__select {
  outline: 1px solid black;
  height: 35px;
  width: 175px;
  margin-right: 7px;
  border-radius: 5px;
  text-align: center;
}
.categories-form__input {
  display: flex;
  justify-content: center;
  width: 250px;
  outline: 1px solid black;
  margin: auto;
}
.categories-form__hint {
  font-size: 10px;
  color: red;
  width: 250px;
  visibility: hidden;
  margin: auto;
  font-weight: 500;
}
.categories-form__input_visible {
  visibility: visible;
}
.categories-form__btn {
  display: flex;
  margin: auto;
  justify-content: space-around;
  margin-top: 20px;
  width: 270px;
}
</style>
