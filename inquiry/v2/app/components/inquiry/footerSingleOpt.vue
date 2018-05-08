<template>
    <div class='singleOpt positR' @click="clickSingleOpt">
        <!--<div class='singleOpt positR' :data-key='options[0].key' :data-commandId='options[o].commandId' :data-text="options[0].text" bindtap='clickSingleOpt'>-->
        <div class='is-agree'>
            {{options[0].text}}
        </div>
        <div class='imgWrap'>
            <img src="../../images/btnBg.jpg" alt=""/>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'

    export default {
        name: 'FooterSingleOpt',
        components: {},
        created() {
        },
        mounted() {
        },
        updated() {
        },
        computed: {
            ...mapState(['options']),
        },

        watch: {},
        methods: {
            // 点击单个选项
            clickSingleOpt(e) {
                let self = this;
//                    { key, text, commandId } = e.currentTarget.dataset;
                this.$store.dispatch('Protocol', false);
                this.$store.dispatch('fetchFooterInfo')
//                showLoading();
//                actionClickFinish(commandId);
//                recordUserInp([{ value: text, type: 'text' }]);
//                talkFetch({ value: key });
            }
        }
    }
</script>