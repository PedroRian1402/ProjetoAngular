import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { CreateProject } from '../../types/project.types'
import { NonNullAssert } from '@angular/compiler';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-project-form',
  styleUrl: './project-form.css',
  templateUrl: './project-form.html',
})

export class ProjectForm {
  @Output() submitSuccess = new EventEmitter<CreateProject>()
  @Output() cancel = new EventEmitter<void>()

  projectForm = new FormGroup({
    name: new FormControl('', { validators : [Validators.required, Validators.minLength(3)], nonNullable: true}),
    description: new FormControl('', { validators: [Validators.required, Validators.minLength(4)], nonNullable: true}),
    task : new FormArray<FormGroup<{
      id : FormControl<string>
      title:FormControl<string>
      isCompleted: FormControl<boolean>
    }>>([])
  })

  get taskArray(){
    return this.projectForm.controls.task
  }

  addTask():void {
    const taskGroup = new FormGroup({
      id: new FormControl(Math.random().toString(36).substring(2, 9), { nonNullable: true}),
      title : new FormControl('', { validators: [Validators.required], nonNullable: true}),
      isCompleted : new FormControl(false, { nonNullable : true})
    })
    this.taskArray.push(taskGroup)
  }

  removeTask(index: number):void {
    this.taskArray.removeAt(index)
  }

  onSubmit(): void {
    if(this.projectForm.valid){
      const formValue: CreateProject = this.projectForm.getRawValue()
      this.submitSuccess.emit(formValue)
    } else {
      this.projectForm.markAllAsTouched()
    }
  }
}
