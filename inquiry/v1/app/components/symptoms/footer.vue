<template>
    <div id="symptomFooter">
        <div class="clearfix scrollV" :style="{height:scrollH,bottom:scrollBot}">
            <div class="choice fll" @click="deleteChoice(item)" v-for="(item,index) in selected" :key="index" data-idx="index">
                <span class='fll' style="display: inline-block;margin-right: .10rem;">{{item.text}}</span>
                <span class="flr icon common icon-qingchu" style="margin-top: .20rem;"></span>
            </div>
        </div>
        <div class="sure" :class="{disabled:selected.length==0}" @click="clickSure">
            完成(
            <span>{{selected.length}}</span> 个症状)
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Cart',
        methods:{
            deleteChoice(item){
                this.$store.dispatch('setSymptomChoice',item);
            },
            clickSure(){
                let self=this;
                if(this.selected.length>0){
                    this.$store.dispatch('statisticApi',{eventName:'click_symptom_done'});
                    this.$store.dispatch('symptomRecordAnswer',{answer:this.selected,cb:function () {
                        self.$router.push({ path: 'inquiry',query:{from:'symptoms'}})
                    }});
                }
            }
        },
        computed:{
            selected(){
                return this.$store.state.symptoms.selected
            },
            scrollH(){
                return this.selected.length>0?'2.5rem':'0'
            },
            scrollBot(){
                return this.selected.length>0?'.98rem':'0'
            }
        }
    }
</script>