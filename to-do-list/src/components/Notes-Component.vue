<template>
    <div class="bg-bgCream text-white">
        <section class="flex justify-center gap-x-16 pt-10">
            <!-- In Progress List -->
            <div class="bg-bgMaroon w-1/2 ml-16 border-bgMaroon rounded-lg">
                <div class="flex justify-center font-handwriting text-3xl mt-10">
                    <h2>In Progress</h2>
                </div>
                <ul class="pt-10 pl-10 pr-10 text-textLemon text-lg">
                    <li v-for="note in filters.inProgress" :key="note.id" class="pb-5">
                        <label class="flex justify-between items-center">{{ note.title }}
                        <input type="checkbox" class="w-5 h-5" v-model="note.completed">
                        </label>
                    </li>
                </ul>
            </div>
             <!-- Completed List -->
             <div class="bg-bgMaroon w-1/2 mr-16 border-bgMaroon rounded-lg">
                <div class="flex justify-center font-handwriting text-3xl mt-10">
                    <h2>Completed</h2>
                </div>
                <ul class="pt-10 pl-10 pr-10 text-textLemon text-lg">
                    <li v-for="note in filters.completed" :key="note.id" class="pb-5">
                        <label class="flex justify-between items-center">{{ note.title }}
                        <input type="checkbox" class="w-5 h-5" v-model="note.completed">
                        </label>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>

export default {

    data(){
        return{
            notes: []
        }
    },

    computed: {
        filters(){
            return{
                inProgress: this.notes.filter(note =>!note.completed),
                completed: this.notes.filter(note =>note.completed)
            }
        }
    },

    created(){
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(notes => {
            this.notes = notes
        })
    }
}
</script>



