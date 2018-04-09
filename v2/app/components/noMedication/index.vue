<template>
    <div style="height:100%;width:100%;display:table;
    text-align:center;">
        <div style=" display:table-cell;vertical-align:middle;">
            <img src="../../images/noMedication.png" style="width:100%">
            <div style="color:#F58B23;width:100%;text-align:center ">药品方案正在建设中…</div>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import '../../css/noMedication.css'
    import TopNav from '../title/index.vue'

    export default {
        name: 'NoMedication',
        components: {TopNav},
        data() {
            return {}
        },
        computed: {},
        watch: {},
        beforeCreate() {
        },
        created() {
        },
        mounted() {

        },
        methods: {}
    }
</script>
