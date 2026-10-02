import { Service, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Project, CreateProject, Task } from '../types/project.types'

@Service()
export class ProjectService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:3000/projects'

  private projectsState = signal<Project[]>([])
  public projects = this.projectsState.asReadonly()
  public totalProjects = computed(() => this.projectsState().length)

  private errorState = signal<string | null>(null)
  public errorMessage = this.errorState.asReadonly()

  loadAllProjects(): void {
    this.http.get<any[]>(this.apiUrl).pipe(
      map((jsonArray: any[]) => jsonArray.map(item => this.mapToProjectInstance(item)))
    ).subscribe({
      next: (instances) => {
        this.projectsState.set(instances);
        this.errorState.set(null);
      },
      error: () => {
        this.errorState.set('Não foi possível carregar os projetos. Verifique se o servidor local está ativo.')
      }
    })
  }

  createProject(projectData: CreateProject): void {
    this.http.post<any>(this.apiUrl, projectData).pipe(
      map((item: any) => this.mapToProjectInstance(item))
    ).subscribe({
      next: (newProject) => {
        this.projectsState.update((current) => [newProject, ...current])
        this.errorState.set(null)
      },
      error: () => this.errorState.set('Ocorreu um erro ao tentar criar o projeto no servidor.')
    });
  }

  updateProject(updatedProject: Project): void {
    this.http.put<any>(`${this.apiUrl}/${updatedProject.id}`, updatedProject).pipe(
      map((item: any) => this.mapToProjectInstance(item))
    ).subscribe({
      next: (res) => {
        this.projectsState.update((current) =>
          current.map((p) => p.id === res.id ? res : p)
        );
        this.errorState.set(null)
      },
      error: () => {
        this.errorState.set(`Falha ao sincronizar as alterações do projeto "${updatedProject.name}".`)
      }
    })
  }

  deleteProject(projectId: string): void {
    this.http.delete<void>(`${this.apiUrl}/${projectId}`).subscribe({
      next: () => {
        this.projectsState.update((current) => current.filter((p) => p.id !== projectId));
        this.errorState.set(null)
      },
      error: () => {
        this.errorState.set('Erro ao eliminar o projeto do servidor.')
      }
    })
  }

  private mapToProjectInstance(data: any): Project {
    const tasks = (data.task || []).map(
      (t: any) => new Task(t.title, t.description, t.dueDate, t.status, t.id)
    );
    return new Project(data.name, data.description, tasks, data.id);
  }

  public clearError(): void {
    this.errorState.set(null)
  }
}
