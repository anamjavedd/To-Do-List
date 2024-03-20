<template>
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
  </template>
  
  <script>
  export default {
    props: ['tags', 'currentTag', 'showForm'],
    methods: {
      setCurrentTag(tag) {
        this.$emit('update-tag', tag);
      }
    }
  };
  </script>

<!-- Emitting an event from Child Component to Parent Component -->
<!-- The ChildComponent emits a custom event named 'update-tag' using this.$emit('update-tag', tag). Data i.e tag is passed along with the event.
The ParentComponent listens for the 'update-tag' emitted by the Child Component using @update-tag="setCurrentTag". When the event is emitted, 
the setCurrentTag method in the parent component is called, where you can handle the event and access any data passed from the child component. -->
  