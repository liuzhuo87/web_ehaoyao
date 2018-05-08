<template>
    <div class="pickerArea">
        <mt-picker :visibleItemCount="5" :slots="this.slotsFetch"
                   @change="onValuesChange" :itemHeight="90"></mt-picker>
        <div class='sureBtn positR' @click='surePicker'>
            <div class="pickerChoice">
                确认
            </div>
            <div class='imgWrap'>
                <img src='../../images/btnBg.jpg' style="width: 100%;height: 100%"/>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import '../../css/picker.css';

    export default {
        name: 'Picker',
        data() {
            return {
                value: '',
                slots:[],
                _defaultIndex:0,
//                value: '',
//                slots: [{
//                    values: [],
//                    className: 'slot1',
//                    defaultIndex: 1,
//                }],
//                _defaultIndex: 1,

            }
        },
        components: {},
        created() {
        },

        computed: {
            ...mapState(['options', 'optionType', 'selectOption', 'question', 'showPicker', 'compareData','globalLoading']),
//            slotsFetch() {
//                console.log('slotsFetch');
//                let self = this;
//                let values=[];
////                var json = {
////                    values: [],
////                    className: 'slot1',
////                    defaultIndex: 1,
////                }, arr = [];
//                this._defaultIndex = 1;
//                this.slots[0].values.length=0;
////                this.slots.push(json);
//                for (let i = 0; i < this.options.length; i++) {
//                    values.push(this.options[i].text);
////                    this.slots[0].values.push(this.options[i].text);
//                    if (this.options[i] && this.options[i].selected) {
//                        this._defaultIndex = i;
//                    }
//                }
//                this.slots[0].values=values;
//                this.slots[0].defaultIndex=this._defaultIndex;
////                console.log(JSON.parse(JSON.stringify(this.slots)));
//                return this.slots;
//            },
            slotsFetch(){
                let self=this;
                var json={
                    values:[],
                    className:'slot1',
//                    className:'slot'+(this.slots.length+1),
                    defaultIndex:0,
                },arr=[];

                this.slots.push(json);
                for (let i = 0; i < this.options.length; i++) {
                    json.values.push(this.options[i].text);
                    if(this.options[i]&&this.options[i].selected){
                        this._defaultIndex=i;
                    }
                }
                arr.push(json);

                return arr;
            },
        },
        methods: {
            onValuesChange(picker, values) {
                if (values[0] == undefined) {
                    values[0] = this.options[0].text;
                }
                this.value = values[values.length - 1];
            },
            surePicker(e) {
                let self = this;
                if (!self.compareData) {
                    return;
                }
                if(self.globalLoading){
                    return;
                }
                let index = this.clone(this.slotsFetch[0]).values.indexOf(this.value);
                let val = this.options[index];
                this.$store.dispatch('setCompareData', false);
                this.$store.dispatch('showLoading', true);
                setTimeout(function () {
                    if (!val.key) return;
                    self.$store.dispatch('recordUserInp',
                        [{value: val.text, type: 'text'}]);
                    setTimeout(function () {
                        self.$store.dispatch('fetchFooterInfo', {value: val.key})
                            .then(() => {
                                self.$store.dispatch('showLoading', false);
                            });
                    }, 400)
                }, 600);
            },
            clone(from) {
                if (from instanceof Array) {
                    return this.cloneArr(from);
                } else if (from instanceof Object) {
                    return this.cloneObj(from);
                } else {
                    return (from);
                }
            },

            cloneObj(from) {
                return Object.keys(from).reduce((obj, key) => (obj[key] = this.clone(from[key]), obj), {});
            },
            cloneArr(from) {
                return from.map((n) => this.clone(n));
            },
        },
        updated(){
            let self=this;
            this.$nextTick(() => {
                setTimeout(() => {//这个是一个初始化默认值的
                    if(self._defaultIndex&&self._defaultIndex!==0){
                        this.slotsFetch[0].defaultIndex= self._defaultIndex;
                    }else{
                        this.slotsFetch[0].defaultIndex= 1;
                    }

                }, 100);
            });
        },
//        updated() {
//            let self = this;
//            this.$nextTick(() => {
//                console.log("nextTick");
//                setTimeout(() => {//这个是一个初始化默认值的
//                    console.log("setTimeout");
////                    if (self._defaultIndex && self._defaultIndex !== 1) {
//                    this.slotsFetch[0].defaultIndex = self._defaultIndex;
////                    } else {
////                        this.slotsFetch[0].defaultIndex = 1;
////                    }
//
//                }, 100);
//            });
//        },
    }
</script>

<style>
    .pickerArea {
        position: absolute;
        bottom: 1px;
        background: #fff;
        width: 100%;
        -webkit-transition: .5s;
        -moz-transition: .5s;
        -ms-transition: .5s;
        -o-transition: .5s;
        transition: .5s;
    }

    .pickerChoice {
        position: absolute;
        z-index: 9999;
        left: 0;
        right: 0;
    }

    .slot1 {
        width: 100%;
    }

    .picker-item {
        color: #ccc !important;
        font-size: 0.33rem !important;
        /*height:50px!important;*/
        /*line-height: 50px!important;*/
    }

    .picker-item.picker-selected {
        color: #000000 !important;
        /*border: 1px solid #D8D8D8;*/
        border-right: none;
        border-left: none;
    }

    .picker-items {
        /*height:100%;*/
    }

    .picker-slot {
        font-size: 0.33rem;
    }

    .picker-center-highlight:before, .picker-center-highlight:after {
        height: 3px;
    }
</style>