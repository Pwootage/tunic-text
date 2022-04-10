<script setup lang="ts">
import {ref, computed, watch} from 'vue';
import {drawPhrase, phraseToText, type TunicPhrase} from '@/utils/tunic';
import {phraseSize} from '@/utils/tunic';

// const phrase = ref([] as TunicPhrase);
const props = defineProps<{
  phrase: TunicPhrase,
  letterSize?: number,
  mode?: 'tunic' | 'hex',
  width?: number,
}>();
const size = computed(() => phraseSize(props.phrase, props.letterSize));
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = computed(() => canvas?.value?.getContext("2d"));

watch([props, canvas, ctx], ([props, canvas, ctx]) => {
  if (canvas && ctx) {
    // console.log(`re-drawing phrase '${phraseToText(props.phrase)}'`);
    canvas.width = size.value[0];
    canvas.height = size.value[1];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const color = getComputedStyle(canvas).getPropertyValue('--color-text');
    const mode = props.mode;
    const width = props.width;
    drawPhrase(ctx, props.phrase, {x: 0, y: 0, letterSize: props.letterSize, color, mode, width});
  }
});

</script>

<template>
  <canvas ref="canvas"></canvas>
</template>

<style scoped lang="scss">

</style>