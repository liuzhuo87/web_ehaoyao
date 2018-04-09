<template>
    <section class="show-big-picture" style="height:100%;overflow:auto;
    -webkit-overflow-scrolling: touch;background-color: #ffffff">
        <mt-swipe :auto="0" :defaultIndex="defaultImgIndex">
            <mt-swipe-item v-for="(item,index) in medicalDetailInfo.images">
                <div style="height: 100%;width: 100%;display: table;text-align: center;">
                    <div style="width:100%;height:100%;display: table-cell; vertical-align: middle;"
                    @click.top="backMedicationInfo">
                        <img :src="item.url" style="width: 100%"/>
                    </div>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </section>
</template>
<script>
    import $ from 'jquery';
    import {mapState} from 'vuex';

    export default {
        name: 'ShowBigPicture',
        components: {},
        data() {
            return {}
        },
        created() {
            if (!this.medicalDetailInfo.id) {
                this.$router.push('inquiry')
            }
        },
        computed: {
            ...mapState(['medicalDetailInfo', 'defaultImgIndex']),
        },
        watch: {},
        methods: {
            backMedicationInfo(){
                window.history.go(-1);
            }
        }
    }

</script>