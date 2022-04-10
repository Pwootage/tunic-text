<template>
  <div class="tunic-editor">
    <TunicText :phrase="phrase"/>
    <input type="text" v-model="textPhrase" @keydown="handleKeydown"/>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import TunicText from './TunicText.vue';
import {TEXT, textClean, textToPhrase} from "@/utils/tunic";

let $textPhrase = ref('');
const textPhrase = computed<string>(
  {
    get: () => {
      return $textPhrase.value;
    },
    set: (value: string) => {
      $textPhrase.value = textClean(value);
    }
  }
);
const phrase = computed(() => textToPhrase(textPhrase.value));

function handleKeydown(event: KeyboardEvent) {
  const char = event.key;
  const shift = event.shiftKey;
  let newChar: string | null = null;
  // Not Shift
  if (char == 'Backspace' || char == 'Delete' || char.indexOf('Arrow') >= 0 || char == 'Home' || char == 'End') {
    // allow
  } else if (char == '0') {
    newChar = TEXT.BOTTOM_CIRCLE;
  } else if (char == '7' && !shift) {
    newChar = TEXT.SIDE_LEFT;
  } else if (char == '8' && !shift) {
    newChar = TEXT.SIDE_TOP_LEFT;
  } else if (char == '9' && !shift) {
    newChar = TEXT.SIDE_TOP_RIGHT;
  } /*else if (char == '+' && !shift) {
    newChar = TEXT.SIDE_RIGHT;
  }*/ else if (char == '4' && !shift) {
    newChar = TEXT.CORNER_TOP_LEFT;
  } else if (char == '5' && !shift) {
    newChar = TEXT.CORNER_TOP;
  } else if (char == '6' && !shift) {
    newChar = TEXT.CORNER_TOP_RIGHT;

    // Shift
  } else if (char == '7' && shift) {
    newChar = TEXT.SIDE_LEFT;
  } else if (char == '8' && shift) {
    newChar = TEXT.SIDE_BOTTOM_LEFT;
  } else if (char == '9' && shift) {
    newChar = TEXT.SIDE_BOTTOM_RIGHT;
  } /*else if (char == '+' && shift) {
    newChar = TEXT.SIDE_RIGHT;
  } */ else if (char == '4' && shift) {
    newChar = TEXT.CORNER_BOTTOM_LEFT;
  } else if (char == '5' && shift) {
    newChar = TEXT.CORNER_BOTTOM;
  } else if (char == '6' && shift) {
    newChar = TEXT.CORNER_BOTTOM_RIGHT;
  } else if (char.length == 1) {
    newChar = char;
  }
  if (newChar) {
    event.preventDefault();
    const ele = (event.target as HTMLInputElement);
    const val = textPhrase.value;
    const pos = ele.selectionStart ?? val.length;
    textPhrase.value = val.substring(0, pos) + newChar + val.substring(pos);
  }
}

</script>

<style scoped lang="scss">
.tunic-editor {
  display: inline-flex;
  flex-flow: column;
  align-items: center;
}
</style>