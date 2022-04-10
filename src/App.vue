<template>
  <div class="app-container">
    <ContextSelector />
    <TunicText :phrase="phrase"/>
    <!--      <TunicText :phrase="phrase" :mode="'hex'"/>-->
    <!--      <TunicText :phrase="phrase" :letterSize="40"/>-->
    <!--      <TunicText :phrase="phrase" :letterSize="10"/>-->
    <TunicTextEditor/>

    <!--      <nav>-->
    <!--        <RouterLink to="/">Home</RouterLink>-->
    <!--        <RouterLink to="/about">About</RouterLink>-->
    <!--      </nav>-->
  </div>

  <!--  <RouterView/>-->
</template>

<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {TEST_PHRASE} from './utils/tunic';
import {ref} from 'vue';
import TunicText from './components/TunicText.vue';
import TunicTextEditor from "@/components/TunicTextEditor.vue";
import ContextSelector from "@/components/ContextSelector.vue";

const phrase = ref(TEST_PHRASE);
</script>

<style lang="scss">
@import 'base';

body {
  display: flex;
  place-items: center;
  flex-flow: column;
  flex-direction: column;
}

.app-container {
  display: flex;
  place-items: center;
  flex-flow: column;
  flex-direction: column;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
