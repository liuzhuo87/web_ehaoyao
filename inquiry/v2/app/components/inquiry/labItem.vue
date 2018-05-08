<template>
    <div id="labItem-modal" :class="[labItems.length>0 && labModal?'show':'hide']" v-if="labModal">
        <div class="scroll-wrap">
            <div class="scrollView udf_scroller" style="height:100%;">
                <div class="options" v-for="(item,index) in labItems" :key="index">
                    <div class="stem">
                        {{index + 1}}、{{item.text}}
                    </div>
                    <radio-group
                            :items="item.options"
                            :sourceData="item"
                            :valueChange="radioGroupChange"
                            :idx="index"
                    />

                </div>
            </div>
        </div>

        <div class="btn-group" :style="{display:labItems.length>0 && labModal?'flex':'none'}">
            <div class="cancel cancelLab" @click="cancelLab">未做以上化验</div>
            <div class='sureBtn positR' @click="sureLab">
                <div class='imgCont' style="width:100%;color:#fff">
                    确定
                </div>
                <div class='imgWrap' style="width:100%;color:#fff;text-align: center">
                    <img src='../../images/btnBg.jpg' style="width:100%;height:100%"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RadioGroup from '../common/radio/radioGroup.vue'

    export default {
        name: 'LabItem',
        components: {
            RadioGroup
        },
        computed: {
            labItems () {
                return this.$store.state.options
            },
            labModal () {
                return this.$store.state.labModal
            }

        },

        methods: {
            cancelLab () {
                var self=this;
                setTimeout(function () {
                    self.$store.dispatch('fetchFooterInfo', {value: true, type: 'skip'})
                },400)
            },
            sureLab () {
                let {options} = this.$store.state,
                        _arr = [],
                        _answer = [],
                        self = this;

                options.map(val=> {
                    if (val.selectedKey) {
                        _arr.push(val.selectedKey);
                        _answer.push({value: val.selectedAnswer, type: 'text'});
                    } else {
                        _arr.push(val.options[val.options.length - 1].key)
                    }
                });

                if (!_arr) return;
                this.$store.dispatch('showLoading', true);
                this.$store.dispatch('recordUserInp', _answer);
                setTimeout(function () {
                    self.$store.dispatch('fetchFooterInfo', {value: _arr, type: 'keys'})
                        .then(()=>{
                        setTimeout(function () {
                            self.$store.dispatch('showLoading', false);
                        },500);
                    });
                }, 400)

            },
            radioGroupChange (params) {
                this.$store.dispatch('recordLabResult', params)
            }

        }
    }
</script>
