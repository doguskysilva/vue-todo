export enum Status {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Task {
  id: string
  title: string
  status: Status
  priority: Priority
  createdAt: Date
  completedAt: Date | null
}
