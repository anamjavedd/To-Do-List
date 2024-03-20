<template>
  <div class="bg-bgCream text-white h-dvh flex justify-center">
    <section class="pt-10">
      <!-- Tags Button + To-Do List -->
      <div class="flex flex-col items-center gap-y-5">
        <!-- Tags -->
        <TagButtons :tags="tags" :currentTag="currentTag" @update-tag="setCurrentTag" :showForm="showForm"/>

        <!-- To-Do List -->
        <TodoList :filteredTodos="filteredTodos" @delete-todo="deleteTodo" @save-edit="saveEdit" @toggle-edit-todo="toggleEditMode" :showForm="showForm" />

        <!-- Add Icon Button -->
        <button @click="showTodoForm" class="flex justify-end items-center">
          <img v-if="!showForm" width="100" height="100" src="../assets/add-button.png" alt="add" />
          <img v-else width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/multiply.png" alt="close" />
        </button>
        
        <!-- Form -->
        <TodoForm :showForm="showForm" @add-todo="addTodo" />
      </div>
    </section>
  </div>
</template>

<script>
import TagButtons from './Tag-Buttons.vue'
import TodoList from './Todo-List.vue'
import TodoForm from './Todo-Form.vue'


export default {
  components: {
    TagButtons,
    TodoList,
    TodoForm
  },
  data() {
    return {
      todos: [],
      currentTag: 'All',
      newTodo: '',
      showForm: false,
      tag: 'Priority'
    };
  },
  computed: {
    filteredTodos() {
      if (this.currentTag === 'All') {
        return this.todos;
      }
      return this.todos.filter(todo => todo.tag === this.currentTag);
    },
    tags() {
      return ['All', ...new Set(this.todos.map(todo => todo.tag))];
    }
  },
  methods: {
    addTodo(todo) {
      this.todos.push({
        name: todo.name,
        id: this.todos.length + 1,
        tag: todo.tag,
        editMode: false
      });
      this.saveTodosToLocalStorage();
      this.newTodo = '';
      this.tag = 'Priority';
      this.showForm = false;
    },
    setCurrentTag(tag) {
      this.currentTag = tag;
    },
    showTodoForm() {
      this.showForm = !this.showForm;
    },
    deleteTodo(todoId) {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
      this.saveTodosToLocalStorage();
    },
    toggleEditMode(todo) {
      todo.editMode = !todo.editMode;
      this.saveTodosToLocalStorage();
    },

    saveEdit(todoId) {
      this.todos = this.todos.filter(todo => todo.id !== todoId);
      this.saveTodosToLocalStorage();
    },

    saveTodosToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    loadTodosFromLocalStorage() {
      const todosJson = localStorage.getItem('todos');
      if (todosJson) {
        this.todos = JSON.parse(todosJson);
      }
    }


  },
  created() {
    this.loadTodosFromLocalStorage();
  }
};
</script>
