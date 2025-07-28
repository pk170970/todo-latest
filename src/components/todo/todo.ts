import { Component, signal } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']
})
export class Todo {
  private editingId = signal<number | null> (null);
  constructor(public todoService: TodoService){}

  get allTodos(){
    return this.todoService.allTodos;
  }

  isEditingId(id:number){
    return this.editingId() === id;
  }

  editTodo(id:number){
    this.editingId.set(id);
  }

  saveEdit(id:number, text:string){
    this.todoService.editTodo(id, text);
    this.editingId.set(null);
  }

  cancelEdit(){
    this.editingId.set(null);
  }
}
