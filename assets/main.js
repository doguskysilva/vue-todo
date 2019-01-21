Vue.component('todo-item', {
    props: {
        task: {}
    },
    directives: {
        focus: {
          inserted: function (el) {
            el.focus()
          }
        }
    },
    data() {
        return {
            is_edit: false,
            old_text: '',
            new_text: ''
        }
    },
    methods: {
        edit () {
            this.is_edit = true
            this.new_text = this.task.text
            this.$refs.task_edit.focus()
        },
        cancel () {
            this.is_edit = false
        },
        save () {
            this.task.text = this.new_text
            this.is_edit = false
            this.$emit('update')
        },
        remove () {
            this.$emit('remove', this.task.id)
        }
    },
    template: '#todo-item'
});

var app = new Vue({
    el: '#app',
    data() {
        return {
            task: {
                id: '',
                text: '',
            },
            tasks: [],
            apple: 'akssks'
        }
    },
    methods: {
        remove (id) {
            this.tasks = this.tasks.filter(x => x.id !== id)
            this.sync_storage()
        },
        update () {
            this.sync_storage()
        },
        save () {
            if (!this.task.text == '') {
                let id = Math.random().toString(36).substring(7)
                this.task.id = id
                this.tasks.push(Object.assign({}, this.task))

                this.task.id = ''
                this.task.text = ''

                this.sync_storage()
            }
        },
        sync_storage () {
            localStorage.setItem('tasks', JSON.stringify(this.tasks))
        }
    },
    mounted() {
        let tasks = localStorage.getItem('tasks')
        if (tasks == null) {
            localStorage.setItem('tasks', JSON.stringify([]))
        } else {
            this.tasks = JSON.parse(tasks)
        }
    },
});