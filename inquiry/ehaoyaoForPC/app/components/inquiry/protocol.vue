<!-- 用户协议 -->
<template name="protocol">
    <div class='protocol' :style="{height:wrapMaxH,marginBottom:wrapBtm}" ref="dialogueWrapProtocol">
        <div class="scroll-view">
            <div style="font-weight:900;text-align:center;text-indent:0;">大数健康系统使用条款（下称“使用条款“）
            </div>
            <div>使用条款构成您和北京大数医达科技有限公司（下称“大数医达”）之间的法律协议条款，它还规定了您的权利与义务与我们的权利与义务。</div>
            <div style="font-weight:900">最后修订：2017年7月2日</div>
            <div style="font-weight:900">概述</div>
            <div>大数健康系统是大数医达旗下一款在线健康测评辅助系统（下称“智能测评”）。</div>
            <div>
                本使用条款是您与大数医达之间有关使用智能测评的协议条款。访问或使用智能测评，即表示您已阅读、理解并同意受这些条款的约束，同意遵守所有适用的法律和法规。如果您不同意这些条款，请勿使用智能测评。
            </div>
            <div>
                智能测评并非医疗机构，其给出的建议都是基于您输入的有限数据以及医疗大数据模型算法，任何该等建议不但不代表大数医达同意其说法，亦不能替代执业医师的真实诊疗和医嘱。
            </div>
            <div>
                大数医达可随时修改这些“使用条款”以及智能测评中包含的任何其他信息，而无需通知您。大数医达还可随时对智能测评系统中功能、服务或程序作出改进或更改，而无需事先通知您。
            </div>
            <div style="font-weight:900">一般条款</div>
            <div>
                使用条款还包含所有权/版权申明和隐私条款，您除了必须遵守使用条款，还必须服从所有权/版权申明以及隐私条款。所有权/版权申明和隐私条款，请点击题为“所有权/版权申明”和“隐私条款”的标签。
            </div>
            <div>
                在您同意遵守使用条款、相关法律规定的前提下，大数医达授予您一份非专属的、不可转让的有限许可，允许您作为用户访问和使用智能测评。此项许可不包括您恶意使用智能测评，或为了任何侵权的目的使用智能测评。
            </div>
            <div>
                除了上一段所述的有限许可权，大数医达并未授予您任何明示或默示的专利、商标、版权或其他专有权、知识产权的权利或许可。您不得在另一个网站或移动端应用或任何其他介质中使用或复制智能测评的任何内容。如果您未能遵守使用条款，将会导致授予您的任何权利被自动终止，而无需事先通知，并且您必须立即停止使用智能测评并销毁持有、保管或控制的所有智能测评资料。
            </div>
            <div style="font-weight:900">免责声明</div>
            <div>使用智能测评的所有风险由您自行承担。</div>
            <div>
                智能测评并非医疗机构，其给出的建议系基于您输入的有限数据以及医疗大数据模型算法，任何该等建议不但不代表大数医达同意其说法，且大数医达对任何该等建议不做任何保证，对该等建议或由其造成的后果亦不承担任何责任。
            </div>
            <div>智能测评是一个在线系统，对于因不可抗力或不能控制的原因造成的网络服务中断或其它缺陷，大数医达不承担任何责任。</div>
            <div>智能测评有时可能会包含不准确的技术信息或文字错误，我们对任何发布信息的准确性不作任何保证。</div>
            <div>
                所有资料、信息、产品、软件、程序和服务均“按现状”提供，大数医达对此不提供任何形式的保证或担保。大数医达明确免除法律所允许的最大范围内的所有明示的、默示的、法定的及其他保证、担保或陈述，包括但不限于有关适销性、适用于某种特定用途、不侵犯所有权和知识产权的保证。不存在任何限制，大数医达不保证智能测评将连续运行、及时、安全或无错误。
            </div>
            <div style="font-weight:900">保密信息</div>
            <div>
                大数医达并不希望通过智能测评接收您的保密信息或专有信息。您同意您在智能测评上输入的所有信息或资料都将被视为非保密信息。将任何信息或资料发送给大数医达，即表示您就该等信息与资料授予大数医达不受限制的、不可撤销的使用许可。
            </div>
            <div style="font-weight:900">业务关系</div>
            <div>
                智能测评可能提供非大数医达网址和资源的链接或引用。大数医达对于引用的，或可从智能测评进行访问的，或链接到任何智能测评的任何非大数医达网址或第三方资源不作任何声明、保证、认可或其他承诺。
            </div>
            <div style="font-weight:900">责任限制</div>
            <div>
                在适用法律允许的最大范围内，在任何情况下，对于与智能测评有关的、由智能测评引起的或使用智能测评、使用通过智能测评链接到的、引用的或访问的任何站点或资源，或者使用、下载或访问任何上述站点的资料、信息、产品或服务而造成的任何直接的、间接的、附带的、特别的、惩罚性的或其他后果性的损害，大数医达均不对任何一方负责。
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import { mapState } from 'vuex'
    import Protocol from '../inquiry/protocol.vue'
    import '../../css/inquiry.css'
    export default {
        name: 'Protocol',
        components: {
        },
        mounted() {
            this.setScrollH()
        },
        updated() {
            this.setScrollH()
        },
        computed: {
//            ...mapState(['userInfoModal', 'question', 'showOptions', 'diagnose']),
            ...mapState(['userInfoModal', 'question', 'showOptions', 'diagnose', 'showProtocol']),
            wrapBtm() {
                let { winH, root } = this.getH()

//                if (!this.showOptions || this.diagnose.length > 0) {
//                    return root * 1 + 'px'
//                } else {
//                    return root * 4 + 'px'
//                }

                if (!this.showOptions || this.diagnose.length > 0) {
                    return (root * 1)/root + 'rem'
                } else {
                    return (root * 4 )/root+ 'rem'
                }
            },
            wrapMaxH() {
                let { winH, root } = this.getH()

//                if (this.diagnose&&this.diagnose.length > 0 || !this.showOptions) {
//                    return winH - root * 0.88 - root * 1 + 'px'
//                } else {
//                    return winH - root * 0.88 - root * 4 + 'px'
//                }

                if (this.diagnose&&this.diagnose.length > 0 || !this.showOptions) {
                    return (winH - root * 0.88 - root * 1)/root+ 'rem'
                } else {
                    return (winH - root * 0.88 - root * 4)/root + 'rem'
                }
            },

            enterSymptoms() {
                let { question } = this.$store.state
                if (question[0].answer.length > 0) {
                    return false
                } else {
                    return true
                }
            }
        },

        watch: {
            wrapMaxH() {
                let self = this
                setTimeout(function () {
                    self.setScrollH()
                }, 400)

            },

            question() {
                let self = this
                setTimeout(function () {
                    self.setScrollH()
                }, 400)
            }
        },
        methods: {
            getH() {
                let h = null,
                    winH = parseFloat($(window).height()),
                    root = parseFloat($('html').css('fontSize'));

                return { winH, root }
            },
            setScrollH() {
                this.$refs.dialogueWrapProtocol.scrollTop = this.$refs.dialogueWrapProtocol.scrollHeight - 10
            }

        }
    }
</script>