<!--<style src="../../css/symptoms"></style>-->

<template>
    <!--<div style="padding-top: .88rem;height:100%" class="container">-->
    <div class="container" style="height: 100%;">
        <Search/>
        <div v-if="!showSearchResult" style="height: 92%;">
            <div id="symptom" style="height:100%">
                <div class="cont">
                    <div class="left-tab udf_scroller">
                        <div class="sort-list" :class="[currentSort==index?'active':'']"
                             v-for="(item,index) in symptomCategory" :key="index"
                             @click.top="clickSortList(index)">
                            {{item}}
                            <div class="border" :class="[currentSort==index?'active':'']"></div>
                        </div>
                    </div>
                    <div class="right-cont udf_scroller clearfix">
                        <div class="ri-list fll" v-for="(item,index) in list" :key="index"
                             @click.top="clickSymptomList(item)">
                            <div :class="[item.choice?'active':'']">
                                {{item.text}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Cart/>
        </div>
        <div v-else-if="showSearchResult" style="overflow:auto; -webkit-overflow-scrolling: touch;height:85%">
            <div class="disease-name-area">
                <div v-if="searchList&&searchList.length>0" v-for="(item,index) in searchList" class="disease-item">
                    <div @click.top="clickSearchListFunc(item)">{{item.name}}</div>
                </div>
                <div v-else>
                    没有您查询的症状
                </div>
            </div>

        </div>

    </div>
</template>

<script>

    import '../../css/symptoms.css'
    import {mapState} from 'vuex'
    import $ from 'jquery'
    import TopNav from '../title/index.vue'
    import Search from './search.vue'
    import Cart from './footer.vue'

    export default {
        name: 'Symptoms',
        components: {
            TopNav,
            Search,
            Cart
        },
        beforeMount() {
            if (this.$store.state.userInfoModal || this.$store.state.diagnose.length > 0 || this.$store.state.question.length > 1) {
//        this.$router.push('inquiry')
            }
        },
        created() {
            if(this.symptomCategory.length==0){
                this.$router.push('inquiry')
            }
            this.onload();
            if(this.selected.length>0){
                this.$store.dispatch('setSymptomSelected');
                this.$router.push('inquiry');
            };
            this.$store.dispatch('setSymptomToInqury');
        },
        mounted() {
            this.setContH();
            this.setContPad();
            this.$store.dispatch('statisticApi', {eventName: 'view_symptom_list'})

        },
        updated() {
            this.setContH()
            this.setContPad()
        },
        computed: {
            ...mapState(['diseaseItems','conversationID','drugUsePlans','selected']),
            list: {
                get: function () {
                    return this.$store.state.symptoms.currentList
                },
                // setter
                set: function (newValue) {
                    this.$store.state.symptoms.currentList = newValue
                }
            },
            symptomCategory() {
                return this.$store.state.symptoms.symptomCategory
            },
            selected() {

                return this.$store.state.symptoms.selected
            },
            currentSort() {
                return this.$store.state.symptoms.currentSort
            },
            footerScrollH() {
                return parseFloat($('html').css('fontSize')) * 2.5
            },
            showSearchResult() {
                return this.$store.state.symptoms.showSearchResult
            },
//            searchValue() {
//                return this.$store.state.symptoms.searchValue
//            },
            searchList() {
                return this.$store.state.searchList
            },

        },
        methods: {
            showMedication(param) {
                let self = this;
                    self.$store.dispatch('drugUsagePlans',
                        {
                            sid: self.conversationID,
                            ids: [{id: param.id, type: "EntityTypeDisease"}],
                            callback: function () {
                                if (self.drugUsePlans&&self.drugUsePlans.length > 0) {
                                    self.$router.push({path: '/forMedication',query: {name: param.name}});
                                } else {
                                    self.$router.push({path: '/noMedication'})
                                }
                            }
                        });
            },
            clickSearchListFunc(json){
                let obj={
                    id:json.id,
                    text:json.name
                };
                this.$store.dispatch('clickSearchList',obj);
            },

            clickSearchMask() {
                this.$store.dispatch('searchMaskHide')
            },
            onload() {
                let {symptomList, symptomCategory} = this.$store.state.symptoms,
                    currentSortContent = symptomCategory[0];

                this.$store.state.symptoms.allList = symptomList,
                    this.$store.state.symptoms.currentList = this.$store.state.symptoms.symptomList[currentSortContent];
            },
            clickSortList(idx) {
                this.$store.dispatch('setCurrentSort', idx)
            },
            clickSymptomList(item) {
                let json = {
                    id: item.id,
                    text: item.text
                };
                this.$store.dispatch('setSymptomChoice', json)
            },
            setContH() {
                let h = null,
                    winH = $(window).height(),
                    navH = $('#topNav').outerHeight(),
                    searchH = $('#search').outerHeight(),
                    footerH = $('#symptomFooter .sure').outerHeight()

                h = winH - navH - searchH - footerH
                if (h) {
                    $('#symptom .cont').height(h)
                }

            },
            setContPad() {
                let pad = 5;
                if (this.selected.length > 0) {
                    pad = parseFloat($('html').css('fontSize')) * 2.5 + 5
                }
                $('#symptom .left-tab').css('paddingBottom', pad)
            }
        },

    }
</script>
