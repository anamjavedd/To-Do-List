<template>
    <li class="pb-5 text-center flex justify-between">
      <template v-if="!todo.editMode">
        <label>{{ todo.name }}</label>
        <div class="flex gap-3 ml-5">
          <button @click="toggleEditMode">
            <img src="../assets/update-icon.png" alt="" class="w-7 h-7" />
          </button>
          <button @click="deleteTodo">
            <img src="../assets/delete-icon.png" alt="" class="w-7 h-7" />
          </button>
        </div>
      </template>
      <template v-else>
        <!-- eslint-disable-next-line -->
        <input type="text" v-model="todo.name" class="border rounded-lg p-2 shadow-sm text-bgDarkBlue mr-5" required />
        <!-- eslint-disable-next-line -->
        <select v-model="todo.tag" class="border rounded-lg p-2 shadow-sm text-bgDarkBlue" required>
          <option value="Priority">Priority</option>
          <option value="Important">Important</option>
          <option value="Not Important">Not Important</option>
        </select>
        <button @click="saveEdit" class="mx-2">Save</button>
      </template>
    </li>
  </template>
  
  <script>
  /* eslint-disable */ 
  export default {
    props: {
      todo: Array
    },
    // data() {
    //   return {
    //     editedTodo: { ...this.todo } // Make a copy of the todo prop
    //   };
    // },
    methods: {
      deleteTodo() {
        this.$emit('delete', this.todo.id);
      },
      toggleEditMode() {
        this.todo.editMode = !this.todo.editMode;
      },
      saveEdit() {
        if (this.todo.name.trim() === "") {
          return;
        }
        this.todo.editMode = false;
        this.$emit('save-edit', this.todo);
      },
    }
  };
  </script>