import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from "./quiz/quiz.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QuizApp';
}
