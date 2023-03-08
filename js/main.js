let eventBus = new Vue()

Vue.component('main-list',{
    template:`
    <create-task></create-task>
    `
})

Vue.component('columns',{
    template:`
        
    `
})

Vue.component('tasks-card', {
    template:`

<div>
    <div>
    <p v-if="!tasks.length">Нет тасков</p>
    
        <ul>
        <li v-for="task in tasks" class="taskBorder">
            <p>{{task.name}}</p>
           
            <ul class="inUl">
                <li v-for="prop in task">
                    <label v-if="prop!=task.name" for="punct"><input type="checkbox" id="punct" value="1">{{prop}}</label><br>
                </li>
            </ul>
            
        </li>
        </ul>
    </div>
    
</div>
    `,

    data() {
        return {
            tasks: [],
        };
    },

    methods: {

    },

    mounted(){
        eventBus.$on('review-submitted',taskReview =>
            this.tasks.push(taskReview))
    }
})

Vue.component('create-task',{
    template: `
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
                <input type="submit" value="Добавить" class="btn"></input>
            </div>
        </form>
    `,
    data(){
        return{
            name: null,
            punct1: null,
            punct2: null,
            punct3: null,
            punct4: null,
            punct5: null,
            errors: 0,
            checkLength: []
        }
    },
    methods:{
        onSubmit(){

            this.checkLength.push(
                this.punct1,
                this.punct2,
                this.punct3,
                this.punct4,
                this.punct5,
                )
            this.checkLength = this.checkLength.filter(Boolean);
            console.log(this.checkLength)
            if (this.checkLength.length>2){
                let taskReview={
                    name: this.name,
                    punct1: this.punct1,
                    punct2: this.punct2,
                    punct3: this.punct3,
                    punct4: this.punct4,
                    punct5: this.punct5,
                }
                this.removeEmptyValues(taskReview)
                console.log(taskReview)
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

        clearCheckLength(){
            return  this.checkLength = []
        },

        removeEmptyValues(object){
            for(let key in object){
                let value = object[key];
                if (value===null || value===undefined || value===''){
                    delete object[key];
                }
            }
        }
    }
})

let app = new Vue({
    el:'#app',
    data:{

    }
})