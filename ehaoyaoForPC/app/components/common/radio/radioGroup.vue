<!--<style src="../../../css/common/radioGroup.css"></style>-->
<template>
    <div class="radio-group">
        <label class="radio" v-for="(radioItems,idx) in items" :key="idx">
            <div class="iconRadio" :class="{active:radioItems.key==result}">
                <div class='pickedIcon' v-if="radioItems.key==result">
                    <span class="icon icon-approval"></span>
                </div>
            </div>
            <input type="radio" :value="radioItems.key" v-model="result"/>
            <span>
                {{radioItems.text}}
            </span>

        </label>
    </div>
</template>

<script>

    import '../../../css/common/radioGroup.css'

    export default {
        name: 'RadioGroup',
        props: ['items','idx', 'valueChange', 'defaultValue', 'sourceData'],
        data () {
            return {
                result: ''
            }
        },
        mounted () {
            if (this.defaultValue) {
                this.result = this.defaultValue
            }
        },
        watch: {
            result (val) {
                let self = this,
                        params = {
                            result: val,
                            idx:this.idx
                        }
                if (this.sourceData) {
                    params.source = this.sourceData
                }
                this.valueChange(params)
            }
        }

    }
</script>
