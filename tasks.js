import { mockTasks } from "../data/mockTasks";

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getTasks() {
  await delay(500);

  return [...mockTasks];
}

export async function getTaskById(id) {
  await delay(300);

  const task = mockTasks.find((item) => item.id === id);

  if (!task) {
    throw new Error("Task not found.");
  }

  return { ...task };
}