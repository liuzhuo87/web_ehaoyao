<!--<style src="../../css/dialogue.css"></style>-->

<template>
    <div class="dialogueWrap comPad udf_scroller" ref="dialogueWrap"
         :style="{height:wrapMaxH,marginBottom:wrapBtm}">
        <div v-for="(item,index) in question" :key="index" v-show="!userInfoModal">
            <Robot
                    :item=item
                    :optSymptoms="index>0?false:true"
                    :enterSymptoms="enterSymptoms"
            />
            <Patient
                    :answer="item.answer"
            />
        </div>
    </div>
</template>

<script>
    import '../../css/dialogue.css';

    import $ from 'jquery';
    import { mapState } from 'vuex';
    import Robot from './robot.vue';
    import Patient from './patient.vue';

    export default {
        name: 'DialogueFlux',
        components: {
            Robot,
            Patient
        },
        created() {
            if (this.$route.query.from == 'symptoms' && this.question[0].answer.length > 0 && this.question.length == 1) {
                this.$store.dispatch('fetchQuestion')
            }
        },
        mounted() {
            this.setScrollH()
        },
        updated() {
            this.setScrollH()
        },
        computed: {
            ...mapState(['userInfoModal', 'question', 'showOptions', 'diagnose']),
            wrapBtm() {
                let { winH, root } = this.getH();

                if (!this.showOptions || this.diagnose.length > 0) {
                    return root * 1 + 'px'
                } else {
                    return root * 4 + 'px'
                }
            },

            wrapMaxH() {
                let { winH, root } = this.getH();

                if (this.diagnose.length > 0 || !this.showOptions) {
                    return winH - root * .88 - root * 1 + 'px'
                } else {
                    return winH - root * .88 - root * 4 + 'px'
                }
            },

            enterSymptoms() {
                let { question } = this.$store.state;
                if (question[0].answer.length > 0) {
                    return false
                } else {
                    return true
                }
            }
        },

        watch: {
            wrapMaxH() {
                let self = this;
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
                    root = parseFloat($('html').css('fontSize'));

                return { winH, root }
            },
            setScrollH() {
                this.$refs.dialogueWrap.scrollTop = this.$refs.dialogueWrap.scrollHeight - 10;
            }

        }

    }
</script>