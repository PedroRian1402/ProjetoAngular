import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CreateProject } from '../../types/project.types'

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
    description: new FormControl('', { validators: [Validators.required, Validators.minLength(4)], nonNullable: true})
  })

  onSubmit(): void {
    if(this.projectForm.valid){
      const formValue: CreateProject = this.projectForm.getRawValue()
      this.submitSuccess.emit(formValue)
    } else {
      this.projectForm.markAllAsTouched()
    }
  }
}
