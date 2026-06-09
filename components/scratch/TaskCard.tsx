// Define shape of data for each task card

type TaskCardProps = {
    title: string;
    project?: string;
    dueDate: string;
    timeSpentLabel: string;
    isPrimary?: boolean;
};

export default function TaskCard({ title, project, dueDate, timeSpentLabel, isPrimary = false, }: TaskCardProps) {
    return (
        // Creates one task card row in the task list (all content within article tags)
        <article className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* Creates section of card that displays task's title, optional project, due date and time spent */}
            <div>
                {/* Creates top row with task title and optional project label */}
                <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-slate-950">{title}</h2>
                    {project && ( // Only show project label if associated project exists inside task.
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                            {project}
                        </span>
                    )}
                </div>

                {/* Creates section for due date and time spent */}
                <p className="mt-1 text-sm text-slate-500">
                    {dueDate} · {timeSpentLabel} logged
                </p>
            </div>

            {/* Creates Start button on right hand side of task card */}
            <button type="button" className={ isPrimary ? "rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white" : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"}>
                ▶ Start
            </button>
        </article>
    )
}