import { HttpClient } from '@angular/common/http';
import { TodoCardComponent } from './../todo-card/todo-card.component';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetToDoListResponse } from '../../models/getToDoListResponse';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, TodoCardComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todoList: string[] = [];
  newTodo: string = '';

  todoRequest: GetToDoListResponse = {
    userId: 0,  
    id: 0,      
    title: '',
    completed: false,
  };


  toDoListFromBackend: GetToDoListResponse[] = [];
  // Dependency Injection
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  add(): void {
    const existingItem = this.todoList.find((i) => i == this.newTodo);
    if (!existingItem && this.newTodo.trim().length > 0)
      this.todoList.push(this.newTodo);
    this.newTodo = '';
  }

  getTodo(id: number) {
    this.httpClient
      .get<GetToDoListResponse>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe({
        next: (response: GetToDoListResponse) => {
          console.log('Başarılı:', response);
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('İstek başarılı bitti');
        },
      });
  }

  remove(todo: string) {
    this.todoList = this.todoList.filter((i) => i !== todo);
  }

  fetchTodos() {
    // Async, Observable, Subscribe
    this.httpClient
      .get<GetToDoListResponse[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response: GetToDoListResponse[]) => {
          this.toDoListFromBackend = response;
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('istek başarılı bitti');
        },
      });
    // RxJs observable
  }

  createTodo() {
    this.httpClient
      .post<GetToDoListResponse>('https://jsonplaceholder.typicode.com/todos', this.todoRequest)
      .subscribe({
        next: (response: GetToDoListResponse) => {
          console.log('Başarılı:', response);
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('İstek başarılı bitti');
        },
      });
  }



  deleteTodo(id: number) {
    this.httpClient
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe({
        next: () => {
          this.toDoListFromBackend = this.toDoListFromBackend.filter(todo => todo.id !== id);
        },
        error: (err: any) => {
          console.log('HATA', err);
        },
        complete: () => {
          console.log('Silme isteği başarılı');
        },
      });
  }
}