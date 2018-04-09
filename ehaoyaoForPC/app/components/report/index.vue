<template>
    <div>
        <div class="num1">
            <div class="disease positR" data-id="num1.id"
                 id='reportList_click_enterWiki_no1'>
                <div class='reportImgWrap'>
                    <img src="../../images/reportBg1.png" class="image"/>
                </div>
                <div class='imgCont report'>
                    <div class="name ell">
                        <div style="width: 4.5rem;overflow: hidden;text-overflow: ellipsis;" v-if="firstDisease&&firstDisease.disease&&firstDisease.disease.name">
                            {{firstDisease.disease.name}}</div>
                        <!--<div class="view-medical" @click.once="showMedication(firstDisease)">-->
                            <!--<span class="icon-yao"></span>用药方案-->
                        <!--</div>-->
                    </div>
                    <div class="weight">{{firstDisease.weight}}%</div>
                    <div class="middle-area">
                        <div class="depName ell" v-if="firstDisease&&firstDisease.department&&firstDisease.department.id && firstDisease.department.id!=''" style="">
                            建议科室：{{firstDisease.department.text}}
                        </div>
                    </div>
                    <!--<div class='drug ell' v-if="num1.drugPlans && num1.drugPlans.length>0">推荐用药：{{num1.drugPlans}}</div>-->
                    <div class="describe" style="display: flex;justify-content: space-between" @click.top="enterWiki(firstDisease.disease.id)">
                        <span style="display: inline-block;vertical-align: middle;">
                            wiki：{{firstDisease.wikiAbstract}} </span>

                        <span style="margin-top: 13px;"
                              class='icon-unfolded'></span>
                    </div>
                </div>

            </div>
        </div>
        <!-- 疾病列表 -->
        <div class="list" style="height: 9.5rem;overflow-y: auto;">
            <div class='titleReport pad40'>
                <div class='icon-paixu'></div>
                <div style='margin-left:.12rem'>其它低概率疑似疾病</div>
            </div>
            <div v-for="item in talkContent" class="disease-wrap">
                <div data="item">
                    <div class="disease" data-id="item.id" @click="enterWiki" id="reportList_click_enterWiki_no2">
                        <div class='diseaseTitle'>
                            <div style="width: 75%;">
                                <div class="weight">{{showWeight(item)}}</div>
                                <!--<div class="weight">{{item.weight}}%</div>-->
                                <div class="name ell" style="width: 54%;">{{item.disease.name}}</div>
                            </div>
                            <!--<div class="view-medical" @click.once="showMedication(item)">-->
                                <!--<span class="icon-yao"></span>用药方案-->
                            <!--</div>-->
                        </div>
                        <div class="describe">
                            <div style='width:95%'>
                                <!--<div class='drug ell' v-if="item.drugPlans && item.drugPlans.length>0">-->
                                    <!--推荐用药：{{item.drugPlans}}-->
                                <!--</div>-->
                                <div class='text' @click.top="enterWiki(item.disease.id)">wiki：{{item.wikiAbstract}}</div>
                            </div>
                            <div class='icon-unfolded icon'></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部logo -->
            <div style="width:3.64rem;height:.44rem;margin:.60rem auto;">
                <img src="../../images/sy.png" style="width:100%;height:100%;"/>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import '../../css/report.css'
    import TopNav from '../title/index.vue'
    import logoImg from '../../images/sy.png'

    export default {
        name: 'Report',
        components: {TopNav},
        data() {
            return {
                logoImg: logoImg,
                dataNew: []
            }
        },
        computed: {
            ...mapState(['conversationID','report', 'num1', 'recallDetail', 'isRecall', 'drugUsePlans','talkContent','firstDisease']),
            diagnose() {
                return this.$store.state.diagnose
            },
            report() {
                return this.$store.state.report
            },
            recallDetail() {
                return this.$store.state.recallDetail
            },
            num1() {
                return this.$store.state.num1
            },
            recall() {
                return this.$store.state.recall
            },
            classN(item) {
                return item.weight > 50 ? 'auto-clip' : 'cir-clip'
            },
            drugUsePlan() {
                this.drugUsePlan = this.dataNew;
            },
//            diseaseWeight(){
//                return (this.firstDisease.weight*100).toFixed(2);
//            },
//            talkDiseaseWeight(){
//                return (this.talkContent.weight*100).toFixed(2);
//            }
        },
        watch: {
            diagnose() {
                this.onload()
            },
            recall() {
                this.onload()
            }
        },
        beforeCreate() {
            if (this.$store.state.diagnose.length == 0) {
//        this.$router.push('inquiry')
            }
        },
        created() {
            if(!this.firstDisease.disease){
                this.$router.push('inquiry')
            }
            this.onload();
        },
        mounted() {

        },
        methods: {
            showWeight(item) {
                //显示概率计算（不改变 item.weight 的值）
                return (item.weight*100).toFixed(2) + '%';
            },
            onload() {
                let {diagnoseResult, recall} = this.$store.state,
                    diagnose;
                for (let i = 0; i < diagnoseResult.length; i++) {
                    if (diagnoseResult[i].sn == this.$route.query.sn) {
                        diagnose = JSON.parse(JSON.stringify(diagnoseResult[i].diagnosis));
                        recall = JSON.parse(JSON.stringify(diagnoseResult[i].recall));
                        break;
                    }
                }
                this.$store.dispatch('toDiagnosis', {diagnose});
            },

            enterWiki(id) {
                let self = this;
                new Promise((resolve, reject) => {
                    self.$store.dispatch('enterWiki', id);
                    resolve()
                }).then(() => {
//                    self.$router.push({path: '/wiki', query: {from:'inquiry'}});
                })

            },
            showMedication(param) {
                let self = this;
                self.$store.dispatch('drugUsagePlans',
                    {
                        sid: self.conversationID,
                        ids: [{id: param.disease.id, type: "EntityTypeDisease"}],
                        callback: function () {
                            if (self.drugUsePlans.length > 0) {
                                self.$router.push({path: '/forMedication',query: {name: param.disease.name}});
                            } else {
                                self.$router.push({path: '/noMedication'})
                            }

                        }
                    }
                );
            }
        }
    }
</script>
