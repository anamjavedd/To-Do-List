<template>
  <li class="pb-5 text-center flex justify-between">
    <template v-if="!editMode">
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
      <input
        type="text"
        v-model="editedTodo.name"
        class="border rounded-lg p-2 shadow-sm text-bgDarkBlue mr-5"
        required
      />
      <select
        v-model="editedTodo.tag"
        class="border rounded-lg p-2 shadow-sm text-bgDarkBlue"
        required
      >
        <option value="Priority">Priority</option>
        <option value="Important">Important</option>
        <option value="Not Important">Not Important</option>
      </select>
      <button @click="saveEdit" class="mx-2">Save</button>
    </template>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
  },
  data() {
    return {
      editMode: false,
      editedTodo: { ...this.todo },
    };
  },
  methods: {
    deleteTodo() {
      this.$emit("delete", this.todo.id);
    },
    toggleEditMode() {
      this.editMode = true;
    },
    saveEdit() {
      if (this.editedTodo.name.trim() === "") {
        return;
      }
      this.editMode = false;
      this.$emit("save-edit", this.editedTodo); // Ensure this line emits the correct event with the editedTodo object
    },
  },
};
</script>
