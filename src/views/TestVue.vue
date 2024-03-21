<template>
  <div>
    <div class="categories">
      <div
          v-for="(category, index) in categories"
          :key="index"
          :class="{ active: activeCategoryIndex === index }"
          @click="setActiveCategory(index)"
      >
        {{ category.name }}
      </div>
    </div>
    <div class="products" ref="productsContainer">
      <div
          v-for="(product, index) in activeCategory ? activeCategory.products : []"
          :key="index"
          class="product"
      >
        {{ product.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const categories = ref([
  { name: 'Category 1', products: [{ name: 'Product 1.1' }, { name: 'Product 1.2' }] },
  { name: 'Category 2', products: [{ name: 'Product 2.1' }, { name: 'Product 2.2' }] },
  { name: 'Category 3', products: [{ name: 'Product 3.1' }, { name: 'Product 3.2' }] }
]);

const activeCategoryIndex = ref(0);
const productsContainer = ref(null);

const setActiveCategory = (index) => {
  activeCategoryIndex.value = index;
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      activeCategoryIndex.value = index;
    }
  });
}, { threshold: 0.5 });

onMounted(() => {
  const options = {
    root: productsContainer.value,
    rootMargin: '0px',
    threshold: 0.5
  };

  categories.value.forEach((category, index) => {
    const categoryElement = productsContainer.value.children[index];
    observer.observe(categoryElement);
  });
});

const activeCategory = ref(null);

watch(activeCategoryIndex, () => {
  activeCategory.value = categories.value[activeCategoryIndex.value];

  const activeCategoryElement = productsContainer.value.children[activeCategoryIndex.value];
  activeCategoryElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
</script>

<style>
.categories {
  display: flex;
}

.categories > div {
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
}

.categories > .active {
  font-weight: bold;
}

.products {
  overflow-y: auto;
  height: 300px; /* Adjust height as needed */
}

.product {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
