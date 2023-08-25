<template>
  <Modal ref="modal"
    ><UnitForm
      ref="unitForm"
      @save="save"
      @cancel="cancelUpdateUnit"
      title="Редактирование единиц"
  /></Modal>
</template>

<script>
import api from "@/api.js";
import UnitForm from "./UnitForm.vue";
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
  async mounted() {
    this.$refs.modal.open();
    if (this.$route.params.unitId) {
      this.unitId = this.$route.params.unitId;
      this.loadUnit(this.$route.params.unitId);
    }
  },
  data() {
    return {
      unitId: null,
    };
  },
  methods: {
    open() {},
    async save() {
      this.$refs.unitForm.showOverlay();

      let formData = new FormData();
      formData.append("name", this.$refs.unitForm.getUnitName());
      await api.unit.update(this.unitId, formData);

      this.$refs.unitForm.hideOverlay();
      this.afterSave();

      // 1-нажимаем на копку сохранить
      // 2-Сохраняем на сервер значение инпута
      // 3-Переходим на страницу назад
      // При клике на кнопку сохранить,сохраняем значение инпута в списке
    },
    cancelUpdateUnit() {
      this.cancel();
    },
    async loadUnit(unitId) {
      this.$refs.unitForm.showOverlay();
      const response = await api.unit.read(unitId);
      this.$refs.unitForm.setUnitName(response.name);
      this.$refs.unitForm.hideOverlay();
    },
    setUnitId(unitId) {
      this.unitId = unitId;
    },
  },
  components: {
    UnitForm,
  },
};
</script>
