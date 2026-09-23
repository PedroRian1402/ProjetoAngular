import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { Project, CreateProject } from '../../types/project.types';
import { ProjectForm } from '../project-form/project-form';

@Component({
  imports: [CommonModule, ProjectCard, ProjectForm],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  projects: Project[] = [];
  isModalOpen = false

  handleCreateProject(newProjectData: CreateProject): void {
    const newProject: Project = {
      id : Math.random().toString(36).substring(2, 9),
      name : newProjectData.name,
      description : newProjectData.description,
      task: []
    }
    this.projects = [newProject, ...this.projects]
    this.isModalOpen = false
  }
}