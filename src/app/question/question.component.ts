import {Component, OnInit} from '@angular/core';
import {AddQuestionComponent} from "../add-question/add-question.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

    constructor(private modalService: NgbModal) {
    }

    ngOnInit(): void {
    }

    onClickAddQuestion() {
        const modalRef = this.modalService.open(AddQuestionComponent, {size: 'xl'});
    }

}
