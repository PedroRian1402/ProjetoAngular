import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { Project } from '../../types/project.types';

@Component({
  imports: [CommonModule],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  @Input ({ required: true }) project!: Project

  get totalTasks():number {
    return this.project.task ? this.project.task.length : 0
  }

  get completedTasks(): number {
    return this.project.task ? this.project.task.filter( t => t.isCompleted).length : 0
  }

  get progressPercentage(): number {
    return this.totalTasks > 0 ? Math.round((this.completedTasks / this.totalTasks) * 100): 0
  }
}

