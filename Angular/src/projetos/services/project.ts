import { Service, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, CreateProject } from '../types/project.types'

@Service()
export class ProjectService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:3000/projects'

    getProjects(): Observable<Project[]>{
        return this.http.get<Project[]>(this.apiUrl)
    }

    createProject(projectData: CreateProject): Observable<Project>{
        const newProjectPayload = {
            ...projectData,
            task: []
        }
        return this.http.post<Project>(this.apiUrl, newProjectPayload)
    }
}
