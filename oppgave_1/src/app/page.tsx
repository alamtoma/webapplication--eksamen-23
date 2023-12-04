"use client"
import Answer from "@/components/Answer";
import Header from "@/components/Header";
import Progress from "@/components/Progress";
import Tasks from "@/components/Tasks";
import { useState, useEffect } from "react";
import { type Task } from "@/types";


export default function Home() {

 const [tasks, setTasks] = useState<Task[]>([]);
 const [state, setState] = useState(0);

 useEffect(() => {
   fetchTasks();
 }, []);

 async function fetchTasks() {
   const response = await fetch(`http://localhost:3000/api/restapi?count=5`, {
     method: "get",
   });
   const result: any = await response.json();
   if (result.success) {
     setTasks(result.data);
   }  else {
    console.error(result.error);
  }
 }

 const next = () => {
  if (state < tasks.length - 1) {
    setState(state + 1);
  }
};

 const currentTask = tasks[state];
 
 return (
  <main>
    <Header taskNumber={state + 1} />
    <Tasks tasks={tasks} state={state}>
    <Answer currentTask={currentTask} next={next} tasks={tasks} state={state} />
    </Tasks>
    <Progress tasks={tasks} state={state} setState={setState} />
  </main>
);}