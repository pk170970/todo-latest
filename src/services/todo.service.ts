import { computed, Injectable, signal } from "@angular/core";
import { Todo } from "../models/todo.model";

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    public todos = signal<Todo[]>([]);
    public newTodo = signal('');

    get allTodos(){
        return this.todos.asReadonly(); //readonly signal
    }

    completedTodos = computed(()=> this.todos().filter(t=>t.completed));

    addTodo(): void {
        const value = this.newTodo().trim();
        if (value) {
            const newTodo: Todo = {
                id: Date.now(),
                text: value,
                completed: false
            };
            this.todos.update(todos => [...todos, newTodo]);
            this.newTodo.set('');
        }
    }

    toggleTodo(id:number){
        this.todos.update(t=> t.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
    }

    deleteTodo(id:number){
        this.todos.update(t=>t.filter(todo=> todo.id !== id));
    }
    
    editTodo(id:number, text:string){
        const trimmed = text.trim();
        if(!trimmed)  return;
        this.todos.update(todos=> 
            todos.map(data => 
                data.id === id ? {...data, text: trimmed} : data
            ));
    }
}