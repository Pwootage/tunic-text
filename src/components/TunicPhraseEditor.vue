<template>
  EDITOR:
  <textarea v-model="notes" />
  <TunicTextEditor :
</template>

<script setup lang="ts">
import type {ContextPhrase} from "@/utils/context";
import {computed, ref, watch} from "vue";
import type {TunicPhrase} from "@/utils/tunic";
import TunicTextEditor from "@/components/TunicTextEditor.vue";

const props = defineProps<{
  modelValue: ContextPhrase
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: ContextPhrase): void
}>()

const notes = computed({
  get() {
    return props.modelValue.notes;
  },
  set(notes: string) {
    emit('update:modelValue', {...props.modelValue, notes})
  }
});
const phrase = computed({
  get() {
    return props.modelValue.phrase;
  },
  set(phrase: TunicPhrase) {
    emit('update:modelValue', {...props.modelValue, phrase})
  }
});
</script>

<style scoped lang="scss">

</style>