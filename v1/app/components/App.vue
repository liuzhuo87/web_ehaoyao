
<template>
    <div class="content udf_scroller">
        <global-loading />
        <router-view></router-view>
    </div>
</template>

<script>
    import '../css/app.css';

    import GlobalLoading from './GlobalLoading.vue';
    export default {
        name: 'App',
        components: {
            GlobalLoading
        },
        mounted(){
            this.checkVersion();
            this.$store.dispatch('setLocationSearch');
        },
        methods:{
            checkVersion(){
                let str= navigator.userAgent.toLowerCase();
                let ver=str.match(/cpu iphone os (.*?) like mac os/);
                if(ver){
                    var _ver=ver[1].replace(/_/g,'.');
                    if(_ver<9){
                        alert('您的手机版本较低，请升级后再使用！');
                    }
                }
            }
        }
    }
</script>
