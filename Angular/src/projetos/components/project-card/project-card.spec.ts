import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCard } from './project-card';
import { provideHttpClient } from '@angular/common/http';
import { ProjectService } from '../../services/project';
import { Project, Task } from '../../types/project.types';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [
        provideHttpClient(),
        { provide: ProjectService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
  });

  it('deve calcular 0% de progresso se o projeto nascer sem tarefas', () => {

    component.project = new Project('Projeto Sem Tarefas', 'Lógica à prova de erro', [], 'p-vazio');

    fixture.detectChanges();

    expect(component.project.getTotalTasks()).toBe(0);
    expect(component.project.getCompletedTasks()).toBe(0);
    expect(component.project.getProgressPercentage()).toBe(0);
  });

  it('deve calcular a percentagem exata com base nas tarefas com status "concluída"', () => {
    const tarefasMock = [
      new Task('T1', 'd', '2026', 'concluída', 't1'),
      new Task('T2', 'd', '2026', 'concluída', 't2'),
      new Task('T3', 'd', '2026', 'pendente', 't3')
    ];
    
    component.project = new Project('Projeto Ativo', 'Cálculo de progresso', tarefasMock, 'p-reativo');

    fixture.detectChanges();

    expect(component.project.getTotalTasks()).toBe(3);
    expect(component.project.getCompletedTasks()).toBe(2);
    expect(component.project.getProgressPercentage()).toBe(67);
  });
});