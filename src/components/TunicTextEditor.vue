<template>
  <TunicText :phrase="phrase"/>
  <input type="text" v-model="textPhrase" @keydown="handleKeydown"/>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import TunicText from './TunicText.vue';
import {TEXT, textClean, textToPhrase} from "@/utils/tunic";

const textPhrase = ref('');
const phrase = computed(() => textToPhrase(textPhrase.value));

// watch(textPhrase, ([newPhrase]) => {
//   let clean = textClean(newPhrase || '');
//   if (clean != newPhrase) {
//     console.log('CLEANING');
//     textPhrase.value = clean;
//   }
// });

function handleKeydown(event: KeyboardEvent) {
  const char = event.key;
  const shift = event.shiftKey;
  let newPhrase = textPhrase.value;
  // shift or not
  if (char.match(/^[a-m]$/)) {
    event.preventDefault();
    newPhrase += char;
  } else if (char == 'Backspace' || char == 'Delete' || char.indexOf('Arrow') >= 0 || char == 'Home' || char == 'End') {
    // allow
  } else if (char == '0') {
    event.preventDefault();
    newPhrase += TEXT.BOTTOM_CIRCLE;
  } else if (char == ' ') {
    event.preventDefault();
    newPhrase += ' ';
  } else if (char == ',') {
    event.preventDefault();
    newPhrase += ',';

    // Not Shift
  } else if (char == '7' && !shift) {
    event.preventDefault();
    newPhrase += TEXT.SIDE_LEFT;
  } else if (char == '8' && !shift) {
    event.preventDefault();
    newPhrase += TEXT.SIDE_TOP_LEFT;
  } else if (char == '9' && !shift) {
    event.preventDefault();
    newPhrase += TEXT.SIDE_TOP_RIGHT;
  } else if (char == '+' && !shift) {
    event.preventDefault();
    newPhrase += TEXT.SIDE_RIGHT;
  } else if (char == '4' && !shift) {
    event.preventDefault();
    newPhrase += TEXT.CORNER_TOP_LEFT;
  } else if (char == '5' && !shift) {
    event.preventDefault();
    newPhrase += TEXT.CORNER_TOP;
  } else if (char == '6' && !shift) {
    event.preventDefault();
    newPhrase += TEXT.CORNER_TOP_RIGHT;

    // Shift
  } else if (char == '7' && shift) {
    event.preventDefault();
    newPhrase += TEXT.SIDE_LEFT;
  } else if (char == '8' && shift) {
    event.preventDefault();
    newPhrase += TEXT.SIDE_BOTTOM_LEFT;
  } else if (char == '9' && shift) {
    event.preventDefault();
    newPhrase += TEXT.SIDE_BOTTOM_RIGHT;
  } else if (char == '+' && shift) {
    event.preventDefault();
    newPhrase += TEXT.SIDE_RIGHT;
  } else if (char == '4' && shift) {
    event.preventDefault();
    newPhrase += TEXT.CORNER_BOTTOM_LEFT;
  } else if (char == '5' && shift) {
    event.preventDefault();
    newPhrase += TEXT.CORNER_BOTTOM;
  } else if (char == '6' && shift) {
    event.preventDefault();
    newPhrase += TEXT.CORNER_BOTTOM_RIGHT;
  } else {
    console.log(`Blocking keypress: ${char}`);
    event.preventDefault();
  }
  newPhrase = textClean(newPhrase);
  textPhrase.value = newPhrase;
}

</script>

<style scoped lang="scss">

</style>