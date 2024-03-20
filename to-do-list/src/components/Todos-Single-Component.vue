<template>
    <div class="bg-bgCream text-white h-dvh flex justify-center">
      <section class="pt-10">
        <!-- Tags Button + To-Do List -->
        <div class="flex flex-col items-center gap-y-5">
          <!-- Tags -->
          
          <!-- If showForm is false, the expression !showForm evaluates to true, and the <div> will be rendered.
               If showForm is true, the expression !showForm evaluates to false, and the <div> will not be rendered.
               So, v-if works based on the truthiness of the expression provided to it. 
               If the expression is falsy, the element will not be rendered, regardless of the specific value of false. -->
  
          <!-- Agar showForm=true toh yeh form visible hoga ya render hoga DOM mein -->
          <div class="gap-5 flex rounded-xl py-5" v-if="!showForm">
            <button
              @click="setCurrentTag(tag)"
              v-for="tag in tags"
              :key="tag"
              class="border rounded p-5 text-base text-bgCream bg-bgDarkBlue"
              :class="{
                'border-blue-500 text-blue-500': tag === currentTag,
              }"
            >
              {{ tag }}
            </button>
          </div>
  
          <!-- To-Do List -->
          <!-- Agar showForm=true toh yeh form visible hoga ya render hoga DOM mein -->
          <div
            class="bg-bgMaroon border-bgCream rounded-lg mt-5 w-full p-10"
            v-if="!showForm"
          >
            <div class="font-handwriting text-3xl text-center mb-10">
              <h2>To-Do List</h2>
            </div>
            <ul class="text-textLemon text-lg">
              <li
                v-for="todo in filteredTodos"
                :key="todo.id"
                class="pb-5 text-center flex justify-between"
              >
                <!-- Edit and Delete Option -->
                <template v-if="!todo.editMode">
                  <label class="">{{ todo.name }}</label>
                  <div class="flex gap-3">
                    <button @click="toggleEditMode(todo)">
                      <img
                        src="../assets/update-icon.png"
                        alt=""
                        class="w-7 h-7"
                      />
                    </button>
                    <button @click="deleteTodo(todo.id)">
                      <img
                        src="../assets/delete-icon.png"
                        alt=""
                        class="w-7 h-7"
                      />
                    </button>
                  </div>
                </template>
  
                <!-- Edit Form Inline -->
  
                <template v-else>
                  <input
                    type="text"
                    v-model="todo.name"
                    class="border rounded-lg p-2 shadow-sm text-bgDarkBlue mr-5"
                    required
                  />
                  <select
                    v-model="todo.tag"
                    class="border rounded-lg p-2 shadow-sm text-bgDarkBlue"
                    required
                  >
                    <option value="Priority">Priority</option>
                    <option value="Important">Important</option>
                    <option value="Not Important">Not Important</option>
                  </select>
                  <button @click="saveEdit(todo)" class="mx-2">Save</button>
                  <button @click="cancelEdit(todo)">Cancel</button>
                </template>
              </li>
            </ul>
          </div>
  
          <!-- Add Icon Button -->
           <!-- After clicking the add icon button, showTodoForm will make showForm flag from false to true  -->
          <button @click="showTodoForm" class="flex justify-end items-center">
            <!-- It will be rendered only when Add Icon button is not clicked when showForm = true -->
            <!-- After clicking the add button icon, the flag will become false -->
            <img
              v-if="!showForm" 
              width="100"
              height="100"
              src="../assets/add-button.png"
              alt="add"
            />
  
            <!-- Else Agar if condition fulfill nhi hui toh yeh icon visible hoga ya render hoga DOM mein -->
            <img
              v-else
              width="24"
              height="24"
              src="https://img.icons8.com/material-outlined/24/000000/multiply.png"
              alt="close"
            />
          </button>
          <!-- Form -->
         <!-- After clicking the add button icon, showForm becomes true -->
         <!--  @add is used instead of @click to indicate that the form submission is a specific action within the component,
           and it might involve more than just a click event, such as form validation and data submission. -->
           
          <div @add="add" v-if="showForm" class="border">
            <form @submit.prevent="add">
              <div
                class="border my-5 p-5 font-serif rounded-lg bg-bgMaroon text-textLemon shadow-lg"
              >
                <input
                  type="text"
                  placeholder="new"
                  class="border rounded-lg w-full my-2 p-3 shadow-sm text-bgDarkBlue"
                  v-model="newTodo"
                  required
                />
                <div class="flex items-center m-8 justify-between">
                  <label class="mr-2">
                    <input
                      type="radio"
                      v-model="tag"
                      name="tag"
                      value="Priority"
                    />
                    Priority
                  </label>
                  <label class="mr-2">
                    <input
                      type="radio"
                      v-model="tag"
                      name="tag"
                      value="Important"
                    />
                    Important
                  </label>
                  <label class="mr-2">
                    <input
                      type="radio"
                      v-model="tag"
                      name="tag"
                      value="Not Important"
                    />
                    Not Important
                  </label>
                </div>
                <div class="flex justify-center m-5">
                  <button
                    type="submit"
                    class="text-center px-8 py-4 rounded-xl bg-textLemon text-bgMaroon border-bgMaroon shadow-md hover:shadow-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        todos: [], // Array to store todo items
        currentTag: "All", // Currently selected tag filter
        newTodo: "", // New todo item
        showForm: false, // Flag to toggle display of todo form
        tag: "Priority", // Default tag for new todos
      };
    },
  
    computed: {
      // Filtered list of todos based on current tag
      filteredTodos() {
        if (this.currentTag === "All") {
          return this.todos;
        }
  
        return this.todos.filter((a) => a.tag === this.currentTag);
      },
  
      // Unique list of tags derived from existing todos
      tags() {
        return ["All", ...new Set(this.todos.map((a) => a.tag))];
      },
    },
  
    methods: {
      // Method to add a new todo item
      add() {
        this.todos.push({
          name: this.newTodo,
          id: this.todos.length + 1,
          tag: this.tag,
          editMode: false, // Initialize editMode to false when adding a new todo
        });
        this.saveTodosToLocalStorage(); // Save todos to local storage
        this.newTodo = "";
        this.tag = "Priority"; // Reset tag to default value after adding todo
        this.showForm = false; // Hide todo form after adding todo
      },
  
      // Method to set the current tag filter
      setCurrentTag(tag) {
        this.currentTag = tag;
      },
  
      // Method to toggle display of add todo form
      showTodoForm() {
        this.showForm = !this.showForm;
      },
  
      // Method to delete a todo item
      deleteTodo(todoId) {
        //using filter method a new array is created of all the elements that matches the condition ((todo) => todo.id !== todoId)
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
        this.saveTodosToLocalStorage(); // Save todos to local storage
      },
  
      // Method to toggle edit mode of a todo item
      toggleEditMode(todo) {
        todo.editMode = !todo.editMode;
        this.saveTodosToLocalStorage(); // Save todos to local storage
      },
  
      // Method to cancel editing a todo item
      cancelEdit(todo) {
        todo.editMode = false;
        this.saveTodosToLocalStorage(); // Save todos to local storage
      },
  
      // Method to save edits to a todo item
      saveEdit(todo) {
        if (todo.name.trim() === "") {
          return; // Don't save empty todo names
        }
        todo.editMode = false;
        this.saveTodosToLocalStorage(); // Save todos to local storage
      },
  
      // Method to save todos to local storage
      saveTodosToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
  
      // Method to load todos from local storage when component is created
      loadTodosFromLocalStorage() {
        const todosJson = localStorage.getItem("todos");
        if (todosJson) {
          this.todos = JSON.parse(todosJson);
        }
      },
    },
  
    // Lifecycle hook to load todos from local storage when component is created
    created() {
      this.loadTodosFromLocalStorage();
    },
  };
  </script>
  
  
  