<template>
    <footer class="footer-area" :style="{height:footerHeight}" v-if="this.options&&this.options.length>0||this.optionType=='ImageOptions'">
        <div class="optionsWrap" >
            <FooterSingleOpt v-if="this.options&&this.options.length==1 && this.optionType=='TextOptions'" />
            <FooterPicker v-else-if="this.options&&this.options.length>0 && this.optionType=='TextOptions'"/>
            <FooterScroll v-else-if="this.options&&this.options.length>0&&this.optionType=='ImageOptions'"/>
        </div>
    </footer>
</template>

<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import FooterSingleOpt from './footerSingleOpt.vue'
    import FooterFreeText from './footerFreeText.vue'
    import FooterPicker from './picker.vue'
    import FooterScroll from '../../components/footerScroll/footerScroll.vue'

    export default {
        name: 'FooterArea',
        data() {
            return {
            };
        },
        components: {
            FooterSingleOpt,
            FooterPicker,
            FooterScroll
        },
        created() {
        },
        beforeMount() {
        },
        computed: {
            ...mapState(['options', 'optionType', 'showPicker', 'footerHeight', 'question']),
            footerHeight(){
                    let {question} = this.$store.state,
                        _dataList = question,
                        _len = _dataList.length;
                    if (_len >= 1) {
                        let _lastLi = _dataList[_len - 1],
                            {optType, asking} = _lastLi,
                            {options} = asking;
                        if (optType == 'FreeText' || (optType == 'TextOptions' && options.length == 1)
                            || optType == 'AskSymptoms' || optType == 'AskLabItemOptions') {
                            return '1rem'
                        } else if (optType == 'SaveOptions') {
                            return  "2.02rem"
                        } else {
                            return '4.2rem'
//                            return '4.6rem'
                        }
                    }

            }
        },
        methods: {

        }
    }
</script>
