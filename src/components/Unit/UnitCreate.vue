<template>
  <Modal ref="modal">
    <UnitForm
      ref="unitForm"
      @cancel="cancel"
      @save="save"
      title="Создание единиц"
    />
  </Modal>
</template>

<script>
import api from "@/api.js";
import UnitForm from "./UnitForm.vue";
export default {
  methods: {
    open() {
      this.$refs.modal.open();
    },
    cancel() {
      this.$refs.modal.close();
      this.$refs.unitForm.setUnitName("");
    },
    async save() {
      const unitName = this.$refs.unitForm.getUnitName();
      if (unitName == "") {
        return;
      }
      this.$refs.unitForm.showOverlay();

      const response = await api.unit.create(unitName);
      this.$emit("afterCreate", {
        unitId: response.id,
      });
      this.$refs.modal.close();
      this.$refs.unitForm.hideOverlay();
      this.$refs.unitForm.setUnitName("");
      this.$emit("create");
    },
  },
  components: {
    UnitForm,
  },
};
</script>
