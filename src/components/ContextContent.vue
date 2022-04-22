<template>
  <div class="phrase-wrapper">
    <template v-if="contextData.phrases">

      <div class="phrase"
           v-for="(phrase, index) in contextData.phrases"
           :key="index"
           :class="{selected: selectedIndex === index}"
           @click="selectedIndex = index">
        {{ phrase.notes }}
        <TunicText :phrase="phrase.phrase" :letter-size="10" />
      </div>

    </template>
    <button @click="addPhrase()">Add</button>
    {{selectedIndex}}
    <TunicPhraseEditor v-if="selectedPhrase" v-model="selectedPhrase"/>
  </div>
</template>

<script setup lang="ts">
import type {ContextData} from "@/utils/context";
import {computed, onMounted, reactive, ref, watch} from "vue";
import TunicText from "@/components/TunicText.vue";
import TunicPhraseEditor from "@/components/TunicPhraseEditor.vue";

const props = defineProps<{
  context: string
}>();

const contextData = ref<ContextData>(reactive({}));
const selectedIndex = ref(0);
const selectedPhrase = computed(() => {
  let idx = selectedIndex.value;
  let phrases = contextData.value.phrases ?? [];
  if (idx < phrases.length) {
    return phrases[idx];
  } else {
    return null;
  }
});

watch(props, ({context}) => {
  fetchContext(context);
});

onMounted(() => {
  fetchContext(props.context);
});

async function fetchContext(context: string) {
  console.log("Fetching context");
  const req = await fetch(`api/context/${context}`);
  if (req.ok) contextData.value = reactive(await req.json());
}

function addPhrase() {
  if (!contextData.value.phrases) contextData.value.phrases = [];
  contextData.value.phrases?.push({
    phrase: [],
    notes: '',
  });
}
</script>

<style scoped lang="scss">
.phrase-wrapper {
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
}

.phrase {
  border: 1px solid var(--color-border);
  background: var(--color-background);

  &.selected {
    background: var(--color-background-selected);
  }
}
</style>