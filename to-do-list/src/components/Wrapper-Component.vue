<template>
    <div class="flex bg-bgCream justify-center h-dvh items-center gap-24">
      <!-- Notes Component -->
      <div class="w-1/5">
        <div class="flex justify-center text-7xl font-handwriting font-semibold  pb-5 pr-4">
            <h1>Notes</h1>
        </div>
        <router-link to="/notes"><img src="../assets/notes.png" alt=""></router-link>
      </div>
      <!-- ToDo Component -->
      <div class="w-1/5">
        <div class="flex justify-center text-7xl font-handwriting font-semibold  pb-4">
            <h1 class="whitespace-nowrap">To-Do</h1>
        </div>
        <router-link to="/todos"><img src="../assets/to-do-list.png" alt=""></router-link> 
      </div>
      <router-view></router-view>
    </div>
    
</template>
  
<script>
//eslint-disable-next-line no-unused-vars 
  import {RouterView} from 'vue-router'
  //eslint-disable-next-line no-unused-vars 
  import {RouterLink} from 'vue-router'

  export default {
   
  }
</script>