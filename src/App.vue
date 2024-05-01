<script setup>
import { ref } from 'vue'
import { useStatefulComposable } from '@/composables/state-composable.js';


import Sidebar from '@/components/SideBar.vue'
import EditorGroups from '@/components/ui/EditorGroups.vue'
import Toolbar from '@/components/Toolbar.vue'
// import Keyboard from './components/Keyboard.vue'
import Keyboard from '@/components/keyboard/Keyboard.vue'
import DesignDashboard from '@/components/design/DesignDashboard.vue'
import Dialog from '@/components/ui/Dialog.vue'
import KButton from '@/components/ui/kbutton.vue'
const { globalState, localState, updateValues } = useStatefulComposable();
const store = globalState

const save = () => {
  localStorage.setItem ( 'ds-instrument' , JSON.stringify ( store.instrumentDS ) )
}

</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->
  <main class="bg-neutral-800 text-white w-screen max-w-screen margin-0 padding-0 fixed inset-0 h-screen max-h-screen">
  <div class="flex">
    <div class="w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 h-screen max-h-screen overflow-auto">
        <!-- <Toolbar />
        <div class="flex h-screen m-auto text-center justify-center" v-if="!store.zones.length">
          <div class="m-auto text-4xl">
            DS - Instrument Creator
          </div>
        </div> -->
        <div v-if="store.workflow=='editor'" class="p-2">
          <Keyboard v-if="store.instrumentDS?.groups.length"/>
        </div>
        <div v-if="store.workflow=='design'" class="p-2">
          <DesignDashboard/>
        </div>
      </div>
    </div>
  </main>
</template>
<!-- 
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->
