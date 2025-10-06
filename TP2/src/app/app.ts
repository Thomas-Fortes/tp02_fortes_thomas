import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionFormComponent } from './components/pollution-form/pollution-form'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PollutionFormComponent],
  templateUrl: './app.html',    
  styleUrl: './app.css'         
})
export class AppComponent {
  title = 'tp02-pollution';
}