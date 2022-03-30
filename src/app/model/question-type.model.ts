export interface IQuestionType {
    id?: string;
    name?: string;



    
}

export class QuestionType implements IQuestionType {
    constructor(public id?: string,
                public name?: string) {
    }
}
