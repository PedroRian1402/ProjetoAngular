export type TaskStatus = 'pendente' | 'em progresso' | 'concluída'

export abstract class BaseModel {
  id: string;

  constructor(id: string = Math.random().toString(36).substring(2, 9)) {
    this.id = id;
  }
}


export class Task extends BaseModel {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;

  constructor(
    title: string = '',
    description: string = '',
    dueDate: string = '',
    status: TaskStatus = 'pendente',
    id?: string
  ) {
    super(id); 
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = status;
  }

  isCompleted(): boolean {
    return this.status === 'concluída';
  }
}

export class Project extends BaseModel {
  name: string;
  description: string;
  task: Task[];

  constructor(
    name: string = '',
    description: string = '',
    task: Task[] = [],
    id?: string
  ) {
    super(id); 
    this.name = name;
    this.description = description;
    this.task = task;
  }

  getTotalTasks(): number {
    return this.task ? this.task.length : 0;
  }

  getCompletedTasks(): number {
    return this.task ? this.task.filter(t => t.isCompleted()).length : 0;
  }

  getProgressPercentage(): number {
    const total = this.getTotalTasks();
    return total > 0 ? Math.round((this.getCompletedTasks() / total) * 100) : 0;
  }
}

export interface CreateProject {
  name: string;
  description: string;
  task: Task[];
}