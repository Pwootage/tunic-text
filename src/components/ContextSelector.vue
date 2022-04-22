<template>
  <div class="context-selector">
    <select v-model="context">
      <option :key="context" v-for="context of contexts" :value="context">{{ context }}</option>
    </select>
    <ContextContent v-if="context" :context="context"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import ContextContent from "@/components/ContextContent.vue";

const contexts = ref([] as string[]);
const context = ref<string | null>(null);

onMounted(async () => {
  const req = await fetch("/api/context");
  if (req.ok) {
    contexts.value = await req.json();
    if (!contexts.value) {
      contexts.value = [];
    }
  }
});
</script>

<style scoped lang="scss">

</style>