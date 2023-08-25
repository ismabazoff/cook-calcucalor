<template>
  <div class="menu-form">
    <h3 class="menu-form__title">{{ title }}</h3>
    <div class="menu-form__body">
      <p class="menu-form__text">Название:</p>
      <input
        class="menu-form__input"
        type="text"
        placeholder="Введите текст"
        maxlength="10"
        v-model="menu"
      />
      <div class="menu-form__hint" :class="visible">* Максимум 10 символов</div>
      <div>
        <p class="menu-form__text">Количество человек:</p>
        <input type="number" class="menu-form__input" v-model="amountPeople" />
      </div>

      <Transition>
        <v-table class="menu-form__table" v-if="dishes.length > 0">
          <thead>
            <tr>
              <th class="menu-form__heading">
                <h4 class="menu-form__cell">Рецепт</h4>
              </th>
              <th class="menu-form__heading" colspan="2">
                <h4 class="menu-form__cell">На 1 человека:</h4>
              </th>
              <th class="menu-form__heading">
                <h4 class="menu-form__cell">Общий вес</h4>
              </th>
              <th class="menu-form__heading"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="dish in dishes">
              <td>
                <v-container>
                  <span
                    ><select class="menu-form__select" v-model="dish.recipeId">
                      <option :value="recipe.id" v-for="recipe in recipies">
                        {{ recipe.name }}
                      </option>
                    </select>
                  </span>
                  <span class="icon">
                    <fa
                      title="Редактировать рецепт"
                      icon="pen-to-square"
                      :class="{
                        'menu-form__disabled': !isEditEnabled(dish.recipeId),
                        'menu-form__enabled': isEditEnabled(dish.recipeId),
                      }"
                      @click="changeRecipe(dish.recipeId)"
                    />
                  </span>
                  <span class="icon">
                    <fa
                      title="Добавить рецепт"
                      icon="circle-plus"
                      style="color: #5c7aad"
                      @click="addRecipe(dish)"
                    />
                  </span>
                </v-container>
              </td>
              <td>
                <span>
                  <input
                    type="text"
                    v-model="dish.amount"
                    class="menu-form__dish-amount"
                  />
                </span>
              </td>
              <td>
                <v-container>
                  <span
                    ><select class="menu-form__select" v-model="dish.unitId">
                      <option :value="unit.id" v-for="unit in units">
                        {{ unit.name }}
                      </option>
                    </select>
                  </span>
                  <span class="icon">
                    <fa
                      title="Редактировать единицу измерения"
                      icon="pen-to-square"
                      :class="{
                        'menu-form__disabled': !isEditEnabled(dish.unitId),
                        'menu-form__enabled': isEditEnabled(dish.unitId),
                      }"
                      @click="changeUnit(dish.unitId)"
                    />
                  </span>
                  <span class="icon">
                    <fa
                      title="Добавить единицу измерения"
                      icon="circle-plus"
                      style="color: #5c7aad"
                      @click="addUnit(dish)"
                    />
                  </span>
                </v-container>
              </td>
              <td>
                <span>
                  {{ dish.amount * amountPeople || 0 }}
                </span>
              </td>
              <td>
                <span class="icon__delete">
                  <fa
                    title="Удалить блюдо"
                    icon="trash-can"
                    style="color: #c93126"
                    @click="deleteDish(dish)"
                  />
                </span>
              </td>
            </tr>
            <tr>
              <td>Итого:</td>
              <td>{{ amountUnit }}</td>
              <td></td>
              <td>{{ amountTotal }}</td>
            </tr>
          </tbody>
        </v-table>
      </Transition>

      <div class="menu-form__btn">
        <v-btn variant="flat" color="secondary" @click="addDish"
          >Добавить блюдо</v-btn
        >
        <v-btn variant="flat" color="purple-darken-1" @click="save"
          >Сохранить</v-btn
        >
        <v-btn variant="flat" color="purple-darken-4" @click="cancel"
          >Отменить</v-btn
        >
      </div>
      <Overlay :model-value="overlay" />

      <RecipesCreate ref="recipesCreate" @afterCreate="afterRecipesCreate" />

      <Modal ref="modalRecipe">
        <RecipesUpdate
          ref="recipesUpdate"
          :afterSave="() => afterRecipeSave()"
          :cancel="() => cancelUpdateRecipe()"
        />
      </Modal>

      <UnitCreate ref="unitCreate" @afterCreate="afterUnitCreate" />

      <Modal ref="modalUnit">
        <UnitUpdate
          ref="unitUpdate"
          :afterSave="() => afterUnitSave()"
          :cancel="() => cancelUpdateUnit()"
        />
      </Modal>
    </div>
  </div>
