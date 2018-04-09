<!--<style src="../../css/inquiry.css"></style>-->
<template>
    <div style="padding-top: .88rem">
        <TopNav
                text="好药师-自诊助手"
        />
        <UserInfoModal/>
        <DialogueFlux/>
        <InquiryFooter/>
        <LabItem/>
    </div>
</template>

<script>

    import '../../css/inquiry.css';

    import TopNav from '../title/index.vue'
    import DialogueFlux from '../dialogue'
    import UserInfoModal from './userInfoModal.vue'
    import InquiryFooter from './footer.vue'
    import LabItem from './labItem.vue'

    export default {
        name: 'App',
        components: {
            TopNav,
            DialogueFlux,
            UserInfoModal,
            InquiryFooter,
            LabItem
        },
        created(){

        },

    }
</script>