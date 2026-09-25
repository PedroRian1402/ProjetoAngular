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
  private projectService = inject(ProjectService);

  projectsSignal = this.projectService.projects;
  isModalOpen = false;

  constructor() {
    this.projectService.loadAllProjects()
  }

  handleCreateProject(newProjectData: CreateProject): void {
    this.projectService.createProject(newProjectData)
    this.isModalOpen = false
  }

  handleDeleteProject(deletedId: string): void {
    
    this.projectService.deleteProject(deletedId)
  }

  closeModal(): void {
    this.isModalOpen = false
  }
}