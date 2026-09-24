import { CommonModule } from '@angular/common';
import { Component, Input, inject, ChangeDetectorRef} from '@angular/core';
import { Project, Task } from '../../types/project.types';
import { ProjectService } from '../../services/project';

@Component({
  imports: [CommonModule],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  @Input ({ required: true }) project!: Project

  private projectService = inject(ProjectService)
  private cdr = inject(ChangeDetectorRef)

  get totalTasks():number {
    return this.project.task ? this.project.task.length : 0
  }

  get completedTasks(): number {
    return this.project.task ? this.project.task.filter( t => t.isCompleted).length : 0
  }

  get progressPercentage(): number {
    return this.totalTasks > 0 ? Math.round((this.completedTasks / this.totalTasks) * 100): 0
  }

  addNewTaskToProject(taskTitle: string):void {
    if (!taskTitle.trim()) return

    const newTask: Task = {
      id : Math.random().toString(36).substring(2, 9),
      title: taskTitle,
      isCompleted : false
    }

    this.project.task = [...(this.project.task || []), newTask]

    this.updateProjectOnServer()
  }

  toggleTaskStatus(task: Task):void{
    task.isCompleted = !task.isCompleted
    this.updateProjectOnServer()
  }

  private updateProjectOnServer():void {
    this.projectService.updateProject(this.project).subscribe({
      next: (updateProject) => {
        this.project = updateProject
        this.cdr.detectChanges()
      },
      error: (err)=>{
        console.error('Erro ao atualizar o projeto no servidor:' , err)
      }
    })
  }
}

