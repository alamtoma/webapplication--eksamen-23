import type { Question, QuestionFormProps } from '@/features/types'
import { AnswerTypes, QuestionType } from '@/features/types'
import { createQuestion } from '@/features/createQuestion'
import { useState } from 'react'

    // src: https://chat.openai.com
    const QuestionForm = ({onClose}: QuestionFormProps) => {
        
    const [questionText, setQuestionText] = useState<string>("")
    const [answerType, setAnswerType] = useState<QuestionType>(QuestionType.TEXT)
    const [questions, setQuestions] = useState<Question[]>([])

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

            <button onClick={handleAddQuestion}>Add Question</button>
            <button onClick={onClose}>Close</button>
        </div>

        <div>
            <h2>List of all current questions:</h2>
                <ul>
                    {questions.map((question, index) => (
                        <li key={index}>{question.questionText} - {question.answerType}</li>
                    ))}
                </ul>
        </div>
        </>
                    
      )
}

export default QuestionForm;