<template>
    <div>
        <div class="inquiry-patient dialog" v-if="answer && answer.length>0">
            <div class="topic">
                <div class="text" v-for="(item,idx) in answer" :key="idx">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Patient',
        props: ['answer'],
        components: {}

    }
</script>