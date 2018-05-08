<template>
    <div class="content udf_scroller" style="margin-top:30px;margin-left:40%;width:375px;">
        <global-loading />
        <router-view></router-view>
    </div>
</template>

<script>
    import '../css/app.css';
    import Vue from 'vue';
    import {mapState} from 'vuex'
    import GlobalLoading from './GlobalLoading.vue'

    export default {
        name: 'App',
        components: {
            GlobalLoading,
        },
        data(){
            return{
            }
        },
        created() {
        },
        mounted() {
            this.$store.dispatch('setLocationSearch');
        },
        methods: {
            checkVersion() {
                let str = navigator.userAgent.toLowerCase()
                let ver = str.match(/cpu iphone os (.*?) like mac os/)
                if (ver) {
                    var _ver = ver[1].replace(/_/g, '.')
                    if (_ver < 9) {
                        alert('您的手机版本较低，请升级后再使用！')
                    }
                }
            }
        },
        computed: {
            ...mapState(['routeFlag','symptomToInquryFlag','symptoms']),
        },
        watch:{
            $route(to,from){
                let self=this;
                if(to&&to.query&&to.query.from=='symptoms'){
                    self.$store.dispatch('setRouteFlag',true);
                };
                if(this.routeFlag){
                    if(to&&to.path&&to.path=='/symptoms'){
                        if(from&&from.path&&from.path=='/inquiry'){
//                                  console.log(window);
//                                console.log(window.location);
//                            console.log(this.symptoms.selected);
//                            if(this.symptoms.selected.length>0){
//                                let url=window.location.href;
//                                console.log('url',url);
//                                alert(url);
//                                window.history.go(-1);
//                              window.location.href=url;
//                            }
                        }
                    }
                }
                if(to&&to.path&&to.path=='/inquiry'){
                    if(from&&from.path&&from.path=='/diseaseList'){
                        if(!this.symptoms.selected.length>0){
                            window.location.href = document.referrer;//返回上一页并刷新
                        }
                    }
                }
            }
        }
    }
</script>
