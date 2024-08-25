import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../Service/quiz.service';
import { QuestionDisplayComponent } from "../question-display/question-display.component";

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [HttpClientModule, CommonModule, QuestionDisplayComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  selectedOptions: (number | null)[] = [];
  score: number | null = null;
  totalPossibleScore: number = 0;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(res => { 
      debugger;
      this.questions = res;
      this.selectedOptions = new Array(this.questions.length).fill(null);
      this.totalPossibleScore = this.calculateTotalPossibleScore();
    });
  }

  calculateTotalPossibleScore(): number {
    let totalScore = 0;
    for (let i = 0; i < this.questions.length; i++) {
      totalScore += this.questions[i].data.marks; 
    }
    return totalScore;
  }

  calculateScore(): number {
    let score = 0;
    this.questions.forEach((question, index) => {
      const selectedOption = this.selectedOptions[index];
      if (selectedOption !== null && question.data.options[selectedOption].isCorrect) {
        score += question.data.marks;
      }
    });
    return score;
  }

  loadQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  selectOption(value: number): void {
    this.selectedOptions[this.currentQuestionIndex] = value;
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.loadQuestion(this.currentQuestionIndex + 1);
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.loadQuestion(this.currentQuestionIndex - 1);  
    }
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.questions.length - 1;  
  }

  submitAnswer(): void {
    debugger;
    if (this.selectedOptions.includes(null)) {
  
      alert('Please select all options before submitting.');
      return;
    }
    this.score = this.calculateScore();      
  }
}

