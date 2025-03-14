Vue.component('todo-item', {
  props: {
    task: {},
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
  data() {
    return {
      is_edit: false,
      old_text: '',
      new_text: '',
    }
  },
  methods: {
    edit() {
      this.is_edit = true
      this.new_text = this.task.text
      this.$refs.task_edit.focus()
    },
    cancel() {
      this.is_edit = false
    },
    save() {
      //this.task.text = this.new_text
      this.is_edit = false
      this.$emit('update')
    },
    remove() {
      this.$emit('remove', this.task.id)
    },
  },
  template: '#todo-item',
})

var app = new Vue({
  el: '#app',
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
    },
  },
  data() {
    return {
      user: {
        name: null,
        active: false,
      },
      task: {
        id: '',
        text: '',
      },
      tasks: [],
    }
  },
  methods: {
    createAccount() {
      if (!this.user.name) {
        this.user.active = true
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },
    remove(id) {
      this.tasks = this.tasks.filter((x) => x.id !== id)
      this.sync_storage()
    },
    update() {
      this.sync_storage()
    },
    save() {
      if (!this.task.text == '') {
        let id = Math.random().toString(36).substring(7)
        this.task.id = id
        this.tasks.push(Object.assign({}, this.task))

        this.task.id = ''
        this.task.text = ''

        this.sync_storage()
      }
    },
    sync_storage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
  },
  mounted() {
    let user = localStorage.getItem('user')
    let tasks = localStorage.getItem('tasks')

    if (user) {
      this.user = JSON.parse(user)
    }

    this.tasks = !tasks ? JSON.parse(tasks) : []
  },
})

console.log(app)
