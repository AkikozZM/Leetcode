const TaskStatus = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};
const Priority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

class User {
  constructor(id, name, email) {
    (this.id = id),
      (this.name = name),
      (this.email = email),
      (this.taskHistory = []);
  }
  addToHistory(task) {
    this.taskHistory.push(task);
  }
  getTaskHistory() {
    return [...this.taskHistory];
  }
}

class TaskManager {
  constructor() {
    if (TaskManager.instance) {
      return TaskManager.instance;
    }
    this.tasks = new Map();
    this.users = new Map(); // id --- user
    this.taskIDCounter = 1;
    this.userIDCounter = 1;
    TaskManager.instance = this;
  }
  static getInstance() {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }
  createUser(name, email) {}
  getUser(id) {
    return this.users.get(id);
  }
  createTask(title, description, due, priority, creator) {}
  updateTask(taskID, updates) {}
  deleteTask(taskID) {}
  assignTask(taskID, userID) {}
  completeTask(taskID) {}
  searchTasks(query) {}
  filterTasks({ status, priority, assignedTo, dueBefore, dueAfter }) {}
}

class Task {
  constructor(
    id,
    title,
    description,
    due,
    priority,
    status,
    creator,
    assignedTo
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.due = new Date(due);
    this.priority = priority;
    this.status = status; // pending, inProgress, completed
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.creator = creator;
    this.assignedTo = assignedTo;
    this.reminders = [];
  }
  updateStatus(newStatus) {
    this.status = newStatus;
    this.updatedAt = new Date();
  }
  assignTo(user) {
    this.assignTo = user;
    this.updatedAt = new Date();
  }
  addReminder(reminderDate) {
    this.reminders.push(new Date(reminderDate));
    this.reminders.sort((a, b) => a - b);
  }
}
