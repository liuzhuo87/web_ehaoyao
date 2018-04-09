<template>
    <div class="inquiry-patient dialog">
        <div>
            <div>
                <div class="topic">
                    <div v-for="item in answer">
                        <div v-if="item.value">
                            <div class="comPad" v-if="item.type=='text'&& !((item.value) instanceof Array)"
                                 :style="{workWrap:'break-word'}" style="padding: .18rem .3rem">
                                {{item.value}}
                            </div>
                            <div class="comPad" v-if="(item.value) instanceof Array"
                                 style="text-align:left;work-wrap:'break-word'">
                                 <!--:style="{textAlign: item.value.length>3?'left':'center',workWrap:'break-word'}">-->
                                {{item.value.join(',')}}
                            </div>
                            <div class='imgWrap comPad' v-else-if="item.type=='image'"
                                 style="width:2.6rem;height: 2rem;border-radius: .5rem;background-color: #fff">
                                <img class='image' :src='item.value.image' style="width: 100%;height: 100%"/>
                                <div class='text ell patient-text'>{{item.value.altText}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Patient',
        props: ['answer'],
        components: {}
    }
</script>
<style>
    .patient-text {
        height: .5rem;
        line-height: .5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        display: inline-block;
        background: rgba(21, 37, 53, 0.6);
        color: #fff;
        text-align: center;
        padding: 0 .40rem;
        box-sizing: border-box;
        border-radius: 0 0 .36rem .36rem;
    }
</style>
