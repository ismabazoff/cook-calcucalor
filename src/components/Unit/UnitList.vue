<template>
  <div class="unit-list">
    <ButtonCreate @click="openCreate">Создать единицу</ButtonCreate>
    <h3 class="unit-list__text" v-if="units.length > 0">Единицы измерения:</h3>
    <ul class="unit-list__list">
      <Item
        v-for="unit in units"
        :text="unit.name"
        :urlUpdate="`/unit/update/${unit.id}`"
        @removeClick="remove(unit.id)"
      />
    </ul>
    <Overlay :model-value="overlay" />
    <UnitCreate ref="unitCreate" @create="onCreate" />
  </div>
</template>

<script>
import api from "@/api.js";
import UnitCreate from "./UnitCreate.vue";
export default {
  data() {
    return {
      units: [],
      overlay: false,
      isHidden: true,
    };
  },
  created() {
    this.overlay = true;
    this.loadUnits();
    this.overlay = false;
  },
  methods: {
    openCreate() {
      this.$refs.unitCreate.open();
    },
    async onCreate() {
      this.loadUnits();
    },
    async remove(unitId) {
      await api.unit.delete(unitId);
      this.loadUnits();
    },
    async loadUnits() {
      const response = await api.unit.list();
      this.units = response.data;
    },
  },
  components: {
    UnitCreate,
  },
};
</script>

<style scoped>
.unit-list__list {
  display: flex;
  flex-direction: column;
}
.list__item {
  list-style-type: none;
  margin-bottom: 5px;
  width: 550px;
}
.list__name {
  display: inline-block;
  width: 90px;
}
.list__link {
  width: 160px;
  margin-right: 10px;
}
.unit-list__text {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
