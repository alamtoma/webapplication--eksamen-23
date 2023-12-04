'use client'

import NavigationBar from "@/components/NavigationBar"
import PageButton from "@/components/PageButton"
import QuestionForm from "@/components/QuestionForm"
import type { Question } from "@/features/types"
import { useState } from "react"

export default function Questions() {

    const [isQuestionFormVisible, setIsQuestionFormVisible] = useState(false)
    const [questions, setQuestions] = useState<Question[]>([])

    const handleAddQuestionButton = () => {
        setIsQuestionFormVisible(true)
    }
    
    const handleCloseQuestionForm = () => {
        setIsQuestionFormVisible(false)
    }

    // This function may not be needed!!
    // This function may not be needed!!
    const handleRemoveQuestionButton = () => {
        console.log("Logic for removing a question.")
    }

    return (
        <>
        <NavigationBar />

        <div className="center-container">
            <PageButton onClick={handleAddQuestionButton} label="Add a new Question"/>
            <PageButton onClick={handleRemoveQuestionButton} label="Remove Question"/>
        </div>

        {isQuestionFormVisible && (
            <div className="center-container">
                <QuestionForm onClose={handleCloseQuestionForm} setQuestions={setQuestions} questions={questions}/>
            </div>
        )}

        <div className="center-container">
            <h2>List of all current questions:</h2>
        </div>

        <div className="center-container">
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <p>{question.questionText}</p>
                    </li>
                ))}
            </ul>
        </div>

        </>
    )
}