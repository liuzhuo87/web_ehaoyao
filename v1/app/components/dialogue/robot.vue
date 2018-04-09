<template>
    <div>
        <div class="inquiry-robot dialog" v-if="optSymptoms">
            <div class="header-img">
                <img :src="robotImg"/>
            </div>
            <div class="topic">
                <div class="text">
                    欢迎使用【智能问诊】服务，在问诊过程中您提供的信息越详细，就越能够给出准确的病情预测，每次问诊的时间大约在1到3分钟，祝您身体健康！
                </div>
            </div>
        </div>

        <div class="inquiry-robot dialog" v-if="item.action!='DoctorInquiryActionDiagnose'">
            <div class="header-img">
                <img :src="robotImg"/>
            </div>
            <div class="topic">
                <div class="text">
                    {{item.stem}}
                </div>
                <!--<transition name="slide-left">-->
                <div @click="enterSymptomsPage" class="link" v-if="optSymptoms && enterSymptoms">点击选择症状>></div>
                <!--</transition>-->
            </div>
        </div>

        <!--给出诊断结果-->
        <div class="inquiry-robot dialog" v-else="item.action=='DoctorInquiryActionDiagnose'">
            <div class="inquiry-robot dialog diagnose" style="padding-bottom:.60rem">
                <div class="header-img">
                    <img :src="robotImg" style="background-size:cover"/>
                </div>
                <div>
                    <div class="topic">

                        <!--给出诊断-->
                        <div v-if="item.haveResult">
                            <div class="title">
                                根据您的描述，AI系统分析结果如下，供您参考：
                            </div>
                        </div>

                        <!--未给出诊断-->
                        <div v-else>
                            <div>
                                好伤心，根据您的描述，AI系统无法分析您的健康状况，您可以点击[<span style="color:#8C9CFE"
                                                                      @click="clickRestart">重新问诊</span>]重新咨询，也可以直接到您附近的医院就诊。
                            </div>
                        </div>

                    </div>

                    <!--诊断结果卡片-->
                    <div class="diagnoseCard" v-if="item.haveResult">
                        <div class="cardList">
                            <div class="result" @click="sendMessage">
                                <div class="weight">
                                    {{item.weight}}
                                    <span style="font-size:.48rem">  %</span>
                                </div>
                                <div class="diseaseName">
                                    <span class="ell">{{item.name}} </span>
                                    <span class="icon icomoon icon-putaway"
                                          style="font-size:.30rem;line-height:.50rem;"></span>
                                </div>
                                <div class="department">
                                    <div>
                                        <span class="icon icomoon icon-daohang"
                                              style="margin-right:.20rem;line-height:.50rem;font-size:.22rem;"></span>
                                    </div>
                                    <div>
                                        <div>建议您去<span class="depName" style="color:#FF2F4A"
                                                       v-if="item.department && item.department !=''">{{item.department}}</span>
                                        </div>
                                        <div>进一步确诊，感谢您的使用。</div>

                                    </div>
                                </div>
                                <!-- <div class="recall" > -->
                                <div class="" v-if="recall.isRecall" style="color:#F68B23;margin-top:.20rem">
                                    <span class="icon icomoon icon-yujing"
                                          style="margin-right:.2rem;line-height:.50rem;"></span>
                                    <span>{{recall.recall.notification.title}}</span>
                                </div>
                            </div>
                            <!--<div class="suggest" @click="clickSuggest" id='inquiry_click_suggest_link'>-->
                            <!--<div style="display:flex">-->
                            <!--<span class="icon icomoon icon-yijian" style="line-height: 1rem; margin-right: .20rem; font-size: .22rem; "></span>-->
                            <!--<span>意见反馈</span>-->
                            <!--</div>-->
                            <!--<div>-->
                            <!--<span class="icon icomoon icon-putaway" style="font-size:.30rem;line-height:.50rem;"></span>-->
                            <!--</div>-->
                            <!--</div>-->

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import robot from '../../images/robot.png'


    export default {
        name: 'Robot',
        props: ['item', 'optSymptoms', 'enterSymptoms'],
        components: {},
        data() {
            return {
                robotImg: robot,
            }
        },
        methods: {
            clickRestart(){
                window.location.reload();
            },
            enterReport(){
                this.$router.push('report')
            },
            clickSuggest(){

            },
            enterSymptomsPage(){
                let self = this;
                this.$store.dispatch('globalLoadingToggle', true);

                this.$store.dispatch('fetchPageData', {
                    type: 'all', cb: function () {
                        self.$store.dispatch('globalLoadingToggle', false);
                        self.$router.push('symptoms');
                    }
                });
            },
            sendMessage(){
                let {userAge, userGender, userTel, diagnoseList, recall}=this.$store.state;
                let message = {
                    userAge: userAge,
                    userGender: userGender,
                    userTel:userTel,
                    diagnose: diagnoseList.items,
                    recall: recall,
                    source: 'rxthinking'
                };

                let diagnoseNameArr=[];
                if(diagnoseList.items && diagnoseList.items.length>0){
                    let items=diagnoseList.items;
                    items.map(val=>{
                        diagnoseNameArr.push(val.text);
                    })
                }
                let diagnoseName=diagnoseNameArr.length>0?diagnoseNameArr.join(','):'null';
                this.$store.dispatch('statisticApi',{eventName:'click_disease_list',customData:['diagnoseName='+encodeURI(diagnoseName)]});

                window.parent.postMessage(JSON.stringify(message), this.$store.state.ifrSearch);
            }
        },
        computed: {
            recall(){
                return this.$store.state.recall
            }
        }

    }
</script>