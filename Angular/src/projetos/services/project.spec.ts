import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from './project';
import { Project, CreateProject } from '../types/project.types';

describe('ProjectService (Store Global Centralizada)', () => {
  let service: ProjectService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })

    service = TestBed.inject(ProjectService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('deve inicializar com um estado de projetos vazio []', () => {
    expect(service.projects()).toEqual([])
    expect(service.totalProjects()).toBe(0)
  })

  it('deve carregar projetos da API [GET] e atualizar o Sinal global', () => {
    const mockProjects: Project[] = [
      { id: '1', name: 'Proj 1', description: 'Desc 1', task: [] }
    ]

    service.loadAllProjects()

    const req = httpMock.expectOne('http://localhost:3000/projects')
    expect(req.request.method).toBe('GET')
    req.flush(mockProjects)
    expect(service.projects()).toEqual(mockProjects)
    expect(service.totalProjects()).toBe(1)
  })

  it('deve enviar um [POST] e adicionar o novo projeto ao topo do Estado Global', () => {
    const input: CreateProject = { name: 'Novo', description: 'Teste', task: [] }
    const mockResponse: Project = { id: '99', ...input }

    service.createProject(input)

    const req = httpMock.expectOne('http://localhost:3000/projects')
    expect(req.request.method).toBe('POST')
    req.flush(mockResponse)

    expect(service.projects()[0]).toEqual(mockResponse)
    expect(service.totalProjects()).toBe(1)
  })
})