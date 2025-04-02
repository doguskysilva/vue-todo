import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserDialog from '../UserDialog.vue'

describe('UserDialog.vue', () => {
  it('should not emit submit event when name is empty', async () => {
    const wrapper = mount(UserDialog)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('submit')).toBeFalsy()
    expect(wrapper.text()).toContain('Please enter your name before continuing')
  })

  it('should emit submit event with name when submitted', async () => {
    const wrapper = mount(UserDialog)
    const name = 'John Doe'
    await wrapper.find('input').setValue(name)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('submit')?.[0]).toEqual([name])
  })

  it('should show error message when trying to submit empty name', async () => {
    const wrapper = mount(UserDialog)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.text-red-600').exists()).toBe(true)
  })

  it('should not close the dialog when name is empty and cancel button is clicked', async () => {
    const wrapper = mount(UserDialog)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeFalsy()
    expect(wrapper.text()).toContain('Please enter your name before continuing')
  })

  it('should close the dialog when name is provided and cancel button is clicked', async () => {
    const wrapper = mount(UserDialog)
    const name = 'John Doe'
    await wrapper.find('input').setValue(name)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
