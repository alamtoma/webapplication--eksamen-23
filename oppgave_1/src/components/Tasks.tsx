import { type ReactNode } from "react";
import { type Task } from "@/types";

type TasksProps = {
 tasks: Task[];
 state: number;
 children: ReactNode;
};

export default function Tasks({ tasks, state, children }: TasksProps) {
 const task = tasks[state];
 return (
  <section>
    {task && (
      <article key={task.id}>
        <p>{task.type}</p>
        <h3>{task.text}</h3>
        <p>{task.data}</p>
      </article>
    )}
    {children}
  </section>
 );
}