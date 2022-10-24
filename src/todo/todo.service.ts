import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private toDos: Todo[] = [
    {
      id: 1,
      description: 'Sleep',
      done: false,
    },
    {
      id: 2,
      description: 'Fish task',
      done: true,
    },
    {
      id: 3,
      description: 'Fish todo',
      done: true,
    },
  ];

  create({ description }: CreateTodoDto): Todo {
    const todo = new Todo();
    todo.id = Math.max(...this.toDos.map((todo) => todo.id), 0) + 1;
    todo.description = description;
    todo.done = false;

    this.toDos.push(todo);

    return todo;
  }

  findAll() {
    return this.toDos;
  }

  findOne(id: number) {
    const getToDoById = this.toDos.find((task) => task.id === id);
    if (!getToDoById)
      throw new NotFoundException(`ToDo with id #${id} not exist`);

    return getToDoById;
  }

  update(id: number, { description, done }: UpdateTodoDto): Todo {
    const todoById = this.findOne(id);
    if (done !== undefined) todoById.done = done;

    if (description) todoById.description = description;

    this.toDos.map((db) => (db.id === id ? todoById : db));

    return todoById;
  }

  remove(id: number) {
    this.findOne(id);
    this.toDos = this.toDos.filter((task) => task.id !== id);
  }
}
