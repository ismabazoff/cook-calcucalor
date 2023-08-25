<template>
  <Modal ref="modal">
    <MenuForm
      ref="menuForm"
      @cancel="cancel"
      @save="save"
      title="Редактирование меню"
    />
  </Modal>
</template>

<script>
import api from "@/api";
import MenuForm from "./MenuForm.vue";
export default {
  methods: {
    open() {
      this.$refs.modal.open();
    },
    cancel() {
      this.$refs.modal.close();
      this.$refs.menuForm.setMenuName("");
    },
    async save() {
      const menuName = this.$refs.menuForm.getMenuName();
      const amountPeople = this.$refs.menuForm.getAmountPeople();
      const dishesName = this.$refs.menuForm.getDishesName();
      if (menuName == "") {
        return;
      }
      this.$refs.menuForm.showOverlay();
      const response = await api.menu.create(
        menuName,
        amountPeople,
        dishesName
      );
      this.$emit("afterCreate", {
        menuId: response.id,
      });
      this.$refs.modal.close();
      this.$refs.menuForm.hideOverlay();
      this.$refs.menuForm.setMenuName("");
      this.$refs.menuForm.setAmountPeople("");
      this.$refs.menuForm.setDishesName([]);
      this.$emit("create");
    },
  },
  components: {
    MenuForm,
  },
};
</script>
