import { Task } from "@/types";
import { FormEvent, useState } from "react";
import React, { MouseEvent } from 'react';

export default function Answer({ currentTask, next, tasks, state }: { currentTask: Task, next: () => void, tasks: Task[], state: number }) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false); 
  const [answers, setAnswers] = useState(new Map<Task["id"], { attempts: number; answer: number, isCorrect: boolean }>());
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAnswerButton, setShowAnswerButton] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [wrongAnswersByType, setWrongAnswersByType] = useState<{ [key: string]: number }>({});
  const [allTasksAttempted, setAllTasksAttempted] = useState(false);

  const send = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (answer !== null) {
      const answerDetails = answers.get(currentTask.id) || { attempts: 0, answer: null, isCorrect: false };
      const attempts = answerDetails.attempts + 1;
      let isAnswerCorrect = false;

      if (attempts <= 3) {
        const correctAnswer = checkAnswer(currentTask);
        isAnswerCorrect = correctAnswer === answer;
        setAnswers(new Map(answers.set(currentTask.id, { attempts, answer, isCorrect: isAnswerCorrect })));
        setIsCorrect(isAnswerCorrect); // Set isCorrect state here
        if (isAnswerCorrect) {
          setTotalPoints(prevPoints => prevPoints + 1);
        } else {
          setWrongAnswersByType(prev => {
            const currentCount = prev[currentTask.type] || 0;
            const newWrongAnswersByType = { ...prev, [currentTask.type]: currentCount + 1 };
            console.log('Updated wrong answers by type:', newWrongAnswersByType);
            return newWrongAnswersByType;
          });
        }
      }

      if (attempts === 3 || isAnswerCorrect) {
        setShowAnswerButton(!isAnswerCorrect); 
        if (state === tasks.length - 1) {
          setAllTasksAttempted(true);
        }
      }
    }
  }

  const showCorrectAnswer = () => {
    setShowAnswer(true);
    setShowAnswerButton(false);
  }

  const showNextTask = () => {
    next();
    setShowAnswer(false);
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

  const operationToPractice = () => {
    console.log('Calculating operation to practice from:', wrongAnswersByType);
    let maxCount = 0;
    let operation = '';
    for (const [type, count] of Object.entries(wrongAnswersByType)) {
      if (count > maxCount) {
        maxCount = count;
        operation = type;
      }
    }
    console.log('Operation to practice:', operation);
    return operation;
  };

//https://chat.openai.com/
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
      {currentTask && (
        <p>
          {answers.get(currentTask.id)?.attempts === 3 
            ? 'No more attempts' 
            : `${answers.get(currentTask.id)?.attempts || 0} out of 3 attempts`
          }
        </p>
      )}

      {currentTask && answers.get(currentTask.id)?.isCorrect && <div>Bra jobbet!</div>}
      {showAnswer && <p>The correct answer is {checkAnswer(currentTask)}</p>}
      {state === tasks.length - 1 && allTasksAttempted && (
  <p>
    Total Points: {totalPoints}
    <br/>
    You should practice more: {operationToPractice()}
    <br/>
    <button onClick={() => window.location.reload()}>Start again</button>
  </p>
  
)}
      {!showAnswerButton && !showAnswer && currentTask && !answers.get(currentTask.id)?.isCorrect && <button onClick={send}>Send</button>}
      {!isCorrect && showAnswerButton && <button onClick={showCorrectAnswer}>Show the answer</button>}
      {!isCorrect && showAnswer && state < tasks.length - 1 && <button onClick={showNextTask}>Show next task</button>}
    </div>
  )
}