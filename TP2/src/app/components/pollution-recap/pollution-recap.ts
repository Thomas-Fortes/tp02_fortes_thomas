import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pollution } from '../../models/pollution.model';

@Component({
  selector: 'app-pollution-recap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pollution-recap.html',  
  styleUrl: './pollution-recap.css'       
})
export class PollutionRecapComponent {
  @Input() pollution!: Pollution;
  @Output() reset = new EventEmitter<void>();

  onNewDeclaration(): void {
    this.reset.emit();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}