export async function getTaskList({ page = 0, limit = 20 } = {}) {
  const taskList = []
  await localforage.iterate((value, key) => {
    value.id = key
    taskList.push(value)
  })
  return taskList.slice(page * limit, (page + 1) * limit)
}

export async function createTask({ name, description = '', status = 'pending' }) {
  const now = Date.now()
  const task = { name, description, status, createdAt: now, updatedAt: now }
  await localforage.setItem(now + '', task)
  return task
}

export async function updateTask(taskId, params = {}) {
  const task = await localforage.getItem(taskId)
  for(const key in params) {
    if(params[key]) {
      task[key] = params[key]
    }
  }
  task.updatedAt = Date.now()
  await localforage.setItem(taskId, task)
  return task
}

export async function deleteTask(taskId) {
  const task = await localforage.getItem(taskId)
  await localforage.removeItem(taskId)
  return task
}