import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MockService} from "../services/mock.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-preview-answer',
    templateUrl: './preview-answer.component.html',
    styleUrls: ['./preview-answer.component.scss']
})
export class PreviewAnswerComponent implements OnInit, OnDestroy {
    subs!: Subscription;
    questions: any[] = [];

    constructor(private mockService: MockService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subs = this.mockService.allQuestions().subscribe(questions => {
            this.questions = questions;
        });
    }

    onAdd() {
        this.router.navigate(['question'])
    }

    ngOnDestroy() {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
}
