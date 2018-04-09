<template>
    <div class="inquiry-robot dialog">
        <div class='dialogCard' v-if="stems.type != 'Diagnosis' || !stems.hasDiagnose ">
            <div class="header-img">
                <img src="../../images/robot.png" style=""/>
            </div>
            <div class="topic" v-if="stems.type!='Image'">
                <!--<div class="text" style="padding:.1rem .2rem">-->
                <div class="text" style="padding: 0rem">
                    <div class="comPad">{{stems.stem}}</div>
                    <div v-if="stems.action && stems.action.length>0"
                         v-for="(item,index) in stems.action">
                        <div class="command stems-item" :class="{finish:stems.finish}"
                             :data-commandid="item.commandId" :data-type="item.type"
                             @click="clickCommand"
                             :data-text='item.text'>
                            <div class="command putaway robot-icon-putaway">
                                <span class='icon-putaway'></span>
                                {{item.text}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="topic dialogImg" v-else>
                <div class='imgWrap'>
                    <img :src='stems.stem' style="width: 100%;height:100%"/>
                </div>
            </div>
        </div>
        <!-- 诊断结果 -->
        <div class="diagnoseCard"
             v-if="stems.hasDiagnose && stems.type=='Diagnosis' ">
            <div class='text pad3'>您可能患有的疾病如下：</div>
            <div @click.top='clickDiagnoseCard' :data-id="stems.disease.id"
                 id='inquiry_click_diagnoseCard' :data-sn="sn" style="position: relative">
                <div class='result pad3'>
                    <div class='imgWrap resultModule'>
                        <!--<img src=''git/>-->
                        <div class='imgCont'>
                            <div class='name ell'>{{stems.disease.name}}</div>
                            <div class='weight'>
                                <div style='margin-right:.20rem;'>{{stems.disease.weight}}%</div>
                                <div style='color:rgba(255,255,255,.8)'>查看详请 >></div>
                            </div>
                            <div class='department' v-if="stems.disease.departmentId">
                                推荐科室：{{stems.disease.departmentName}}
                            </div>
                        </div>
                    </div>


                </div>

                <div class='drug pad3' v-if="stems.disease.drugPlans.length>0">
                    <div class='title'>推荐用药</div>
                    <div class='ell text'
                         v-for="(index,item) in stems.disease.drugPlans" :key="index">
                        方案{{index + 1}}:{{item}}
                    </div>
                </div>
                <div class='recall ell pad3' v-if="stems.isRecall" style="position: relative">
                    {{stems.recallInfo.title}}
                </div>
            </div>

            <!--<div class='freeback pad3 toShowMedical' id='inquiry_click_freeback'>-->
                <!--<span class='icon-putaway'></span>-->
                <!--查看用药方案-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import '../../css/robot.css'

    export default {
        name: 'Robot',
        props: ['stems', 'sn'],
        components: {},
        data() {
            return {
            }
        },
        create() {
        },
        computed: {
            ...mapState(['symptomToInquryFlag','options', 'optionType', 'showPicker', 'conversationID', 'drugUsePlans','question']),
            recall() {
                return this.$store.state.recall
            },
        },
        methods: {
            //获取用户指令（action）
            clickCommand(e) {
                let {commandid, type, text,finish} = e.currentTarget.dataset,
                    {question} = this.$store.state,
                    self = this;
//                  this.$store.dispatch('setFinish',true);//点击灰掉并且不能触发事件
                if (commandid == 'start-doctor-inquiry') {
                    if (!commandid) return;
                    this.$store.dispatch('setFinish',true);//点击自诊够药灰掉字体
                    self.$store.dispatch('setRouteFlag',false);
                    this.$store.dispatch('showLoading', true);
                    this.$store.dispatch('recordUserInp',
                        [{value: text, type: 'text'}]);
                    setTimeout(function () {
                        self.$store.dispatch('startDoctorInquiry',
                            {
                                commands: {id: commandid}
                            }).then(() => {
                            self.$store.dispatch('showLoading', false);
                        })
                    }, 600);
                }
                else if (commandid == 'show-disease-list') {     // 跳转到疾病列表
                    this.$store.dispatch('getDiseaseForStart');

                }
                else if (commandid == 'ask-symptoms') {     //跳转到症状列表
                    this.$store.dispatch('getSymptom');


                }
                else if (commandid == 'more') {    //查看更多
                    this.$store.dispatch('Protocol', true)
                }
            },
            clickRestart() {
                window.location.reload()
            },
            enterReport() {
                this.$router.push('report')
            },
            clickSuggest() {

            },

            enterSymptomsPage() {
                let self = this;
                this.$store.dispatch('globalLoadingToggle', true)

                this.$store.dispatch('fetchPageData', {
                    type: 'all',
                    cb: function () {
                        self.$store.dispatch('globalLoadingToggle', false)
                        self.$router.push('symptoms')
                    }
                })
            },
            sendMessage() {
                let {userAge, userGender, userTel, diagnoseList, recall} = this.$store.state
                let message = {
                    userAge: userAge,
                    userGender: userGender,
                    userTel: userTel,
                    diagnose: diagnoseList.items,
                    recall: recall,
                    source: 'rxthinking'
                };

                let diagnoseNameArr = []
                if (diagnoseList.items && diagnoseList.items.length > 0) {
                    let items = diagnoseList.items
                    items.map(val => {
                        diagnoseNameArr.push(val.text)
                    })
                }
                let diagnoseName = diagnoseNameArr.length > 0 ? diagnoseNameArr.join(',') : 'null'
                this.$store.dispatch('statisticApi', {
                    eventName: 'click_disease_list',
                    customData: ['diagnoseName=' + encodeURI(diagnoseName)]
                });

                window.parent.postMessage(JSON.stringify(message), this.$store.state.ifrSearch)
            },
            //进入疾病列表
            clickDiagnoseCard(e) {
                let {sn} = e.currentTarget.dataset;
                this.$router.push({
                    path: '/report', query: {sn}
                });
                this.$store.dispatch('fetchDiseaseList',e.currentTarget.dataset.id);
            },
            //查看用药方案
            showMedication(param) {
                let self = this;
                self.$store.dispatch('drugUsagePlans',
                    {
                        sid: self.conversationID,
                        ids: [{id: param.disease.id, type: "EntityTypeDisease"}],
                        callback: function () {
                            if (self.drugUsePlans && self.drugUsePlans.length > 0) {
                                self.$router.push({path: '/forMedication', query: {name: param.disease.name}});
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
