<!--<style src="../../css/dialogue.css"></style>-->

<template>
    <div>
        <div class="dialogueWrap dialog-area udf_scroller" ref="dialogueWrap"
             :style="{height:wrapMaxH,marginBottom:wrapBtm}" v-if="!showProtocol">
            <div v-for="(item,index) in question" :key="index">
                <div v-for='(val,idx) in item.stems' :key="idx">
                    <Robot :stems=val :sn=item.sn></Robot>
                </div>
                <Patient :answer=item.answer></Patient>
            </div>
        </div>
        <Protocol v-if="showProtocol"/>
    </div>
</template>

<script>
    import '../../css/dialogue.css'

    import $ from 'jquery'
    import {mapState} from 'vuex'
    import Robot from './robot.vue'
    import Patient from './patient.vue'
    import Protocol from '../inquiry/protocol.vue'


    export default {
        name: 'DialogueFlux',
        components: {
            Robot,
            Patient,
            Protocol
        },
        created() {//症状页面出现created
            let params = this.$route.query.from;//url中的query
            let self = this;
            if (params) {//如果有参数就说明是选好症状之后的
                    this.$store.dispatch('showLoading', true);
                    this.$store.dispatch('toInquiry',
                        {par: params}).then(() => {
                        setTimeout(function () {
                            self.$store.dispatch('showLoading', false);
                        }, 500)
                    });


            }else{//不含query的url是选择症状但是没有点击确定的
                if(this.symptomToInquryFlag){//这个是继续提问的
                    this.$store.dispatch('showLoading', true);
                    this.$store.dispatch('fetchQuestion');
                }else{//停止在选择症状入口这里
                    this.$store.dispatch('setFinish',false);
                }
            }
        },
        mounted() {
            this.setScrollH()
        },
        updated() {
            this.setScrollH()
        },
        computed: {
            ...mapState(['symptomToInquryFlag','options', 'optionType', 'userInfoModal', 'question', 'showOptions', 'showPicker', 'diagnosis', 'diagnose', 'showProtocol',]),
            wrapBtm() {
                let {winH, root} = this.getH();
                if (this.options&&this.options.length > 0 && this.optionType == 'TextOptions') {
                    return (root * 5 )/root+'rem';
                } else {
                    return (root * 1 )/root+'rem';
                }
            },
            wrapMaxH() {
                let {winH, root} = this.getH();
                if (this.options&&this.options.length > 0 && this.optionType == 'TextOptions') {
                    return (winH - root * 0.88 - root * 5 + root)/root+'rem';
                } else if (this.options&&this.options.length > 0 && this.optionType == 'ImageOptions') {
                    return (winH - root * 0.88 - root * 5 + root)/root+'rem';
                } else {
//                    return winH - root * 0.88 - root * 1 + 'px'
                    return (winH - root * 0.88 + 10 )/root+'rem';

                }
            },
            enterSymptoms() {
                let {question} = this.$store.state;
                if (question[0].answer.length > 0) {
                    return false
                } else {
                    return true
                }
            }
        },

        watch: {
            wrapMaxH() {
                let self = this
                setTimeout(function () {
                    self.setScrollH()
                }, 400)

            },

            question() {
                let self = this;
                setTimeout(function () {
                    self.setScrollH()
                }, 400)
            }
        },
        methods: {
            getH() {
                let h = null,
                    winH = parseFloat($(window).height()),
                    root = parseFloat($('html').css('fontSize'))

                return {winH, root}
            },
            setScrollH() {
                if(this.$refs.dialogueWrap){
                    this.$refs.dialogueWrap.scrollTop = this.$refs.dialogueWrap.scrollHeight - 10
                }
            }

        }
    }
</script>
