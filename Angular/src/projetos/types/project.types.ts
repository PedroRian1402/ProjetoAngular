export interface Project {
    id : string;
    name : string;
    description: string
    task: Task[]
}

export interface Task{
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface CreateProject{
    name: string;
    description: string;
    task : Task[];
}