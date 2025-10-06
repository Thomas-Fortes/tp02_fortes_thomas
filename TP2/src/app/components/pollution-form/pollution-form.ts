import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Pollution, TYPES_POLLUTION } from '../../models/pollution.model';
import { PollutionRecapComponent } from '../pollution-recap/pollution-recap';  // ← Changé ici

@Component({
  selector: 'app-pollution-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PollutionRecapComponent],  // ← Vérifie que c'est bien là
  templateUrl: './pollution-form.html',  // ← Sans .component
  styleUrl: './pollution-form.css'       // ← Sans .component
})
export class PollutionFormComponent {
  pollutionForm: FormGroup;
  typesPollution = TYPES_POLLUTION;
  pollutionData: Pollution | null = null;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.pollutionForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateObservation: ['', Validators.required],
      lieu: ['', [Validators.required, Validators.minLength(3)]],
      latitude: ['', [Validators.required, Validators.pattern(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?((1[0-7][0-9])|([0-9]?[0-9]))(\.[0-9]{1,10})?$/)]],
      photoUrl: ['', Validators.pattern(/^https?:\/\/.+/)]
    });
  }

  onSubmit(): void {
    if (this.pollutionForm.valid) {
      this.pollutionData = {
        titre: this.pollutionForm.value.titre,
        type: this.pollutionForm.value.type,
        description: this.pollutionForm.value.description,
        dateObservation: this.pollutionForm.value.dateObservation,
        lieu: this.pollutionForm.value.lieu,
        latitude: parseFloat(this.pollutionForm.value.latitude),
        longitude: parseFloat(this.pollutionForm.value.longitude),
        photoUrl: this.pollutionForm.value.photoUrl || undefined
      };
      this.isSubmitted = true;
    } else {
      this.markFormGroupTouched(this.pollutionForm);
    }
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.pollutionData = null;
    this.pollutionForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.pollutionForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.pollutionForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (field?.hasError('minlength')) {
      return `Minimum ${field.errors?.['minlength'].requiredLength} caractères`;
    }
    if (field?.hasError('pattern')) {
      if (fieldName === 'latitude') {
        return 'Latitude invalide (-90 à 90)';
      }
      if (fieldName === 'longitude') {
        return 'Longitude invalide (-180 à 180)';
      }
      if (fieldName === 'photoUrl') {
        return 'URL invalide (doit commencer par http:// ou https://)';
      }
    }
    return '';
  }
}