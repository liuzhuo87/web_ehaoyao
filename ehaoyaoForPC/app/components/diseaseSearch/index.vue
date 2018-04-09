<template>
    <div class="container" style="height: 100%;">
        <DiseaseSearch/>
        <div v-if="!showDiseaseSearchResult" style="height: 92%;">
            <div style="height: 100%;">
                <div id="symptom" style="height:100%">
                    <div class="cont">
                        <div class="left-tab udf_scroller" style="xheight:100%">
                            <div class="sort-list" :class="[currentDepartmentIndex==index?'active':'']"
                                 v-for="(item,index) in diseaseList"
                                 @click="setCurrentDiseaseContent(item)">
                                {{item.name}}
                                <div class="border" :class="[currentDepartmentIndex==index?'active':'']"></div>
                            </div>
                        </div>
                        <div class="right-cont udf_scroller clearfix" style="width:70%;height:100%">
                            <div class="ri-list fll" v-for="(item,index) in curDiseaseList"
                                 style="width: 94%;padding-left: 40px!important;text-align: left">
                                <div @click.once="showDiseaseMedication(item)">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div v-else-if="showDiseaseSearchResult" style="overflow:auto; -webkit-overflow-scrolling: touch;height:85%">
            <div class="disease-name-area">
                <div v-if="diseaseItems&&diseaseItems.length>0" v-for="(item,index) in diseaseItems"
                     class="disease-item">
                    <div @click.once="showDiseaseMedication(item)">{{item.name}}</div>
                </div>
                <div v-else>
                    没有您查询的疾病
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import '../../css/symptoms.css'
    import {mapState} from 'vuex'
    import $ from 'jquery'
    import DiseaseSearch from './diseaseSearch.vue'

    export default {
        name: 'DiseaseList',
        components: {
            DiseaseSearch
        },
        beforeMount() {

        },
        created() {
            if(this.diseaseList.length==0){
                this.$router.push('inquiry')
            }
        },
        mounted() {
        },
        updated() {
        },
        computed: {
            ...mapState(['diseaseList', 'diseaseListContent',
                'conversationID', 'drugUsePlans', 'currentDepartmentIndex', 'curDiseaseList','diseaseItems']),
            diseaseList() {
                return this.$store.state.diseaseList
            },
            footerScrollH() {
                return parseFloat($('html').css('fontSize')) * 2.5
            },
            showDiseaseSearchResult() {
                return this.$store.state.showDiseaseSearchResult;
            },
        },
        methods: {
            showDiseaseMedication(param) {
                let self = this;
                self.$store.dispatch('drugEntityUsagePlans',
                    {
                        ids: [{id: param.id, type: "EntityTypeDisease"}],
                        callback: function () {
                            if (self.drugUsePlans&&self.drugUsePlans.length > 0) {
                                self.$router.push({path: '/forMedication',query: {name: param.name}});
                            } else {
                                self.$router.push({path: '/noMedication'});//没有用药方案
                            }
                        }
                    });
            },
            setCurrentDiseaseContent(param) {
                this.$store.dispatch('setCurrentDiseaseSort', param)
            },
        }
    }
</script>
