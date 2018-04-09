<!--<style src="../../css/inquiry.css"></style>-->
<template>
    <!--<div style="padding-top: .88rem">-->
    <div>
        <!--<TopNav text="智能购药助手"/>-->
        <DialogueFlux/>
        <FooterArea/>
        <GlobalLoading/>
        <LabItem/>
    </div>
</template>

<script>
    import '../../css/inquiry.css'
    import $ from 'jquery'
    import {mapState} from 'vuex'
    import TopNav from '../title/index.vue'
    import DialogueFlux from '../dialogue/index.vue'
    import UserInfoModal from './userInfoModal.vue'
    import InquiryFooter from './footer.vue'
    import FooterArea from './footerArea.vue'
    import LabItem from './labItem.vue'
    import GlobalLoading from '../GlobalLoading.vue'

    export default {
        name: 'App',
        props: ['showProtocol'],
        components: {
            TopNav,
            DialogueFlux,
            UserInfoModal,
            InquiryFooter,
            LabItem,
            FooterArea,
            GlobalLoading
        },
        methods: {},
        created() {
            if (!this.$store.state.flagInquiry && this.$route.query.from) {
                this.$router.push('inquiry')
            }
        },
        computed: {
            ...mapState(['options', 'optionType', 'showPicker']),
            recall() {
                return this.$store.state.recall
            },

        },
    }
</script>
