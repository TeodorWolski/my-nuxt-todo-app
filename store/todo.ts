import { defineStore } from 'pinia';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(text: string) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      this.todos.push(newTodo);
    },
    toggleTodo(id: number) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
  getters: {
    completedTodos(): Todo[] {
      return this.todos.filter((todo) => todo.completed);
    },
    incompleteTodos(): Todo[] {
      return this.todos.filter((todo) => !todo.completed);
    },
  },
});
