import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import HelloWorld from '../HelloWorld.vue'
import { useUserStore } from '@/stores/user'

describe('HelloWorld', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello World' } })
    expect(wrapper.text()).toContain('Hello World')
    expect(wrapper.findComponent({ name: 'UserDialog' }).exists()).toBe(true)
  })

  it('shows user name when use is set', () => {
    const { setUser } = useUserStore()
    setUser({ name: 'Douglas Silva', id: 'any-id' })
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello World' } })
    expect(wrapper.text()).toContain('Welcome Douglas')
    expect(wrapper.findComponent({ name: 'UserDialog' }).exists()).toBe(false)
  })
})
