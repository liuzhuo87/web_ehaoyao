<!--<style src="../../css/symptoms"></style>-->

<template>
    <div style="padding-top: .88rem">
        <TopNav
                text="好药师-自诊助手"
                showBack="1"
                from="inquiry"
        />
        <Search />
        <div id="symptom">
            <div class="cont">

                <div class="left-tab udf_scroller">
                    <div class="sort-list" :class="{active:index==currentSort}"
                         v-for="(item,index) in symptomCategory" :key="index" @click="clickSortList(index)">
                        {{item}}
                        <div class="border" :class="{active:index==currentSort}"></div>
                    </div>
                </div>
                <div class="right-cont udf_scroller clearfix">
                    <div class="ri-list fll" v-for="(item,index) in list" :key="index" @click="clickSymptomList(item)">
                        <div :class="{active:item.choice}">
                            {{item.text}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Cart />
    </div>
</template>

<script>

    import '../../css/symptoms.css';
    import {mapState} from 'vuex';
    import $ from 'jquery';
    import TopNav from '../title/index.vue';
    import Search from './search.vue';
    import Cart from './footer.vue'

    export default {
        name: 'Symptom',
        components: {
            TopNav,
            Search,
            Cart
        },
        beforeMount(){
            if(this.$store.state.userInfoModal || this.$store.state.diagnose.length>0 || this.$store.state.question.length>1){
                this.$router.push('inquiry');
            }
        },
        mounted(){
            this.setContH();
            this.setContPad();
            this.$store.dispatch('statisticApi',{eventName:'view_symptom_list'});

        },
        updated(){
            this.setContH();
            this.setContPad();
        },
        computed: {
            list(){
                return this.$store.state.symptoms.currentList;
            },
            symptomCategory(){
                return this.$store.state.symptoms.symptomCategory
            },
            selected(){
                return this.$store.state.symptoms.selected
            },
            currentSort(){
                return this.$store.state.symptoms.currentSort
            },
            footerScrollH(){
                return parseFloat($('html').css('fontSize'))*2.5;
            }

        },
        methods: {
            clickSortList(idx){
                this.$store.dispatch('setCurrentSort',idx)
            },
            clickSymptomList(item){
                let json={
                    id:item.id,
                    text:item.text
                }
                this.$store.dispatch('setSymptomChoice',json)
            },
            setContH(){
                let h = null,
                        winH = $(window).height(),
                        navH=$('#topNav').outerHeight(),
                        searchH=$('#search').outerHeight(),
                        footerH=$('#symptomFooter .sure').outerHeight();

                h=winH-navH-searchH-footerH;
                if(h){
                    $('#symptom .cont').height(h);
                }

            },
            setContPad(){
                let pad=5;
                if(this.selected.length>0){
                    pad=parseFloat($('html').css('fontSize'))*2.5+5;
                }
                $('#symptom .left-tab').css('paddingBottom',pad);
            }
        }
    }
</script>