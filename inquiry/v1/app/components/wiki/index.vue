<!--<style src="../../css/wiki.css"></style>-->

<template>
    <!--index.wxml-->
    <div class="udf_scroller" style="padding-top: .88rem;height: 100%;">
        <TopNav
                text="好药师-自诊助手"
                showBack="1"
        />
        <div class="container pad40" style="box-sizing: border-box;height: 100%;overflow: auto;">
            <div style="padding-bottom:20px;">
                <div class="list" style="font-size:.50rem;line-height:1rem;color:#111;font-weight:900;">
                    {{name}}
                </div>
                <div class="wikiList" v-for="(item,index) in wiki" :key="index">
                    <div class="list">
                        <div class="title" @click="clickTitle(index)">
                            <div class="text">{{item.title}}</div>
                            <div class="icon">
                                <span class="icon icomoon" :class="[item.show?'icon-shang':'icon-xia']"></span>
                            </div>
                        </div>
                        <div class="describe"
                             :style="{height:item.show?'auto':'0',paddingBottom:item.show?'.2rem':'0'}">
                            {{item.describe}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

    import '../../css/wiki.css';

    import TopNav from '../title/index.vue'
    export default {
        name: 'Wiki',
        components: {TopNav},
        computed: {
            name(){
                return this.$store.state.wiki.name || '';
            },
            wiki(){
                return this.$store.state.wiki.items || [];
            }
        },
        methods: {
            clickTitle(idx){
                this.$store.dispatch('wikiItemToggle', idx);
            }
        },
        beforeCreate(){
            if (this.$store.state.diagnose.length == 0) {
                this.$router.push('inquiry');
            }
        },
    }
</script>