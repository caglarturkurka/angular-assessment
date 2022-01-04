import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionComponent} from "./question/question.component";
import {AddQuestionComponent} from "./add-question/add-question.component";
import {PreviewAnswerComponent} from "./preview-answer/preview-answer.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'question',
    pathMatch: 'full',
  },
  { path: 'question', component: QuestionComponent },
  { path: 'preview-answer', component: PreviewAnswerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
