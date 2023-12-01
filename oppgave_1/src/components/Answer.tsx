import { Task } from "@/types";
import { FormEvent, useState } from "react";
import React, { MouseEvent } from 'react';

export default function Answer({ currentTask, next }: { currentTask: Task, next: () => void }) {
  const [answer, setAnswer] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sendButtonVisible, setSendButtonVisible] = useState(true);

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const correctAnswer = checkAnswer(currentTask);
    console.log('currentTask', currentTask);
    console.log('userAnswer', answer);
    console.log('correctAnswer', correctAnswer);
    const isAnswerCorrect = correctAnswer === answer;
    console.log('isAnswerCorrect', isAnswerCorrect);
    setIsCorrect(isAnswerCorrect);

    // Hide the "Send" button when the correct answer is sent
    setSendButtonVisible(!isAnswerCorrect);
  }

  const showNextTask = () => {
    next();
    // Hide the "Good job!" message and the "Show next task" button
    setIsCorrect(false);
    // Show the "Send" button when moving to the next task
    setSendButtonVisible(true);
  }

  const update = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setAnswer(numericValue);
    } else {
      console.error('Invalid input: ' + value);
    }
  }

  // Function to check the answer based on the task type
  const checkAnswer = (task: Task): number => {
    const [num1, num2] = task.data.split("|").map(Number);
    switch (task.type) {
      case "add":
        return num1 + num2;
      case "subtract":
        return num1 - num2;
      case "multiply":
        return num1 * num2;
      case "divide":
        return num1 / num2;
      default:
        throw new Error(`Unknown operation: ${task.type}`);
    }
  }

  return (
    <div>
      <label htmlFor="answer">Svar</label>
      <input
        name="answer"
        type="text"
        placeholder="Sett svar her"
        onInput={update}
      />
      {isCorrect && <div>Bra jobbet!</div>}
      {sendButtonVisible && <button onClick={send}>Send</button>}
      {isCorrect && <button onClick={showNextTask}>Show next task</button>}
    </div>
  )
}