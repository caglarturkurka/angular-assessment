import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IQuestionType, QuestionType} from "../model/question-type.model";
import {Router} from "@angular/router";
import {MockService} from "../services/mock.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrls: ['./add-question.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddQuestionComponent implements OnInit, AfterViewInit {

    public form!: FormGroup;
    public formSubmitted = false;
    public questionTypes: IQuestionType[] = [];
    public selectedQuestionType = '1';

    constructor(private fb: FormBuilder,
                private modalService: NgbModal,
                private cdRef: ChangeDetectorRef,
                private mockService: MockService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.initalizeForm();
    }

    initalizeForm() {
        this.form = this.fb.group({
            question: new FormControl(null, Validators.required),
            questionType: new FormControl(null, Validators.required),
            paragraph: new FormControl(null, Validators.required),
            options: this.fb.array([]),
            other: new FormControl(false),
            isRequired: new FormControl(false),
        });
        this.questionTypes = this.fillQuestionTypes();
    }

    get addForm() {
        return this.form.controls;
    }

    fillQuestionTypes() {
        const paragraphQuestion: QuestionType = new QuestionType('1', 'Paragraph');
        const checkBoxQuestion: QuestionType = new QuestionType('2', 'Checkbox');
        const types: IQuestionType[] = [];
        types.push(paragraphQuestion);
        types.push(checkBoxQuestion);
        return types;
    }

    clearFormArray(formArray: FormArray) {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    addOption() {
        this.options.push(
            this.fb.group({
                option: ["", Validators.required],
                valid: [false]
            })
        );
    }

    onChangeQuestionType(param: any) {
        const value = +param.value;
        if (value === 1) {
            const updatedOptionsArr = this.updatedOptions();
            this.addForm.paragraph.setValue(null);
            this.clearFormArray(updatedOptionsArr);
        }
        if (value === 2) {
            const updatedOptionsArr = this.updatedOptions();
            this.clearFormArray(updatedOptionsArr);
            this.addForm.paragraph.setValue(' ');
            this.generateEmptyForm(3).map(val => {
                this.updatedOptions().push(val);
            });
        }
    }

    updatedOptions(): FormArray {
        return this.addForm.options as FormArray;
    }

    generateEmptyForm(arrLength: any) {
        const formGroupArr = [];
        for (let i = 0; i < arrLength; i++) {
            formGroupArr.push(
                this.fb.group({
                    option: ['', Validators.required],
                    valid: [false]
                })
            )
        }

        return formGroupArr;

    }

    goToPreview() {
        const isOpenModalExist = this.modalService.hasOpenModals();
        if (isOpenModalExist) {
            this.modalService.dismissAll();
        }
        this.router.navigate(['preview-answer']);
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.form.invalid) {
            return;
        }
        const question = this.form.value;
        this.mockService.addNewQuestion(question);
        this.form.reset();
        this.formSubmitted = false;
    }

    get options() {
        return this.form.get("options") as FormArray;
    }

    ngAfterViewInit() {
        this.cdRef.detectChanges();
    }

}
