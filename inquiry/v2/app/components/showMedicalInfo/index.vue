<template>
    <section class="showMedical" style="height:100%;animation: protocolShow 0.3s forwards;
    overflow:auto;
    -webkit-overflow-scrolling: touch;background-color: #ffffff">
        <div style="width:100%;height:7rem;">
            <div style="width:100%;height:7rem;background-color: #ffffff" class="to-show-medical-img">
                <mt-swipe :auto="0">
                    <mt-swipe-item v-for="(item,index) in medicalDetailInfo.images">
                        <div class="imgWrap" style="height:7rem;border:none;width: 7rem;margin:0 auto;margin-top:.1rem"
                             @click.top="showBigPicture(index)">
                          <img :src="item.url" style="width:100%;height: 100% "/>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <div style="background-color: #f0f0f0;height: .11rem;width:100%"></div>
        <div style="height: 8.2rem;margin-top:7px;">
            <table style="width: 95%;margin: 0 11px;" cellpadding="0" cellspacing="0">
                <tr style="width:100%" v-for="(dataItem,idx) in medicalDetailInfoItems">
                    <td style="width:100%;padding:.2rem 0.36rem;">
                        <span style="display: inline-block;width: 2rem;vertical-align: top">{{dataItem.title}}</span>
                        <span style="color:#333;display: inline-block;width: 4.3rem;white-space: pre-wrap;vertical-align: top">{{dataItem.text}}</span>
                    </td>
                </tr>
            </table>
        </div>
    </section>
</template>
<script>
    import $ from 'jquery';
    import {mapState} from 'vuex';
    import {MessageBox} from 'mint-ui';
    import '../../css/showMedicalInfo.css';

    export default {
        name: 'ShowMedicalInfo',
        components: {},
        data() {
            return {
                modalFlag:false
            }
        },
        created() {
            if (!this.medicalDetailInfo.id) {
                this.$router.push('inquiry')
            }
        },
        computed: {
            ...mapState(['medicalDetailInfo']),
            medicalDetailInfoItems() {
                if (this.medicalDetailInfo && this.medicalDetailInfo.spec && this.medicalDetailInfo.spec.items) {
                    return this.medicalDetailInfo.spec.items;
                }
            }

        },
        watch: {},
        methods: {
            showBigPicture(index){
                let self=this;
                self.$store.dispatch('pushPicture',{ index , cb:function(){
                    self.$router.push({path:'/showBigPicture'});
                }});

            }
        }
    }

</script>