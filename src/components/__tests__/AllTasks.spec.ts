import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AllTasks from '@/components/AllTasks.vue'
import { useTaskStore } from '@/stores/task'
import { generateEntities } from '@/test-utils/generators'
import type { Task } from '@/domain/models/task'

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
})
