<template>
  <li class="list__item">
    <span class="list__name">{{ text }}</span>
    <RouterLink class="list__link" :to="urlUpdate">
      <v-btn density="compact" variant="flat" color="purple-darken-1">
        Редактировать
      </v-btn>
    </RouterLink>
    <v-btn
      density="compact"
      variant="flat"
      color="red"
      @click="$emit('removeClick')"
    >
      Удалить
    </v-btn>
  </li>
</template>

<script>
export default {
  props: {
    text: {},
    urlUpdate: {},
  },
};
</script>

<style scoped>
.list__link {
  width: 160px;
  margin-right: 10px;
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
</style>
