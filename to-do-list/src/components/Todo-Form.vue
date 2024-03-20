<template>
    <div v-if="showForm" class="border">
      <form @submit.prevent="add">
        <div class="border my-5 p-5 font-serif rounded-lg bg-bgMaroon text-textLemon shadow-lg">
          <input type="text" placeholder="new" class="border rounded-lg w-full my-2 p-3 shadow-sm text-bgDarkBlue" v-model="newTodo" required />
          <div class="flex items-center m-8 justify-between">
            <label v-for="todoTag in todoTags" :key="todoTag" class="mr-2">
              <input type="radio" v-model="tag" :value="todoTag" name="tag" />
              {{ todoTag }}
            </label>
          </div>
          <div class="flex justify-center m-5">
            <button type="submit" class="text-center px-8 py-4 rounded-xl bg-textLemon text-bgMaroon border-bgMaroon shadow-md hover:shadow-xl">Add</button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['showForm'],
    data() {
      return {
        newTodo: '',
        tag: 'Priority',
        todoTags: ['Priority', 'Important', 'Not Important']
      };
    },
    methods: {
      add() {
        this.$emit('add-todo', {
          name: this.newTodo,
          tag: this.tag
        });
        this.newTodo = '';
        this.tag = 'Priority';
      }
    }
  };
  </script>
  