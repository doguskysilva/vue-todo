import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import { Status } from '@/domain/models/task'
import { generateTask } from '@/test-utils/generators'

describe('TaskItem.vue', () => {
  it('renders the task title', () => {
    const task = generateTask()
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    expect(wrapper.text()).toContain('Test Task')
  })

  it('emits the complete event when the checkbox is checked', async () => {
    const task = generateTask()
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    // Find the checkbox element and check it
    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setValue(true)
    expect(wrapper.emitted()).toHaveProperty('complete')
    expect(wrapper.emitted('complete')![0]).toEqual([task])
  })

  it('emits the remove event when the remove button is clicked', async () => {
    const task = generateTask()
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    await wrapper.find('#btnRemoveTask').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('remove')
    expect(wrapper.emitted('remove')![0]).toEqual([task])
  })

  it('applies the completed class if the task is completed', () => {
    const task = generateTask({ status: Status.Completed, completedAt: new Date() })
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    expect(wrapper.find('span').classes()).toContain('completed')
  })

  it('does not show the remove button if the task is completed', () => {
    const task = generateTask({ status: Status.Completed, completedAt: new Date() })
    const wrapper = mount(TaskItem, {
      props: { task },
    })
    expect(wrapper.find('#btnRemoveTask').exists()).toBe(false)
  })
})