</template>
<script>
import RecipesCreate from "@/components/Recipes/RecipesCreate.vue";
import RecipesUpdate from "@/components/Recipes/RecipesUpdate.vue";
import UnitCreate from "@/components/Unit/UnitCreate.vue";
import UnitUpdate from "@/components/Unit/UnitUpdate.vue";
import api from "@/api.js";
export default {
  props: {
    title: {},
  },
  data() {
    return {
      menu: "",
      amountPeople: null,
      overlay: false,
      dishes: [],
      recipies: [],
      units: [],
      result: 0,
    };
  },
  async created() {
    this.loadRecipes();
    this.loadUnits();
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
    getMenuName() {
      return this.menu;
    },
    setMenuName(value) {
      this.menu = value;
    },
    getAmountPeople() {
      return this.amountPeople;
    },
    setAmountPeople(value) {
      this.amountPeople = value;
    },
    getDishesName() {
      return this.dishes;
    },
    setDishesName(value) {
      this.dishes = value;
    },
    showOverlay() {
      this.overlay = true;
    },
    hideOverlay() {
      this.overlay = false;
    },
    addDish() {
      this.dishes.push({});
    },
    deleteDish(item) {
      let index = this.dishes.indexOf(item);
      this.dishes.splice(index, 1);
    },
    changeRecipe(recipeId) {
      if (this.isEditEnabled(recipeId)) {
        this.$refs.modalRecipe.open();
        this.$refs.recipesUpdate.setRecipeId(recipeId);
        this.$refs.recipesUpdate.loadRecipe(recipeId);
      }
    },
    addRecipe(dish) {
      this.$refs.recipesCreate.open();
      this.dish = dish;
    },
    changeUnit(unitId) {
      if (this.isEditEnabled(unitId)) {
        this.$refs.modalUnit.open();
        this.$refs.unitUpdate.setUnitId(unitId);
        this.$refs.unitUpdate.loadUnit(unitId);
      }
    },
    addUnit(dish) {
      this.$refs.unitCreate.open();
      this.dish = dish;
    },
    async afterRecipesCreate(params) {
      this.loadRecipes();
      this.dish.recipeId = params.recipeId;
    },
    async afterUnitCreate(params) {
      this.loadUnits();
      this.dish.unitId = params.unitId;
    },
    async afterRecipeSave() {
      this.$refs.modalRecipe.close();
      this.loadRecipes();
    },
    async cancelUpdateRecipe() {
      this.$refs.modalRecipe.close();
    },
    async afterUnitSave() {
      this.$refs.modalUnit.close();
      this.loadUnits();
    },
    async cancelUpdateUnit() {
      this.$refs.modalUnit.close();
    },
    async loadRecipes() {
      const response = await api.recipes.list();
      this.recipies = response.data;
    },
    async loadUnits() {
      const response = await api.unit.list();
      this.units = response.data;
    },
    isEditEnabled(recipeId) {
      return recipeId != null;
    },
  },
  computed: {
    amountUnit() {
      return this.dishes
        .filter((dish) => dish.amount)
        .reduce((result, dish) => (result += parseFloat(dish.amount)), 0);
    },
    amountTotal() {
      return this.amountUnit * this.amountPeople;
    },
    visible() {
      if (this.menu == undefined) {
        return true;
      } else {
        return { "menu-form__input_visible": this.menu.length == 10 };
      }
    },
  },
  components: {
    RecipesCreate,
    RecipesUpdate,
    UnitCreate,
    UnitUpdate,
  },
};
</script>

<style>
.menu-form__disabled {
  color: #c93126;
}

.menu-form__enabled {
  color: #5c7aad;
}

.v-container {
  display: flex;
  align-items: center;
  padding: 0;
}

.icon {
  margin-left: 10px;
  margin-right: 2px;
  cursor: pointer;
}
.icon__delete {
  cursor: pointer;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.menu-form {
  padding-bottom: 10px;
  overflow-x: scroll;
  height: 365px;
}
.menu-form__title {
  text-align: center;
  border-bottom: 1px solid black;
}
.menu-form__text {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.menu-form__body {
  padding: 20px;
}
.menu-form__item {
  display: flex;
  justify-content: center;
}
.menu-form__select {
  outline: 1px solid black;
  height: 24px;
  width: 60px;
  font-size: 12px;
  border-radius: 5px;
  text-align: center;
  padding-left: 2px;
  padding-right: 2px;
}

.menu-form__input {
  display: flex;
  justify-content: center;
  width: 250px;
  outline: 1px solid black;
  margin: auto;
}
.menu-form__hint {
  font-size: 10px;
  color: red;
  width: 250px;
  visibility: hidden;
  margin: auto;
  font-weight: 500;
}
.menu-form__input_visible {
  visibility: visible;
}
.menu-form__btn {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 20px;
  width: 250px;
}
.menu-form__table {
  margin-top: 20px;
  text-align: center;
}
.menu-form__dish-amount {
  outline: 1px solid black;
  width: 60px;
  border-radius: 5px;
  text-align: center;
}
.menu-form__heading {
  font-size: 11px;
  background-color: rgb(78, 77, 77);
  color: white;
  padding: 2px;
}

.text-center {
  color: white;
  outline: 1px solid white;
}
.menu-form__cell {
  color: white;
  text-align: center;
}
</style>
