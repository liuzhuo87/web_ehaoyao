<!-- footer freetext -->
<template>
    <div class='footer freeText'>
        <div class='inpWrap online'>
            <!--<textarea :value="freeTextVal" :placeholder="options" :class='textInpt' :disabled='freeInpDisabled' :auto-height bindconfirm='sendFreeText' bindinput='recordFreeText' maxlength='50'></textarea>-->
            <textarea :placeholder="options" class='textInpt' :maxlength='50'></textarea>
        </div>
        <!-- <view class='inpBtn' bindtap='sendFreeText'>
           发送
       </view>  -->
    </div>
</template>
<script>
    import $ from 'jquery'
    import { mapState } from 'vuex'

    export default {
        name: 'FooterFreeText',
        data () {
            return {

            }
        },
        components: {},
        beforeMount () {
        },
        computed: {
            ...mapState(['options']),
        },
        watch: {
        },
        methods: {

        }
    }
</script>