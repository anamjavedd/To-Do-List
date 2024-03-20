<template>
    <div class="bg-bgMaroon border-bgCream rounded-lg mt-5 w-full p-10" v-if="!showForm">
      <div class="font-handwriting text-3xl text-center mb-10">
        <h2>To-Do List</h2>
      </div>
      <ul class="text-textLemon text-lg">
        <li v-for="todo in filteredTodos" :key="todo.id" class="pb-5 text-center">
          <TodoItem :todo="todo" @delete="deleteTodo" @toggle-edit="toggleEditMode" @save-edit="saveEdit"/>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import TodoItem from './Todo-Item.vue';
  
  export default {
    props: {
      showForm:Boolean, 
      filteredTodos:Array
    },
    components: {
      TodoItem
    },
    methods: {
      deleteTodo(id) {
        this.$emit('delete-todo', id);
      },
      toggleEditMode(todo) {
        this.$emit('toggle-edit-todo', todo);
      },
      saveEdit(id) {
        this.$emit('save-edit', id);
      },
    }
  };
  </script>
  