let eventBus = new Vue()

Vue.component('main-list', {
    template: `
    <div>
        <create-task></create-task>
        <columns></columns>
    </div>
    `
})

Vue.component('columns', {

    template: `
        <div class="glob-list">
            <column class="column" :colIndex="colIndex1" :name="name" :col="columns[0]" @changeTask="changeTask"></column>
            <column class="column" :colIndex="colIndex2" :name="name2" :col="columns[1]" @changeTask="changeTask"></column>
            <column class="column" :colIndex="colIndex3" :name="name3" :col="columns[2]" @changeTask="changeTask"></column>
        </div>
    `,
    data() {
        return {
            temporalCol:[],
            columns:[
                [],
            [
            {
                name: 'gg',
                puncts: [
                    {
                        punct: 'fdfsdf',
                        done: false
                    },
                    {
                        punct: 'fdfsdf',
                        done: false
                    },
                    {
                        punct: 'fdfsdf',
                        done: false
                    },
                    {
                        punct: null,
                        done: false
                    },
                    {
                        punct: 'fdfsdf',
                        done: false
                    },
                ],
                id: 0
            }
        ],
                [],
            ],

            name: 'Начинаем',
            name2: 'Продолжаем',
            name3: 'Закончили',

            colIndex1: 0,
            colIndex2: 1,
            colIndex3: 2,
        }
    },
    methods: {
        changeTask(task) {
            (!this.columns[task.colIndex][task.index].puncts[task.indexPuncts].done)? this.columns[task.colIndex][task.index].puncts[task.indexPuncts].done = true : this.columns[task.colIndex][task.index].puncts[task.indexPuncts].done = false
            // console.log(this.columns[task.colIndex])
            let movingTask = this.columns[task.colIndex][task.index]
            console.log(this.columns[0].length)
            this.moveTask(movingTask,task)
        },
        moveTask(movingTask, task){
            let allLength = movingTask.puncts.length
            let doneLength = 0
            for (let i of movingTask.puncts){
                if (i.done===true){
                    doneLength++
                }
            }

            if (doneLength>allLength/2 && this.columns[task.colIndex] === this.columns[0]){
                let move = this.columns[task.colIndex].splice(task.index,1)
                this.columns[task.colIndex+1].push(...move)
            }
            if (doneLength===allLength){
                let move = this.columns[task.colIndex].splice(task.index,1)
                this.columns[task.colIndex+1].push(...move)
            }

        },

    },
// пора начинать делать переходы тасков на основании их заполненности
    mounted() {
        eventBus.$on('review-submitted', taskReview =>
            this.columns[0].push(taskReview))
    }
})

Vue.component('column', {
    props: {
        col: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        colIndex: {
            type: Number,
            required: true
        }
    },
    template: `
        <div>
            <p>{{name}}</p>
            <p>
               <div>
                <p v-if="!col.length">Нет тасков</p>
                
                  <ul @click="returnId">
                    <li
                    v-for="(pun, index) in col" 
                    class="taskBorder"
                    :key="pun.id"
                    >
                        <p>{{pun.name}}</p>
                        <p>{{pun.id}}</p>
                        <ul class="inUl">
                            <li 
                              v-for="prop, indexPuncts in pun.puncts"
                              v-if="prop.punct!==null"
                              >
                                <label :for="pun.id">
                                <input
                                    type="checkbox"
                                    :disabled="prop.done"
                                    :checked="prop.done"
                                    id="pun.id" 
                                    value="1"
                                    @change="changeTask(index, indexPuncts, colIndex)"
                                    >{{prop.punct}}<p>{{prop.done}}</p></label><br>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
           </p>
        </div>
    `,
    data() {
        return {
            checkdTask: [],
            count: null
        }
    },
    methods: {
        updateTask(index) {
            this.selectedTask = index
        },
        returnId() {
            // console.log(this.col)
        },
        changeTask(index, indexPuncts, colIndex){
            this.$emit('changeTask', {index, indexPuncts, colIndex})
        },
        pereborTasks() {
            for (let task of this.col) {
                for (let punc of task.puncts){
                    if (punc.done===false){
                        // console.log(punc.done)
                    }
                }
                let gg = task.puncts // let gg = Object.values(task.puncts).length

            }
            this.allowMove(this.count)
            this.count = null
        },
        allowMove(count) {
            return null
        },
    },
})

Vue.component('create-task', {
    template: `
        <div>
            <form class="task-form" @submit.prevent="onSubmit">
            <div class="container">
                <h3 class="logo">Создать заметку</h3>
                <p v-if="errors">
                    <b>Необходимое колличество пунктов от 3 до 5</b>
                </p>
                <div class="punct">
                    <label for="name" class="form-p">Название:</label>
                    <input required id="name" v-model="name" type="text">
                </div>
                <p>Пункты:</p>
                <div class="punct">
                    <label for="punct1" class="form-p">1:</label>
                    <input id="punct1" v-model="punct1" type="text"></div>
                <div class="punct">
                    <label for="punct2" class="form-p">2:</label>
                    <input id="punct2" v-model="punct2"  type="text"></div>
                <div class="punct">
                    <label for="punct3" class="form-p">3:</label>
                    <input id="punct3" v-model="punct3"  type="text"></div>
                <div class="punct">
                    <label for="punct4" class="form-p">4:</label>
                    <input id="punct4" v-model="punct4"  type="text"></div>
                <div class="punct">
                    <label for="punct5" class="form-p">5:</label>
                    <input id="punct5" v-model="punct5"  type="text"></div>
                <input type="submit" value="Добавить" class="btn">
            </div>
            </form>
        </div>
    `,
    data() {
        return {
            name: null,
            punct1: null,
            punct2: null,
            punct3: null,
            punct4: null,
            punct5: null,
            id: 1,
            countDone:0,
            errors: 0,
            checkLength: []
        }
    },
    methods: {
        onSubmit() {
            this.checkLength.push(
                this.punct1,
                this.punct2,
                this.punct3,
                this.punct4,
                this.punct5,
            )
            this.checkLength = this.checkLength.filter(Boolean);
            if (this.checkLength.length > 2) {
                let taskReview = {
                    name: this.name,

                    puncts: [
                        {
                            punct: this.punct1,
                            done: false
                        },
                        {
                            punct: this.punct2,
                            done: false
                        },
                        {
                            punct: this.punct3,
                            done: false
                        },
                        {
                            punct: this.punct4,
                            done: false
                        },
                        {
                            punct: this.punct5,
                            done: false
                        },
                    ],
                    id: this.id,
                    countDone: this.countDone
                }
                this.removeEmptyValues(taskReview.puncts)
                this.idIncrease()
                eventBus.$emit('review-submitted', taskReview)
                this.name = null
                this.punct1 = null
                this.punct2 = null
                this.punct3 = null
                this.punct4 = null
                this.punct5 = null
                this.clearCheckLength()

            } else {
                this.errors = 1
                this.clearCheckLength()
            }
        },
        idIncrease() {
            this.id++
        },
        clearCheckLength() {
            return this.checkLength = []
        },

        removeEmptyValues(arr) {
            for (let el of arr){
                if (el.punct===null){
                    // console.log(el)
                    arr.splice(arr.indexOf(el),1)
                }
            }
            return arr
        }
    }
})

let app = new Vue({
    el: '#app',
    methods: {

    }
})