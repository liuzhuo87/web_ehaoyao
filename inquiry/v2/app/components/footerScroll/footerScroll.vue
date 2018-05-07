<template>
    <div style="width:100%;border-top:.01rem solid #eaeaea;" class="footer-scroller">
        <div style="width:100%;white-space: nowrap;
    overflow: auto;height: 3.3rem;padding-left:.22rem" class="udf_scroller">
            <div v-for="(img,index) in options" class="imgWrap"
                 style="display:inline-block;vertical-align:middle;width:2.6rem;height: 2rem;
             border:.04rem solid #eee;margin-right: 0.46rem;margin-top: .8rem;border-radius: 0.5rem;">
                <span style="position: absolute;top:-0.1rem;right: .2rem;">
                    <!--<input type="checkbox" :id="'bodyPart'+index" class="myCheckbox"-->
                           <!--v-model="img.checked" @change="changeValue(img)" name="test" >-->
                    <!--<label :for="'bodyPart'+index" class="icon-approval"></label>-->
                     <input type="radio" :id="'bodyPart'+index" class="myCheckbox"
                            v-model="img.checked" @change="changeValue(img)" name="test" >
                    <label :for="'bodyPart'+index" class="icon-approval"></label>
                </span>
                <img :src="img.image" class="scrollViewImage"/>
                <div class='text ell'>{{img.altText}}</div>
            </div>
        </div>
        <div class='sureBtn positR' @click.stop='sureScroll'>
            <div class="pickerChoice">
                确认
            </div>
            <div class='imgWrap'>
                <img src='../../images/btnBg.jpg' style="width: 100%;height: 100%"/>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import '../../css/forMedication.css'
    import '../../css/picker.css'
    import '../../css/footerScroll.css'

    export default {
        name: 'FooterScroll',
        data() {
            return {
                checkedImg:{}
            }
        },
        components: {},
        created() {

        },
        beforeMount() {
        },
        computed: {
            ...mapState(['options', 'optionType', 'showPicker', 'footerHeight', 'question']),
        },
        methods: {
            changeValue(img) {
                $('input[name="test"]:checked').each(function () {
                    img.checked=true;
                });
                if(img && img.checked) {
                    //勾选
                    this.checkedImg = img;
                } else {
                    //取消勾选
                        this.checkedImg = {};
                }
            },
            // 确定横向滚动输入
            sureScroll() {
                let self = this;
                if (self.checkedImg&&self.checkedImg.checked) {
                    //选中图片，执行 action
                    this.$store.dispatch('showLoading', true);
                    setTimeout(function () {
                        if (!self.checkedImg.key) return;
                        self.$store.dispatch('recordUserInp',
                            [{ value: self.checkedImg, type: 'image' }]);
                        setTimeout(function () {
                            self.$store.dispatch('fetchFooterInfo', { value: self.checkedImg.key })
                                .then(() => {
                                    self.$store.dispatch('showLoading', false);
                                });
                        }, 400);
                    }, 600)
                }
            }
        }
    }
</script>
