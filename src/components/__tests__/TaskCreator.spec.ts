import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCreator from '@/components/TaskCreator.vue'
import { Priority } from '@/domain/models/task'

describe('TaskCreator.vue', () => {
  it('emits the create event with the correct payload when the Add button is clicked', async () => {
    const wrapper = mount(TaskCreator)
    const titleTask = 'New Task'
    await wrapper.find('input').setValue(titleTask)
    await wrapper.find('select').setValue(Priority.High)
    await wrapper.find('#btnCreateTask').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('create')
    expect(wrapper.emitted('create')![0]).toEqual([{ title: titleTask, priority: Priority.High }])
  })

  it('clears the input and error message after adding a task', async () => {
    const wrapper = mount(TaskCreator)
    const titleTask = 'New Task'
    await wrapper.find('input').setValue(titleTask)
    await wrapper.find('#btnCreateTask').trigger('click')
    expect(wrapper.find('input').element.value).toBe('')
    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('displays an error message if the task title is empty and not emit the create event', async () => {
    const wrapper = mount(TaskCreator)
    await wrapper.find('#btnCreateTask').trigger('click')
    expect(wrapper.find('#error').text()).toBe('Task title is required')
    expect(wrapper.emitted('create')).toBeUndefined()
  })
})
