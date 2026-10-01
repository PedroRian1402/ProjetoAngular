import { CommonModule } from '@angular/common';
import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { Project, Task, TaskStatus } from '../../types/project.types';
import { ProjectService } from '../../services/project';

@Component({
  imports: [CommonModule],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  @Input({ required: true }) project!: Project

  @Output() projectDeleted = new EventEmitter<string>()

  private projectService = inject(ProjectService)

  isEditingProject = false
  editingTaskId: string | null = null

  get totalTasks(): number {
    return this.project.task ? this.project.task.length : 0
  }

  get completedTasks(): number {
    return this.project.task
      ? this.project.task.filter(t => t.status === 'concluída').length
      : 0
  }

  get progressPercentage(): number {
    return this.totalTasks > 0 ? Math.round((this.completedTasks / this.totalTasks) * 100) : 0
  }

  addNewTaskToProject(
    titleInput: HTMLInputElement,
    descInput: HTMLTextAreaElement,
    dateInput: HTMLInputElement
  ): void {
    const title = titleInput.value.trim()
    const description = descInput.value.trim()
    const dueDate = dateInput.value.trim()

    if (!title || !description || !dueDate) {
      alert('Por favor, preencha todos os campos da tarefa.');
      return
    }

    const newTask: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title: title,
      description: description,
      dueDate: dueDate,
      status: 'pendente'
    };

    const currentTasks = this.project.task ? this.project.task : []
    this.project.task = [...currentTasks, newTask]

    titleInput.value = '';
    descInput.value = '';
    dateInput.value = '';

    this.projectService.updateProject(this.project)
  }

  toggleTaskStatus(task: Task): void {
    task.status = task.status === 'concluída' ? 'pendente' : 'concluída'
    this.projectService.updateProject(this.project)
  }

  deleteTaskFromProject(taskId: string): void {
    if (confirm('Tem a certeza de que deseja remover esta tarefa?')) {
      this.project.task = this.project.task.filter(t => t.id !== taskId)
      this.projectService.updateProject(this.project)
    }
  }

  removeProject(): void {
    if (confirm(`Tem a certeza de que deseja eliminar o projeto "${this.project.name}"?`)) {
      this.projectDeleted.emit(this.project.id)
    }
  }

  saveProjectEdit(nameInput: HTMLInputElement, descInput: HTMLTextAreaElement): void {
    const newName = nameInput.value.trim()
    const newDesc = descInput.value.trim()

    if (!newName || !newDesc) {
      alert('O nome e a descrição do projeto não podem estar vazios.')
      return
    }

    this.project.name = newName
    this.project.description = newDesc

    this.projectService.updateProject(this.project)
    this.isEditingProject = false
  }

  saveTaskEdit(
    taskId: string,
    titleIn: HTMLInputElement,
    descIn: HTMLTextAreaElement,
    dateIn: HTMLInputElement,
    statusIn: HTMLSelectElement
  ): void {
    if (!this.project.task) return;

    this.project.task = this.project.task.map(t => {
      if (t.id === taskId) {
        return {
          id: t.id,
          title: titleIn.value.trim(),
          description: descIn.value.trim(),
          dueDate: dateIn.value.trim(),
          status: statusIn.value as TaskStatus
        };
      }
      return t;
    });

    this.projectService.updateProject(this.project);
    this.editingTaskId = null;
  }

  changeTaskStatusQuick(task: Task, newStatus: string): void {
    task.status = newStatus as TaskStatus;
    this.projectService.updateProject(this.project);
  }
}