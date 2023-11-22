'use client'

import NavigationBar from "@/components/NavigationBar";
import PageButton from "@/components/PageButton";

export default function Templates() {

    const handleAddTemplateButton = () => {
        console.log("Logic for adding a template.")
    }

    // This function may not be needed!!
    // May not need to have a remove button
    const handleRemoveTemplateButton = () => {
        console.log("Logic for removing a template.")
    }

    // Did use ChatGPT to help me find a typo error (onclick vs onClick)
    // Incase that flags something:
    // src: https://chat.openai.com
    return (
        <>
        <NavigationBar />
        
        <div className="center-container">
            <PageButton onClick={handleAddTemplateButton} label="Add a new Template"/>
            <PageButton onClick={handleRemoveTemplateButton} label="Remove Template"/>
        </div>

        <p>Gods of death</p>
        </>
    )
}