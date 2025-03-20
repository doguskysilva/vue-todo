import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AllTasks from '@/components/AllTasks.vue'
import { useTaskStore } from '@/stores/task'
import { generateTask } from '@/test-utils/generators'
import { Status } from '@/domain/models/task'

describe('AllTasks.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useTaskStore().tasks = []
  })

  it('renders no tasks initially', () => {
    const wrapper = mount(AllTasks)
    const store = useTaskStore()
    expect(store.tasks).toHaveLength(0)
    expect(wrapper.findAll('li')).toHaveLength(0)
  })

  it('renders tasks from the store', () => {
    const store = useTaskStore()
    const task = generateTask({ title: 'Test Task' })
    store.tasks = [task]
    const wrapper = mount(AllTasks)
    expect(wrapper.text()).toContain(task.title)
  })

  it('adds a task when the enter key is pressed', async () => {
    const wrapper = mount(AllTasks)
    const input = wrapper.find('input')
    const titleTask = 'New Task'
    await input.setValue(titleTask)
    await input.trigger('keyup.enter')
    const store = useTaskStore()
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0].title).toBe(titleTask)
  })

  it('clears the input after adding a task', async () => {
    const wrapper = mount(AllTasks)
    const input = wrapper.find('input')
    const titleTask = 'New Task'
    await input.setValue(titleTask)
    await input.trigger('keyup.enter')
    expect(input.element.value).toBe('')
  })

  it('completes a task when the done button is clicked', async () => {
    const store = useTaskStore()
    const task = generateTask({ title: 'Test Task' })
    store.tasks = [task]
    const wrapper = mount(AllTasks)
    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)
    expect(store.tasks[0].status).toBe(Status.Completed)
    expect(wrapper.find('span').classes()).toContain('completed')
  })

  it('removes a task when the remove button is clicked', async () => {
    const store = useTaskStore()
    const task = generateTask({ title: 'Test Task' })
    store.tasks = [task]
    const wrapper = mount(AllTasks)
    const button = wrapper.find('#btnRemoveTask')
    await button.trigger('click')
    expect(store.tasks).toHaveLength(0)
    expect(wrapper.findAll('li')).toHaveLength(0)
  })

  it('sorts tasks correctly', () => {
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    const store = useTaskStore()
    store.tasks = [
      generateTask({
        title: 'Task 1',
        status: Status.Completed,
        completedAt: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000),
      }),
      generateTask({ title: 'Task 2' }),
      generateTask({ title: 'Task 3' }),
      generateTask({
        title: 'Task 4',
        status: Status.Completed,
        completedAt: new Date(currentDate.getTime() - 60 * 60 * 1000),
      }),
    ]
    const wrapper = mount(AllTasks)
    const taskTitles = wrapper.findAll('li span').map((span) => span.text())
    expect(taskTitles).toEqual(['Task 2', 'Task 3', 'Task 1'])
  })
})
