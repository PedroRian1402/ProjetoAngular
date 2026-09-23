import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCard } from '../project-card/project-card';
import { Project, CreateProject } from '../../types/project.types';

@Component({
  imports: [CommonModule, ProjectCard],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  projects: Project[] = [];

  openCreateModal(): void {
    alert('Abrir formulário de criação de projeto!');
  }
}