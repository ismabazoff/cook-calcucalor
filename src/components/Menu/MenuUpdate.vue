<template>
  <Modal ref="modal"
    ><MenuForm
      ref="menuForm"
      @save="save"
      @cancel="cancel"
      title="Редактирование меню"
  /></Modal>
</template>

<script>
import api from "@/api.js";
import MenuForm from "./MenuForm.vue";
export default {
  async mounted() {
    this.$refs.modal.open();
    this.$refs.menuForm.showOverlay();
    const response = await api.menu.read(this.$route.params.menuId);
    this.$refs.menuForm.setMenuName(response.name);
    this.$refs.menuForm.setAmountPeople(response.numberPersons);
    this.$refs.menuForm.setDishesName(response.dishes);
    this.$refs.menuForm.hideOverlay();
  },
  methods: {
    async save() {
      this.$refs.menuForm.showOverlay();
      let formData = new FormData();
      formData.append("name", this.$refs.menuForm.getMenuName());
      formData.append("numberPersons", this.$refs.menuForm.getAmountPeople());
      formData.append(
        "dishes",
        JSON.stringify(this.$refs.menuForm.getDishesName())
      );

      await api.menu.update(this.$route.params.menuId, formData);
      this.$router.go(-1);
      this.$refs.menuForm.hideOverlay();
      // 1-нажимаем на копку сохранить
      // 2-Сохраняем на сервер значение инпута
      // 3-Переходим на страницу назад
      // При клике на кнопку сохранить,сохраняем значение инпута в списке
    },
    cancel() {
      this.$refs.menuForm.showOverlay();
      this.$refs.menuForm.hideOverlay();
      this.$router.go(-1);
    },
  },
  components: {
    MenuForm,
  },
};
</script>
