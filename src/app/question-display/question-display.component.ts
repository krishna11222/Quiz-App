import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-display.component.html',
  styleUrl: './question-display.component.css'
})
export class QuestionDisplayComponent {
  @Input() question: any;
  @Input() selectedOption: number | null = null;
  @Output() optionSelected = new EventEmitter<number>();

  onSelectOption(value: number): void {
    this.optionSelected.emit(value);
  }
}
