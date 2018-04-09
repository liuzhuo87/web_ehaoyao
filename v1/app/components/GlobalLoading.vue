<template>
    <div id="globalLoading" v-if="loadingShow">
        <div class="cont">
            <div class="loading" >
                <img src="../images/loading.svg" style="width:1.4rem;height:1.4rem;"/>
            </div>
            <div>
                加载中...
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'GlobalLoading',
        components: {},
        computed:{
            loadingShow(){
                return this.$store.state.globalLoading;
            }
        }
    }
</script>
