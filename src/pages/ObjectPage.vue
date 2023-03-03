<template>
  <q-page class="q-ma-md">
    <div>
      <h3 class="text-bold">{{ supplierStore.supplier?.name }}</h3>
    </div>
    <div class="wrapper text-h6">
      <div class="col">
        <p class="text-bold">О Заведении</p>
        <p>{{ supplierStore.supplier?.info }}</p>
      </div>
      <div class="col">
        <p class="text-bold">Контакты</p>
        <p>Адрес:</p>
        <p>{{ supplierStore.supplier?.address }}</p>
        <p>Телефон:</p>
        <a :href="['tel:' + supplierStore.supplier.phone?.[0]]">{{
          supplierStore.supplier.phone?.[0]
        }}</a>
        <p>Сайт</p>
        <a :href="supplierStore.supplier?.url">{{
          supplierStore.supplier?.url
        }}</a>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSupplierStore } from 'stores/supplier-store';
import { useRoute } from 'vue-router';

const supplierStore = useSupplierStore();
const route = useRoute();

onMounted(() => {
  supplierStore.loadData(+route.params.id);
});
</script>

<style lang="scss">
.wrapper {
  display: flex;
  justify-content: space-between;
  column-gap: 2em;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}

p {
  margin: 0;
}
</style>
