export type TaskStatus = 'pendente' | 'em progresso' | 'concluída'

export interface Project {
    id : string;
    name : string;
    description: string
    task: Task[]
}

export interface Task{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
}

export interface CreateProject{
    name: string;
    description: string;
    task : Task[];
}

