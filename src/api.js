const url =
  "http://p90552i9.beget.tech/cook-calc/server/std/ismail/cook-calc/api";

export default {
  unit: {
    async create(unitName) {
      const response = await fetch(`${url}/units/`, {
        method: "PUT",
        body: JSON.stringify({
          name: unitName,
        }),
      });
      return await response.json();
    },
    async read(unitId) {
      const response = await fetch(`${url}/units/${unitId}`);
      return await response.json();
    },
    async update(unitId, formData) {
      const response = await fetch(`${url}/units/${unitId}`, {
        method: "POST",
        body: formData,
      });
      return await response.json();
    },
    async delete(unitId) {
      const response = await fetch(`${url}/units/${unitId}`, {
        method: "DELETE",
      });
      return await response.json();
    },
    async list() {
      const response = await fetch(`${url}/units/`);
      return await response.json();
    },
  },
  categories: {
    async create(category) {
      const response = await fetch(`${url}/product-categories/`, {
        method: "PUT",
        body: JSON.stringify({
          name: category,
        }),
      });
      return await response.json();
    },
    async read(categoryId) {
      const response = await fetch(`${url}/product-categories/${categoryId}`);
      return await response.json();
    },
    async update(categoryId, formData) {
      const response = await fetch(`${url}/product-categories/${categoryId}`, {
        method: "POST",
        body: formData,
      });
      return await response.json();
    },
    async delete(categoryId) {
      const response = await fetch(`${url}/product-categories/${categoryId}`, {
        method: "DELETE",
      });
      return await response.json();
    },
    async list() {
      const response = await fetch(`${url}/product-categories/`);
      return await response.json();
    },
  },
  products: {
    async create(product, categoryId, unitId) {
      const response = await fetch(`${url}/products/`, {
        method: "PUT",
        body: JSON.stringify({
          name: product,
          category_id: categoryId,
          unit_id: unitId,
        }),
      });
      return await response.json();
    },
    async read(productId) {
      const response = await fetch(`${url}/products/${productId}`);
      return await response.json();
    },
    async update(productId, formData) {
      const response = await fetch(`${url}/products/${productId}`, {
        method: "POST",
        body: formData,
      });
      return await response.json();
    },
    async delete(productId) {
      const response = await fetch(`${url}/products/${productId}`, {
        method: "DELETE",
      });
      return await response.json();
    },
    async list() {
      const response = await fetch(`${url}/products/`);
      return await response.json();
    },
  },
  recipes: {
    async create(
      recipe,
      amount,
      categoryId,
      cookingMethodText,
      recipeProducts
    ) {
      const response = await fetch(`${url}/recipies/`, {
        method: "PUT",
        body: JSON.stringify({
          name: recipe,
          numberPersons: amount,
          recipeCategoryId: categoryId,
          cookingMethod: cookingMethodText,
          products: recipeProducts,
        }),
      });
      return await response.json();
    },
    async read(recipeId) {
      const response = await fetch(`${url}/recipies/${recipeId}`);
      return await response.json();
    },
    async update(recipeId, formData) {
      const response = await fetch(`${url}/recipies/${recipeId}`, {
        method: "POST",
        body: formData,
      });
      return await response.json();
    },
    async delete(recipeId) {
      const response = await fetch(`${url}/recipies/${recipeId}`, {
        method: "DELETE",
      });
      return await response.json();
    },
    async list() {
      const response = await fetch(`${url}/recipies/`);
      return await response.json();
    },
  },
  recipeCategories: {
    async create(recipeCategories) {
      const response = await fetch(`${url}/recipe-categories/`, {
        method: "PUT",
        body: JSON.stringify({
          name: recipeCategories,
        }),
      });
      return await response.json();
    },
    async read(recipeCategoriesId) {
      const response = await fetch(
        `${url}/recipe-categories/${recipeCategoriesId}`
      );
      return await response.json();
    },
    async update(recipeCategoriesId, formData) {
      const response = await fetch(
        `${url}/recipe-categories/${recipeCategoriesId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      return await response.json();
    },
    async delete(recipeCategoriesId) {
      const response = await fetch(
        `${url}/recipe-categories/${recipeCategoriesId}`,
        {
          method: "DELETE",
        }
      );
      return await response.json();
    },
    async list() {
      const response = await fetch(`${url}/recipe-categories/`);
      return await response.json();
    },
  },
  menu: {
    async create(menuName, amountPeople, dishesName) {
      const response = await fetch(`${url}/menu/`, {
        method: "PUT",
        body: JSON.stringify({
          name: menuName,
          numberPersons: amountPeople,
          dishes: dishesName,
        }),
      });
      return await response.json();
    },
    async read(menuId) {
      const response = await fetch(`${url}/menu/${menuId}`);
      return await response.json();
    },
    async update(menuId, formData) {
      const response = await fetch(`${url}/menu/${menuId}`, {
        method: "POST",
        body: formData,
      });
      return await response.json();
    },
    async delete(menuId) {
      const response = await fetch(`${url}/menu/${menuId}`, {
        method: "DELETE",
      });
      return await response.json();
    },
    async list() {
      const response = await fetch(`${url}/menu/`);
      return await response.json();
    },
  },
};
