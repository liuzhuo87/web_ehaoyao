
<template>
    <div id="labItem-modal" :class="[labItems.length>0 && labModal?'show':'hide']" v-if="labModal">
        <div class="scroll-wrap" >
            <div class="scrollView udf_scroller" style="height:100%;">
                <div  class="options"  v-for="(item,index) in labItems"  :key="index">
                    <div class="stem">
                        {{index+1}}、{{item.stem}}
                    </div>
                    <radio-group
                        :items="item.options"
                        :sourceData="item"
                        :valueChange="radioGroupChange"
                    />

                </div>
            </div>
        </div>

        <div class="btn-group" :style="{display:labItems.length>0 && labModal?'flex':'none'}">
            <div class="cancel cancelLab" @click="cancelLab">未做以上化验</div>
            <div class="sure submitLab" @click="sureLab" style="background:#FF2F4A;color:#fff;">确定</div>
        </div>
    </div>
</template>

<script>

    import RadioGroup from '../common/radio/radioGroup.vue';

    export default {
        name: 'LabItem',
        components: {
            RadioGroup
        },
        computed:{
            labItems(){
                return this.$store.state.labItems;
            },
            labModal(){
                return this.$store.state.labModal;
            }

        },

        methods:{
            cancelLab(){
                this.$store.dispatch('inquiryCancelLab')
            },
            sureLab(){
                let {labResult}=this.$store.state;
                if(labResult.length==0){
                    this.cancelLab()
                }else{
                    this.$store.dispatch('inquirySureLab');
                }

            },
            radioGroupChange(params){
                this.$store.dispatch('recordLabResult',params)
            }

        }
    }
</script>