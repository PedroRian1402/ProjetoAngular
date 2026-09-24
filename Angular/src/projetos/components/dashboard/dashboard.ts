import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { Project, CreateProject } from '../../types/project.types';
import { ProjectService } from '../../services/project';
import { ProjectForm } from '../project-form/project-form';

@Component({
  imports: [CommonModule, ProjectCard, ProjectForm],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {

  private projectService = inject(ProjectService)
  private cdr = inject(ChangeDetectorRef)
  projects: Project[] = [];
  isModalOpen = false

  constructor(){
    this.loadProjects()
  }

  private loadProjects():void {
    this.projectService.getProjects().subscribe({
      next: (data) =>{
        this.projects = [...data]
        this.cdr.detectChanges()
      },
      error : (err)=>{
        console.error('Erro ao ler a API:', err)
      }
    })
  }

  handleCreateProject(newProjectData: CreateProject): void {
    this.projectService.createProject(newProjectData).subscribe({
      next : (newProjectCreatedInServe) => {
        this.projects = [newProjectCreatedInServe, ...this.projects]
        this.isModalOpen = false
        this.cdr.detectChanges()
      },
      error: (err) =>{
        console.error('Error ao gravar na API:', err)
      }
    })
  }

  closeModal(): void {
    this.isModalOpen = false
  }

  handleDeleteProject(deleteId: string):void {
    this.projects = this.projects.filter( p => p.id !== deleteId)

    this.cdr.detectChanges()
  }
}