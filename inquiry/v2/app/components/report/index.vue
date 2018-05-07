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
                        <div style="width: 4.5rem;overflow: hidden;text-overflow: ellipsis;" v-if="diagnosisLast&&diagnosisLast.name">
                            {{diagnosisLast.name}}</div>
                        <div class="view-medical" @click.once="showMedication(diagnosisLast)">
                            <span class="icon-yao"></span>用药方案
                        </div>
                    </div>
                    <div class="weight">{{diagnosisLast.weight}}%</div>
                    <div class="middle-area">
                        <div class="depName ell" v-if="diagnosisLast&&diagnosisLast.departmentName&&diagnosisLast.departmentId && diagnosisLast.departmentId!=''" style="">
                            建议科室：{{diagnosisLast.departmentName}}
                        </div>
                    </div>
                    <div class="describe" style="display: flex;justify-content: space-between" @click.stop="enterWiki(diagnosisLast.id)">
                        <span style="display: inline-block;vertical-align: middle;">
                            wiki：{{diagnosisLast.describe}} </span>

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
            <div v-for="item in diagnosisContent" class="disease-wrap">
                <div data="item">
                    <div class="disease" data-id="item.id" @click.stop="enterWiki" id="reportList_click_enterWiki_no2">
                        <div class='diseaseTitle'>
                            <div style="width: 75%;">
                                <div class="weight">{{item.weight}}%</div>
                                <!--<div class="weight">{{showWeight(item)}}</div>-->
                                <!--<div class="weight">{{item.weight}}%</div>-->
                                <div class="name ell" style="width: 54%;">{{item.name}}</div>
                            </div>
                            <div class="view-medical" @click.once="showMedication(item)">
                                <span class="icon-yao"></span>用药方案
                            </div>
                        </div>
                        <div class="describe">
                            <div style='width:95%'>
                                <div class='text' @click.stop="enterWiki(item.id)">wiki：{{item.describe}}</div>
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

            diagnosisContent(){
                let leng;
                if(this.$store.state.diagnosis&&this.$store.state.diagnosis.length>0){
                    leng=this.$store.state.diagnosis.length;
                    if(this.$store.state.diagnosis[leng-1]&&this.$store.state.diagnosis[leng-1].diagnose
                        &&this.$store.state.diagnosis[leng-1].diagnose.length>0){
                        let diagnoseInfoContent= this.$store.state.diagnosis[leng-1].diagnose.reverse();
                        let newDiagnose=[];
                        for(let i=0;i<diagnoseInfoContent.length-1;i++){
                            newDiagnose.push(diagnoseInfoContent[i]);
                        }
                        newDiagnose.reverse();
                        return newDiagnose;
                    }
                }
            },
            diagnosisLast(){
                return this.$store.state.diagnosisFirst||'';
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
                        ids: [{id: param.id, type: "EntityTypeDisease"}],
                        name:param.name,
                        callback: function () {
                            if (self.drugUsePlans.length > 0) {
                                self.$router.push({path: '/forMedication',query: {name: param.name}});
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
