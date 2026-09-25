import { Service, inject,signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, CreateProject } from '../types/project.types'

@Service()
export class ProjectService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:3000/projects'

    private projectsState = signal<Project[]>([])
    public projects = this.projectsState.asReadonly()
    public totalProjects = computed(() => this.projectsState().length)
    
    loadAllProjects(): void {
        this.http.get<Project[]>(this.apiUrl).subscribe({
            next: (data) => this.projectsState.set(data),
            error: (err) => console.error('Erro na store ao carregar projetos:' , err)
        })
    }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.apiUrl)
    }

    createProject(projectData: CreateProject): void {
    this.http.post<Project>(this.apiUrl, projectData).subscribe({
      next: (newProject) => {
        this.projectsState.update((current) => [newProject, ...current])
      },
      error: (err) => console.error('Erro na Store ao criar projeto:', err)
    });
  }

    updateProject(updatedProject: Project): void {
    this.http.put<Project>(`${this.apiUrl}/${updatedProject.id}`, updatedProject).subscribe({
      next: (res) => {
        this.projectsState.update((current) => 
          current.map((p) => p.id === res.id ? res : p)
        )
      },
      error: (err) => console.error('Erro na Store ao atualizar projeto:', err)
    });
  }

    deleteProject(projectId: string): void {
    this.http.delete<void>(`${this.apiUrl}/${projectId}`).subscribe({
      next: () => {
        this.projectsState.update((current) => current.filter((p) => p.id !== projectId))
      },
      error: (err) => console.error('Erro na Store ao eliminar projeto:', err)
    });
  }
}
