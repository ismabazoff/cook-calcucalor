<template>
  <div class="unit-form">
    <h3 class="unit-form__heading">{{ title }}</h3>
    <div class="unit-form__body">
      <p class="unit-form__text">Название:</p>
      <input
        class="unit-form__input"
        type="text"
        v-model="unitName"
        maxlength="10"
      />
      <div class="unit-form__hint" :class="visible">* Максимум 10 символов</div>
      <div class="unit-form__btn">
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
      unitName: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
    getUnitName() {
      return this.unitName;
    },
    showOverlay() {
      this.overlay = true;
    },
    hideOverlay() {
      this.overlay = false;
    },
    setUnitName(value) {
      this.unitName = value;
    },
  },
  computed: {
    visible() {
      if (this.unitName == undefined) {
        return true;
      } else {
        return { "unit-form__input_visible": this.unitName.length == 10 };
      }
    },
  },
};
</script>

<style scoped>
.unit-form {
  padding-bottom: 10px;
  overflow-x: scroll;
  height: 365px;
}
.unit-form__heading {
  text-align: center;
  border-bottom: 1px solid black;
}
.unit-form__text {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.unit-form__body {
  padding: 10px;
}
.unit-form__item {
  display: flex;
  justify-content: center;
}
.unit-form__select {
  outline: 1px solid black;
  height: 35px;
  width: 175px;
  margin-right: 7px;
  border-radius: 5px;
  text-align: center;
}
.unit-form__input {
  display: flex;
  justify-content: center;
  width: 250px;
  outline: 1px solid black;
  margin: auto;
}
.unit-form__hint {
  font-size: 10px;
  color: red;
  width: 250px;
  visibility: hidden;
  margin: auto;
  font-weight: 500;
}
.unit-form__input_visible {
  visibility: visible;
}
.unit-form__btn {
  display: flex;
  margin: auto;
  justify-content: space-around;
  margin-top: 20px;
  width: 270px;
}
</style>
