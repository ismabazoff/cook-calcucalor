<template>
  <nav ref="nav">
    <RouterLink to="/">Главная</RouterLink>
    <RouterLink to="/unit/list">Единицы измерения</RouterLink>
    <RouterLink to="/categories/list">Категории</RouterLink>
    <RouterLink to="/products/list">Продукты</RouterLink>
    <RouterLink to="/recipes/list">Рецепты</RouterLink>
    <RouterLink to="/recipe-categories/list">Категории рецептов</RouterLink>
    <RouterLink to="/menu/list">Меню</RouterLink>
  </nav>
</template>

<script>
export default {
  watch: {
    $route() {
      if (this.$route.path.includes("update")) {
        this.$refs.nav.style.display = "none";
      } else {
        this.$refs.nav.style.display = "flex";
      }
    },
  },
};
</script>

<style lang="scss">
nav {
  justify-content: center;
  a {
    text-decoration: none;
    margin: 10px;
  }
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
