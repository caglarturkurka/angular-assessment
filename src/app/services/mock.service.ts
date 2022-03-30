import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
// **** TEST 6 ***/
@Injectable({
    providedIn: 'root'
})
export class MockService {

    public questions: any[] = [];
    private updatedQuestions: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    allQuestions() {
        return this.updatedQuestions.asObservable();
    }

    addNewQuestion(question: any) {
        const newQuestion: any = {...question, id: this.genID(7)};
        this.questions.push(newQuestion);
        const updatedQuestions = [...this.questions];
        this.updatedQuestions.next(updatedQuestions);
    }

    genID(length: number) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    deleteQuestion(id: any) {
        const index = this.questions.findIndex(x => x.id == id);
        this.questions.splice(index, 1);
        this.updatedQuestions.next([...this.questions]);
    }

}
