<script lang="ts" setup>
import { ref } from 'vue';
import { useTodoStore } from '~/store/todo';

const todoStore = useTodoStore();
const newTodo = ref('');

const addTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim());
    newTodo.value = '';
  }
};

const { todos, completedTodos, incompleteTodos } = todoStore;
const { toggleTodo, removeTodo } = todoStore;
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Todo App</h1>
    <div class="mb-4">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        class="border p-2 mr-2"
        placeholder="Add new todo"
      />
      <button @click="addTodo" class="bg-blue-500 text-white p-2 rounded">
        Add
      </button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="flex items-center mb-2">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
          class="mr-2"
        />
        <span :class="{ 'line-through': todo.completed }">{{ todo.text }}</span>
        <button
          @click="todoStore.removeTodo(todo.id)"
          class="ml-2 text-red-500"
        >
          Delete
        </button>
      </li>
    </ul>
    <div class="mt-4">
      <p>Completed: {{ completedTodos.length }}</p>
      <p>Incomplete: {{ incompleteTodos.length }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 600px;
}

input[type='checkbox'] {
  @apply w-4 h-4;
}

button {
  @apply transition-colors duration-200;
  &:hover {
    @apply opacity-80;
  }
}
</style>
