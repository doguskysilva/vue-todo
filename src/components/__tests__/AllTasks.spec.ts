import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AllTasks from '@/components/AllTasks.vue'
import { useTaskStore } from '@/stores/task'
import { generateEntities } from '@/test-utils/generators'
import { Status, type Task } from '@/domain/models/task'

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
    store.tasks = generateEntities<Task>(1, 'Task', { title: 'Test Task' })
    const wrapper = mount(AllTasks)
    expect(wrapper.text()).toContain('Test Task')
  })

  it('renders a task as completed if its status is completed', () => {
    const store = useTaskStore()
    store.tasks = generateEntities<Task>(1, 'Task', {
      title: 'Test Task',
      status: Status.Completed,
    })
    const wrapper = mount(AllTasks)
    expect(wrapper.find('span').classes()).toContain('completed')
  })

  it('adds a task when the enter key is pressed', async () => {
    const wrapper = mount(AllTasks)
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await input.trigger('keyup.enter')
    const store = useTaskStore()
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0].title).toBe('New Task')
  })

  it('clears the input after adding a task', async () => {
    const wrapper = mount(AllTasks)
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await input.trigger('keyup.enter')
    expect(input.element.value).toBe('')
  })

  it('completes a task when the done button is clicked', async () => {
    const store = useTaskStore()
    store.tasks = generateEntities<Task>(1, 'Task', { title: 'Test Task' })
    const wrapper = mount(AllTasks)
    const button = wrapper.find('#btnCompleteTask')
    await button.trigger('click')
    expect(store.tasks[0].status).toBe('Completed')
    expect(wrapper.find('span').classes()).toContain('completed')
  })

  it('removes a task when the remove button is clicked', async () => {
    const store = useTaskStore()
    store.tasks = generateEntities<Task>(1, 'Task', { title: 'Test Task' })
    const wrapper = mount(AllTasks)
    const button = wrapper.find('#btnRemoveTask')
    await button.trigger('click')
    expect(store.tasks).toHaveLength(0)
    expect(wrapper.findAll('li')).toHaveLength(0)
  })
})
