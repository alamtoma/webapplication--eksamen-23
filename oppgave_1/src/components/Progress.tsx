"use client"
import { useState, useEffect } from "react"
import type { MouseEvent } from "react"
import { type Task } from "@/types"

type ProgressProps = {
 tasks: Task[];
 state: number;
 setState: (state: number) => void;
};


export default function Progress({ tasks, state, setState }: ProgressProps) {
 const next = (event: MouseEvent<HTMLButtonElement>) => {
   console.log("Next button clicked");
   console.log(event);
   if (state < tasks.length - 1) {
     setState(state + 1);
   }
 }
  
 const prev = (event: MouseEvent<HTMLButtonElement>) => {
   console.log("Prev button clicked");
   console.log(event);
   if (state > 0) {
     setState(state - 1);
   }
 }

 return (
  <footer className="mt-4 border-t-slate-300">
    {state > 0 && (
      <button onClick={prev} className="bg-purple-700 text-white">
        Forrige
      </button>
    )}
    {state < tasks.length - 1 && (
      <button onClick={next} className="bg-teal-700 text-white">
        Neste
      </button>
    )}
  </footer>
)
}