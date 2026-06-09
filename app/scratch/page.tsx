import TaskCard from "@/components/scratch/TaskCard";

const tasks = [
  {
    title: "Plan timer flow",
    project: "MVP",
    dueDate: "Today",
    timeSpentLabel: "45m",
    isPrimary: true,
  },
  {
    title: "Review daily insights",
    project: "Analytics",
    dueDate: "Tomorrow",
    timeSpentLabel: "20m",
  },
  {
    title: "Polish project setup",
    dueDate: "Friday",
    timeSpentLabel: "1h 10m",
  },
];

export default function ScratchPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto flex max-w-3xl flex-col gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Scratch
          </p>
          <h1 className="mt-2 text-3xl font-bold">Task card previews</h1>
        </div>

        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.title} {...task} />
          ))}
        </div>
      </section>
    </main>
  );
}
