<template name="footerTwoOpt">
    <div class='twoOpt' v-for="(item,index) in options" @click='clickTwoOpt'>
        {{item.text}}11111
    </div>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'SaveResult',
        props: ['question'],
        components: {},
        data() {
            return {
            }
        },
        computed: {
            ...mapState(['conversationID','report', 'num1', 'recallDetail', 'isRecall', 'drugUsePlans']),

        },
        watch: {

        },
        beforeCreate() {

        },
        created() {
        },
        mounted() {

        },
        methods: {
        }
    }
</script>
