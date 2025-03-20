import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCreator from '@/components/TaskCreator.vue'
import { Priority } from '@/domain/models/task'

describe('TaskCreator.vue', () => {
  it('emits the create event with the correct payload when enter is pressed', async () => {
    const wrapper = mount(TaskCreator)
    const titleTask = 'New Task'
    const input = wrapper.find('input')
    await input.setValue(titleTask)

    // Click the High priority button
    const priorityButtons = wrapper.findAll('button')
    const highPriorityButton = priorityButtons.find((button) => button.text() === Priority.High)
    await highPriorityButton?.trigger('click')

    await input.trigger('keyup.enter')
    expect(wrapper.emitted()).toHaveProperty('create')
    expect(wrapper.emitted('create')![0]).toEqual([{ title: titleTask, priority: Priority.High }])
  })

  it('sets Low priority by default', () => {
    const wrapper = mount(TaskCreator)
    const lowPriorityButton = wrapper
      .findAll('button')
      .find((button) => button.text() === Priority.Low)
    expect(lowPriorityButton?.classes()).toContain('bg-indigo-600')
  })

  it('updates priority when clicking priority buttons', async () => {
    const wrapper = mount(TaskCreator)
    const mediumPriorityButton = wrapper
      .findAll('button')
      .find((button) => button.text() === Priority.Medium)

    await mediumPriorityButton?.trigger('click')
    expect(mediumPriorityButton?.classes()).toContain('bg-indigo-600')
  })

  it('clears the input and error message after adding a task', async () => {
    const wrapper = mount(TaskCreator)
    const input = wrapper.find('input')
    await input.setValue('New Task')
    await input.trigger('keyup.enter')
    expect(input.element.value).toBe('')
    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('displays an error message if the task title is empty', async () => {
    const wrapper = mount(TaskCreator)
    const input = wrapper.find('input')
    await input.trigger('keyup.enter')
    expect(wrapper.find('#error').text()).toBe('Task title is required')
    expect(wrapper.emitted('create')).toBeUndefined()
  })
})
