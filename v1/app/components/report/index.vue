<!--<style src="../../css/report.css"></style>-->
<template>
    <div class='udf_scroller' style="padding-bottom:1rem;height:100%;">
        <TopNav
                text="好药师-自诊助手"
                showBack="1"
        />
        <div style="height: 100%;padding-top: .88rem;position: relative;overflow: auto">
            <div class="recall" v-if="isRecall"
                 style="background:#FEF3E9;box-sizing: border-box;height: 1rem;position:fixed;top: .88rem;left: 0;z-index:99999;overflow: hidden">
                <div class="recall-icon">
                    <span class="icon icomoon icon-yujing" style="margin-right:.20rem;"></span>
                </div>
                <div>
                    {{recallDetail}}
                </div>
            </div>
            <div style="height: 1rem;background: #fff;" v-if="isRecall"></div>
            <div style="padding-bottom: 20px">

                <div class="num1 pad40">
                    <div>
                        <div class="disease clearfix" @click="enterWiki(num1.id)">
                            <div class="weight big-cir fll" style="margin-top: .1rem">
                                <div class="cir" :class="[num1.weight>50?'auto-clip':'cir-clip']">
                                    <div class="precent left" :style="{transform:'rotate('+num1.deg+'deg)'}"></div>
                                    <div class="precent right " v-if="num1.weight>50"></div>
                                </div>

                                <div class="text">
                                    <div class="text-weight" style="font-weight: 800">{{num1.weight}}%</div>
                                    <!-- <div class="text-tag">较高</div> -->
                                </div>
                            </div>
                            <div class="describe flr">
                                <div class="name ell" style="">{{num1.name}}</div>
                                <div class="depName ell" v-if="num1.department && num1.department!=''" style="">
                                    建议科室：{{num1.department}}
                                </div>
                                <div class="text">{{num1.describe}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pad40">
                    <div v-for="(item ,index) in report" :key="index" class="diseaseWrap">
                        <div class="diseaseList" @click="enterWiki(item.id)">
                            <div class="weight big-cir " style="margin-top: .14rem">
                                <div class="cir" :class="[item.weight>50?'auto-clip':'cir-clip']">
                                    <div class="precent left" :style="{transform:'rotate('+item.deg+'deg)'}"></div>
                                    <div class="precent right" v-if="item.weight>50"></div>
                                </div>

                                <div class="text">
                                    <div class="text-weight">{{item.weight}}%</div>
                                    <!-- <div class="text-tag">较高</div> -->
                                </div>
                            </div>
                            <div class="describe">
                                <div class="name">{{item.name}}</div>
                                <div class="text">{{item.describe}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="width:3.64rem;height:.44rem;margin:.60rem auto;">
                    <img :src="logoImg" style="width:100%;height:100%;"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import '../../css/report.css';
    import TopNav from '../title/index.vue';
    import logoImg from '../../images/sy.png';

    export default {
        name: 'Report',
        components: {TopNav},
        data(){
            return {
                report: [],
                num1: {},
                recallDetail: '',
                isRecall: false,
                logoImg: logoImg
            }
        },
        computed: {
            diagnose(){
                return this.$store.state.diagnose;
            },
            recall(){
                return this.$store.state.recall;
            },
            classN(item){
                return item.weight > 50 ? 'auto-clip' : 'cir-clip'
            }
        },
        watch: {
            diagnose(){
                this.onload()
            },
            recall(){
                this.onload()
            }
        },
        beforeCreate(){
            if (this.$store.state.diagnose.length == 0) {
                this.$router.push('inquiry');
            }
        },
        created(){
            this.onload();

        },
        mounted(){

        },
        methods: {
            onload(){
                let {diagnose, recall}=this.$store.state;

                let _diagnose = JSON.parse(JSON.stringify(diagnose));

                for (let i = 0; i < _diagnose.length; i++) {
                    let deg = _diagnose[i].weight / 100 * 360;
                    _diagnose[i].deg = deg;
                }

                let item = _diagnose.shift();

                let isRecall = false,
                        recallDetail = '';

                if (recall.isRecall) {
                    isRecall = recall.isRecall;
                    recallDetail = JSON.stringify(recall.recall) != '{}' && recall.recall.notification ? recall.recall.notification.detail : '';
                }

                this.report = _diagnose.slice(0, 7);
                this.num1 = item;
                this.isRecall = isRecall;
                this.recallDetail = recallDetail;

            },

            enterWiki(id){
                let self = this;
                new Promise((resolve, reject)=> {
                    self.$store.dispatch('enterWiki', id);
                    resolve()
                }).then(()=> {
                    self.$router.push('wiki')
                })

            }
        }
    }
</script>