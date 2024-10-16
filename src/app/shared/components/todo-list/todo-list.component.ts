import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

  todoList : string[] = [];
  input : string = "";

  
  onSubmit(): void {
    if (!this.checkSameTodoName(this.input)) {
      this.todoList.push(this.input);
      
    } else {
      alert('Girdiğiniz TODO bulunmaktadır.');
    }
    this.input = "";
  }
  deleteTodo(index : number){
    this.todoList.splice(index,1);
  }
  checkSameTodoName(todo : string): boolean{
    return this.todoList.includes(todo)
  }
}