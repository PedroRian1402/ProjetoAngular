import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCard } from './project-card';
import { provideHttpClient } from '@angular/common/http';
import { ProjectService } from '../../services/project';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [
        provideHttpClient(),
        { provide: ProjectService, useValue: {}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
  });

  it('deve calcular 0% de progresso se o projeto nascer sem tarefas', ()=>{
    component.project = {
      id: 'p-vazio',
      name: 'Projeto Sem Tarefas',
      description: 'Lógica à prova de erro',
      task: []
    }

    fixture.detectChanges()

    expect(component.totalTasks).toBe(0)
    expect(component.completedTasks).toBe(0)
    expect(component.progressPercentage).toBe(0)
  })

  it('deve calcular a pecentagem exata com base nas tarefas com status "concluída"', ()=>{
    component.project = {
      id: 'p-reactivo',
      name: 'Projecto Ativo',
      description: 'Cálculo de progresso',
      task: [
        { id: 't1', title: 'T1', description: 'd', dueDate: '2026', status: 'concluída' },
        { id: 't2', title: 'T2', description: 'd', dueDate: '2026', status: 'concluída' },
        { id: 't3', title: 'T3', description: 'd', dueDate: '2026', status: 'pendente' }
      ] 
    }

    fixture.detectChanges()

    expect(component.totalTasks).toBe(3)
    expect(component.completedTasks).toBe(2)
    expect(component.progressPercentage).toBe(67)
  }
  )
});
