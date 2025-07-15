import Alpine from '../libs/alpinejs@3.14.9.esm.min.js'
import { getTaskList, createTask, updateTask, deleteTask } from '../services/index.js'

export default class Index {
  constructor() {
    localforage.config({
      name: 'todos',
      driver: localforage.INDEXEDDB,
      storeName: 'todos',
      version: 2,
      size: 4980736,
      description: 'todos'
    })
    this.initAlpine()
  }

  async initAlpine() {
    Alpine.store('common', {
      loadingShow: false,
    })
    Alpine.data('headerData', () => ({
      handleSearch(e) {
        if(e.target.value) {
          console.log(e.target.value)
        }
      }
    }))
    Alpine.data('mainData', () => ({
      async init() {
        await this.getTaskList()
        if(this.taskList.length) {
          this.status = 'success'
        } else {
          this.status = 'empty'
        }
      },
      status: 'init',
      get emptyText() {
        return statusMap(this.status)
      },
      taskList: [],
      taskCount: 0,
      page: 0,
      limit: 20,
      clickAddTaskButton() {
        document.querySelector('section[is="fd-task-editor"]').open()
      },
      clickTask(e) {
        const taskId = e.target.closest('li').dataset.taskId
        const task = this.taskList.find(task => task.id === taskId)
        this.openTaskEditor({ task })
      },
      openTaskEditor({ task }) {
        document.querySelector('section[is="fd-task-editor"]').open({ task })
      },
      closeTaskEditor() {
        document.querySelector('section[is="fd-task-editor"]').close()
      },
      changeDate(e) {
        console.log(e.detail)
      },
      changePage(page) {
        this.page = page
        this.getTaskList()
      },
      async changeTaskStatus(e) {
        const taskId = e.target.closest('li').dataset.taskId
        const status = e.target.checked ? 'completed' : 'pending'
        if(status === 'pending') {
          if(!confirm('确定取消已完成的任务状态吗？')) {
            e.target.checked = true
            return
          }
        }
        this.$store.common.loadingShow = true
        await updateTask(taskId, {
          status
        })
        this.$store.common.loadingShow = false
        this.getTaskList()
      },
      async getTaskList() {
        this.taskList = []
        this.status = 'loading'
        try {
          const taskList = await getTaskList({ page: this.page, limit: this.limit })
          this.taskList = taskList.sort((a, b) => b.createdAt - a.createdAt).sort((a, b) => a.status === 'completed' ? 1 : -1)
          this.taskCount = taskList.length || 1 // 如果没有数据，前端显示1页
          this.status = 'success'
        } catch(error) {
          this.status = 'error'
        }
      },
      async submitTask(e) {
        this.$store.common.loadingShow = true
        if(e.detail.id) {
          await updateTask(e.detail.id, {
            name: e.detail.name,
            description: e.detail.description
          })
        } else {
          await createTask({
            name: e.detail.name,
            description: e.detail.description
          })
        }
        this.$store.common.loadingShow = false
        this.getTaskList()
        this.closeTaskEditor()
      },
      async deleteTask(e) {
        if(!confirm('确定删除任务吗？')) {
          return
        }
        this.$store.common.loadingShow = true
        await deleteTask(e.detail.id)
        this.$store.common.loadingShow = false
        this.getTaskList()
        this.closeTaskEditor()
      }
    }))
    Alpine.start()
  }
}

new Index()