import { useMemo, useState } from "react";
import useTasks from "../hooks/useTasks";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import Column from "./Column";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

const columns = [
  {
    status: "todo",
    title: "To Do",
  },
  {
    status: "doing",
    title: "Doing",
  },
  {
    status: "done",
    title: "Done",
  },
];

export default function Board() {
  const {
    tasks,
    loading,
    error,
    moveTask,
    deleteTask,
    reloadTasks,
  } = useTasks();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("all");
  const [assignee, setAssignee] = useState("all");

  const assignees = useMemo(() => {
    return [...new Set(tasks.map((task) => task.assignee))].sort();
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        !searchValue ||
        task.title.toLowerCase().includes(searchValue) ||
        task.description.toLowerCase().includes(searchValue) ||
        task.assignee.toLowerCase().includes(searchValue);

      const matchesPriority =
        priority === "all" || task.priority === priority;

      const matchesAssignee =
        assignee === "all" || task.assignee === assignee;

      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [tasks, search, priority, assignee]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={reloadTasks} />;
  }

  return (
    <div className="board-container">
      <div className="board-toolbar">
        <SearchBar value={search} onChange={setSearch} />

        <FilterBar
          priority={priority}
          assignee={assignee}
          onPriorityChange={setPriority}
          onAssigneeChange={setAssignee}
          assignees={assignees}
        />
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          title={tasks.length === 0 ? "No tasks yet" : "No matching tasks"}
          message={
            tasks.length === 0
              ? "Create your first task to start using SyncBoard."
              : "Try changing your search or filter settings."
          }
          showCreateButton={tasks.length === 0}
        />
      ) : (
        <div className="kanban-board">
          {columns.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.status
            );

            return (
              <Column
                key={column.status}
                title={column.title}
                status={column.status}
                tasks={columnTasks}
                onMove={moveTask}
                onDelete={deleteTask}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}