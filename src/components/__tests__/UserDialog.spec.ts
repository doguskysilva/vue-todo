import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserDialog from '@/components/UserDialog.vue'

describe('UserDialog.vue', () => {
  it('renders the dialog when show is true', () => {
    const wrapper = mount(UserDialog, {
      props: { show: true },
    })
    expect(wrapper.find('.modal').exists()).toBe(true)
  })

  it('emits submit event with name when submit button is clicked', async () => {
    const wrapper = mount(UserDialog, {
      props: { show: true },
    })
    const input = wrapper.find('input')
    await input.setValue('Douglas Silva')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted().submit[0]).toEqual(['Douglas Silva'])
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(UserDialog, {
      props: { show: true },
    })
    await wrapper.find('.close').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})
