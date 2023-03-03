<template>
  <q-select
    filled
    v-model="group"
    multiple
    use-chips
    :options="options"
    label="Активности"
    style="width: 250px"
    class="full-width"
  />
</template>

<script setup lang="ts">
import { useStore } from "src/stores/store";
import { ref, watch, computed } from "vue";

const store = useStore();

const group = ref([]);

const options = computed(() => {
  return store.map_filters.activity?.map((e) => {
    return {
      label: e.value,
      value: e.key,
    };
  });
});

watch(group, () => {
  store.appliedFilters = group.value.map((e) => JSON.stringify(e.value));

  console.log(store.appliedFilters);
  store.uploadAllObjects();
});
</script>
