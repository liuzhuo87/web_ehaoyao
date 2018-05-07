<template>
    <section class="medical-style" style="overflow-y:auto;">
        <section class="disease-area" ref="diseaseArea" style="height: 92%">
            <div>
                <div class="cue">
                    <div style="display: inline-block;vertical-align: middle">
                        <span class="icon-tishi2" style="font-size: .38rem;"></span>
                    </div>
                    <span style="display:inline-block;vertical-align: middle;width: 84%;margin-left: 0.11rem;">
                        为了您更好的康复，需要针对疾病和疾病引发的症状同时用药才能达到更好的疗效哦！
                    </span>
                </div>
                <div class="disease-name" style="margin-bottom:0.18rem;color: #222;">{{this.drugName}}</div>

            </div>
            <div>
                <div v-for="drugUsePlan in drugUsePlans">
                    <div class="cause-disease" v-if="drugUsePlan.items && drugUsePlan.items.length>0">
                        <div class="title" style="color:#333">
                            {{drugUsePlan.name}}<span>(共{{drugUsePlan.items.length}}个)</span></div>
                        <div class="cause-disease-medical" v-for="(item, index) in drugUsePlan.items">
                            <label for="" class="checkWrap">
                                <input type="checkbox" :id="'myCheck'+item.id" class="myCheckbox"
                                       v-model="item.checkValue" @change="changeValueHandle">
                                <label :for="'myCheck'+item.id" class="icon-approval"></label>
                            </label>
                            <div style="width: 89%;;display: inline-block;vertical-align: middle;">
                                <div class='imgContent' @click.stop="showMedicalInfo(item.id)"
                                     style="display: inline-block;vertical-align: middle">
                                    <img :src="item.images[0].url" v-if="item.images && item.images.length>0"/>
                                </div>
                                <div class="medical-name">
                                    <div @click.stop="showMedicalInfo(item.id)"
                                         style="color: #222;display: inline-block;vertical-align: middle;font-size: .28rem;font-weight: bold">
                                        {{item.name}}
                                    </div>
                                    <br>
                                    <div style="display: inline-block;vertical-align: middle;
                                    font-size: .24rem;margin-top: .1rem;">
                                        <span>规格：</span>
                                        <span>{{item.spec.text}}</span>
                                        <span>{{item.spec.unit}}</span>
                                    </div>
                                    <!--<div class="medical-price">   -->
                                    <!--<div style="display: inline-block;margin-top: 4px;color:#FF2F4A;font-size:.32rem">-->
                                    <!--¥{{item.price}}-->
                                    <!--</div>-->
                                    <!--<table>-->
                                    <!--<tr>-->
                                    <!--<td @click="minus(item)">-</td>-->
                                    <!--<td>{{item.quantity}}</td>-->
                                    <!--<td @click="plus(item)">+</td>-->
                                    <!--</tr>-->
                                    <!--</table>-->
                                    <!--</div>-->
                                </div>
                            </div>
                            <div style=" max-width:5rem;width:auto;margin-top: .32rem;margin-left: .6rem;
                            border-radius: .16rem;background-color: #f5f5f5;position:relative;padding: 0.1rem 0 0.1rem 0.36rem;">
                                <div class="triangle-up"></div>
                                <div v-if="drugUsePlan.name=='病因治疗'">
                                    <div v-if="item.indications&&item.indications.length>0" style="font-size:0.22rem">
                                        适用病因：{{item.treatmentNameStr}}
                                    </div>
                                    <div v-if="item.indications&&item.indications.length>1" style="font-size:0.22rem">
                                        针对症状：{{item.indicationStr}}
                                    </div>
                                </div>
                                <div v-else="drugUsePlan.name=='对症治疗'">
                                    <div v-if="item.indications&&item.indications.length>0" style="font-size:0.22rem">
                                        适用病症：{{item.indicationStr}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
        <footer style="position: fixed;width: 100%;bottom: 0;z-index: 9999;">
            <div class="price-total">
                <span @click.stop="payForDetailList" style="display: inline-block;vertical-align: middle;width:100%;height:1rem;
                    line-height: 1rem;overflow: hidden;position: relative;color:#ffffff;text-align: center;font-size:.35rem">
                        <img src="../../images/btnBg.jpg" style="width:100%;height:100%">
                        <span style="position: absolute;top: -1px;width: 100%;left: -1px;">
                            <span>提交清单</span>
                            <!--<span style="font-size: .3rem;"> ({{ this.totalObj.totalNum }})</span>-->
                        </span>
                    </span>
            </div>
        </footer>
        <div>
            <div class="medication-submit-modal-content">
                <div class="content-area">请选择商品后再提交清单！</div>
                <div class="button-area">
                    <div @click.stop="getIt">知道了</div>
                </div>
            </div>
            <div class="medication-submit-modal"></div>
        </div>
    </section>
</template>
<script>

    import $ from 'jquery';
    import {mapState} from 'vuex';
    import {MessageBox, Toast} from 'mint-ui';
    import TopNav from '../title/index.vue';
    import RadioGroup from '../common/radio/radioGroup.vue';
    import '../../css/forMedication.css';

    export default {
        name: 'ForMedication',
        components: {TopNav, RadioGroup},
        data() {
            return {
                checked: true,
                drugName: '',
//                flag: false,
//                lasted: true,
//                bridge: {},
            }
        },
        created() {
            if (this.drugUsePlans.length == 0) {
                this.$router.push('inquiry')
            }
            this.onload();
            this.drugName = this.$route.query.name;
        },
        computed: {
            ...mapState(['isFresh', 'num1', 'diagnoseResult', 'drugUsePlans', 'totalObj', 'drugPlansTitle', 'firstDisease']),
            selected() {
                return this.$store.state.symptoms.selected;
            },
            wrapBtm() {
                let {winH, root} = this.getH()
            },
            wrapMaxH() {
                let {winH, root} = this.getH();
            },
        },
        watch: {
            wrapMaxH() {
                let self = this;
                setTimeout(function () {
                    self.setScrollH()
                }, 400)

            },
        },
        methods: {
            onload() {
                let self = this;
//                 self.connectWebViewJavascriptBridge(function (bridge) {
//                    console.log(bridge);
//                    self.bridge = bridge;
//                });
                this.changeValueHandle();
            },
            getH() {
                let h = null,
                    winH = parseFloat($(window).height()),
                    root = parseFloat($('html').css('fontSize'));

                return {winH, root}
            },
            setScrollH() {
                this.$refs.diseaseArea.scrollTop = this.$refs.diseaseArea.scrollHeight - 10
            },
            changeValueHandle() {
                //选择'商品总费用'
                let total = 0, num = 0;
                //遍历商品
                for (let k = 0; k < this.drugUsePlans.length; k++) {

                    if (this.drugUsePlans[k].items && this.drugUsePlans[k].items.length > 0) {
                        var _d = this.drugUsePlans[k].items;

                        for (let i = 0; i < _d.length; i++) {
                            let item = _d[i];
                            //判断‘商品状态’
                            if (item.checkValue) {
                                //商品状态为勾选时，记录'商品总费用'
                                total = Number(total) + Number(item.price) * Number(item.quantity);
                                //对‘商品总费用’小数进行精度处理--取两位小数，四舍五入
                                total = Number(total).toFixed(2);
                                num = num + item.quantity;
//                                num = num + 1;
                            }
                        }
                    }

                }
                //将选择商品总费用赋值给页面合计变量
                this.totalObj.totalMoney = Number(total).toFixed(2);
                this.totalObj.totalNum = num;

            },
            minus(item) {
                if (item.quantity > 1) {
                    item.quantity--;
                    this.changeValueHandle();
                }
            },
            plus(item) {
                if (item.stock && item.quantity + 1 <= item.stock) {
                    item.quantity++;
                    this.changeValueHandle();
                } else {
                    MessageBox({
                        title: '',
                        message: '对不起，该药库存有限！',
                        showCancelButton: false,
                        confirmButtonText: '知道了',
                    });
                }
            },
            //埋点
            initTracker(tp, tc) {
                let config = {
                    ai: '100001',// app_id 应用ID
                    pt: '200235',// page_type 页面类型
                    pi: '-1',// page_id 页面ID
                    ij: '1',// is_jump 此埋点是否跳转 1表示跳转 2表示不跳转 (页面埋点值为1)
                    si: '-1',// session_id 会话ID(用户登录后产生一个会话)
                    tp: tp, // tracker_position 值(tpty.tpid.tpa.tpc.tpi.unique_id) 说明如下
                    tc: tc, // tracker_content 值(tcs.tca.tcdt.tcdi) 说明如下
                    p: '-1',// province 省
                    c: '-1',// city 市 100001.200068.1.-1.1017.3.2.-1
                    d: '-1',// district 区
                    a: '-1',// address 详细地址
                    cp: '-1',// click_position 点击位置
                    lt: '-1',// location_type 接入地图api类型
                    l: '-1',// location 准确经纬度
                    rt: '0' //0-测试服//1-正式服
                };
                Tracker.init(config);//测试是否有问题
            },
            payForDetailList() {
                let self = this;
                //提交清单到好药师购物车
                //埋点
                let tp = '100001.200235.-1.-1.-1.-1.-1';
                let tc = '-1.-1.9.提交清单.-1';
                this.initTracker(tp, tc);

                let listCast = [];
                let _cartJson = [
                    {
                        pharmacyId: '25', //药店ID
                        listCart: []	//选择的用药组合
                    }
                ];
                //获取选中用药信息
                for (let k = 0; k < self.drugUsePlans.length; k++) {
                    let _drugUsePlan = self.drugUsePlans[k];
                    if (_drugUsePlan.items && _drugUsePlan.items.length > 0) {
                        for (let i = 0; i < _drugUsePlan.items.length; i++) {
                            let _item = _drugUsePlan.items[i];
                            if (_item.checkValue) {
                                //自己购物车
                                listCast.push(_item);

                                //发送的用药对象
                                let _toListCart = {
                                    productId: parseInt(_item.price.id),
                                    productNum: _item.quantity
                                };
                                //用药对象push到参数对象中
                                _cartJson[0].listCart.push(_toListCart);
                            }
                        }
                    }
                }
                if(listCast&&listCast.length===0){
                    $(".medication-submit-modal").show();
                    $(".medication-submit-modal-content").show();
                    $(".medication-submit-modal-content").addClass("animation-dialogue-in");
                    return;
                }else{
                    Toast({
                        message: '正在加入购物车...',
                        duration: 1000,
                        className:'submitToast'
                    });
                }
                let statisticCartJson=JSON.stringify(_cartJson);
                self.$store.dispatch('cartJsonStatistic',{eventName: 'statistic_cart', statisticCartJson});
                //判断桥接是否初始化
                window.parent.postMessage(JSON.stringify(_cartJson), this.$store.state.ifrSearch);

            },
            showMedicalInfo(param) {
                let self = this;
                self.$store.dispatch('showMedInfoFunc', {
                    param,
                    cb: function () {
                        self.$router.push('/showMedicalInfo')
                    }
                });

            },
            getIt(){
                $(".medication-submit-modal").hide();
                $(".medication-submit-modal-content").hide();
            }
        }
    }
</script>