<template>
  <div class="menu">
    <ButtonCreate @click="openCreate">Создать меню</ButtonCreate>
    <h3 class="menu-list__text" v-if="menus.length > 0">Меню:</h3>
    <ul class="menu-list__list">
      <template v-for="menu in menus">
        <li class="menu-list__item">
          <table class="menu-list__table">
            <caption>
              {{
                menu.name
              }}
            </caption>

            <tr>
              <th><h4>Рецепт</h4></th>
              <th><h4>На 1 человека:</h4></th>
              <th><h4>Общий вес</h4></th>
            </tr>
            <tr v-for="dish in menu.dishes">
              <td>{{ getRecipeName(dish) }}</td>
              <td>{{ dish.amount }} {{ getUnitName(dish) }}</td>
              <td>{{ dish.amount * menu.numberPersons }}</td>
            </tr>
            <tr class="menu-list__total">
              <td>Итого:</td>
              <td>
                {{ amountUnit(menu) }}
              </td>
              <td>{{ amountTotal(menu) || "" }}</td>
            </tr>
          </table>
          <span class="menu-list__buttons">
            <RouterLink class="list__link" :to="`/menu/update/${menu.id}`">
              <v-btn density="compact" variant="flat" color="purple-darken-1">
                Редактировать
              </v-btn>
            </RouterLink>
            <v-btn
              density="compact"
              variant="flat"
              color="red"
              @click="remove(menu.id)"
            >
              Удалить
            </v-btn>
          </span>
        </li>
      </template>
    </ul>
    <Overlay :model-value="overlay" />
    <MenuCreate ref="menuCreate" @afterCreate="onCreate"></MenuCreate>
  </div>
</template>

<script>
import api from "@/api";
import MenuCreate from "./MenuCreate.vue";
export default {
  data() {
    return {
      overlay: false,
      menus: [],
      recipes: [],
      units: [],
    };
  },
  created() {
    this.overlay = true;
    this.fetchList();
    this.overlay = false;
  },
  methods: {
    openCreate() {
      this.$refs.menuCreate.open();
    },
    async onCreate() {
      this.fetchList();
    },
    async remove(menuId) {
      await api.menu.delete(menuId);
      this.fetchList();
    },
    async fetchList() {
      this.loadMenu();
      this.loadRecipes();
      this.loadUnits();
    },
    async loadMenu() {
      const response = await api.menu.list();
      this.menus = response.data;
    },
    async loadRecipes() {
      const response = await api.recipes.list();
      this.recipes = response.data;
    },
    async loadUnits() {
      const response = await api.unit.list();
      this.units = response.data;
    },
    getRecipeName(dish) {
      let recipe = this.recipes.find((recipe) => recipe.id == dish.recipeId);
      return recipe && recipe.name;
    },
    getUnitName(dish) {
      let unit = this.units.find((unit) => unit.id == dish.unitId);
      return unit && unit.name;
    },
    amountUnit(menu) {
      return menu.dishes
        .filter((dish) => dish.amount)
        .reduce((result, dish) => (result += parseFloat(dish.amount)), 0);
    },
    amountTotal(menu) {
      return this.amountUnit(menu) * menu.numberPersons;
    },
  },
  components: {
    MenuCreate,
  },
};
</script>

<style lang="scss">
.menu-list__table {
  outline: 1px solid black;
  width: 500px;
  text-align: center;
  margin-bottom: 10px;
  th {
    background: rgb(136, 71, 210);
    color: white;
    outline: 1px solid black;
  }
  td {
    outline: 1px solid black;
  }
}
.menu-list__text {
  margin-top: 10px;
  margin-bottom: 10px;
}
.menu-list__item {
  list-style-type: none;
  margin-bottom: 40px;
}
.menu-list__buttons {
  width: 285px;
  display: flex;
  justify-content: space-between;
}
.menu-list__total {
  background: rgb(252, 242, 153);
}
</style>
