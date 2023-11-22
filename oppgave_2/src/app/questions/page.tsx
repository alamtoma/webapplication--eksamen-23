'use client'

import NavigationBar from "@/components/NavigationBar";
import PageButton from "@/components/PageButton";

export default function Questions() {

    const handleAddQuestionButton = () => {
        console.log("Logic for adding a question.")
    }

    // This function may not be needed!!
    // May not need to have a remove button
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
        
        <p>Love apples.</p>
        </>
    )
}