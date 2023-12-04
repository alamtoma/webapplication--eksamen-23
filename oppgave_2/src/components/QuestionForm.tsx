import type { Question, QuestionFormProps } from '@/features/types'
import { AnswerTypes, QuestionType } from '@/features/types'
import { createQuestion } from '@/features/createQuestion'
import { useState } from 'react'
import PageButton from './PageButton'

    // src: https://chat.openai.com
    const QuestionForm = ({onClose, setQuestions}: QuestionFormProps) => {
        
    const [questionText, setQuestionText] = useState<string>("")
    const [answerType, setAnswerType] = useState<QuestionType>(QuestionType.TEXT)

    const handleAddQuestion = () => {
        try {
            const newQuestion: Question = createQuestion(questionText, answerType)
            
            // Working on this part 
            setQuestions((prevQuestions) => [...prevQuestions, newQuestion])
            setQuestionText("")
            setAnswerType(QuestionType.TEXT)

            onClose()

        } catch (error) {
            console.error()
        }
    }

    // Got React.ChangeEvent<HTMLInputElement> from GPT (I am confused), think we can change to just (e.target.value) & (e) like in lessons iirc.
    const handleChangeQuestionText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionText(e.target.value);
      }
    
      const handleChangeAnswerType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAnswerType(e.target.value as QuestionType);
      }

      return (
        <>
        <form>
            <div>
                <label>
                    <h2>Type your question:</h2>
                    <input type="text" value={questionText} onChange={handleChangeQuestionText}/>
                </label>

                <label>
                    <h2>Choose your type of answer:</h2>
                    <select value={answerType} onChange={handleChangeAnswerType}>
            
                    {AnswerTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
            ))}
                    </select>
                </label>
            </div>
            
            <div>
                <PageButton onClick={handleAddQuestion} label="Confirm question"/>
                <PageButton onClick={onClose} label="Close"/>
            </div>
        </form>
        
        </>
                    
      )
}

export default QuestionForm;