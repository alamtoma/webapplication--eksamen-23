'use client'

import NavigationBar from "@/components/NavigationBar"
import PageButton from "@/components/PageButton"
import QuestionForm from "@/components/QuestionForm"
import { useState } from "react"

export default function Questions() {

    const [isQuestionFormVisible, setIsQuestionFormVisible] = useState(false)

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

        // Will fix button/text position
        <>
        <NavigationBar />

        <div className="center-container">
            <PageButton onClick={handleAddQuestionButton} label="Add a new Question"/>
            <PageButton onClick={handleRemoveQuestionButton} label="Remove Question"/>
        </div>

        {isQuestionFormVisible && (
            <div className="center-container">
                <QuestionForm onClose={handleCloseQuestionForm}/>
            </div>
        )}
    
        </>
    )
}