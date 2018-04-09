<template>
  <div id="inquiryFooter">
    <div class="footer-btn comPad" style="justify-content: space-between">
      <div @click="clickRestart" style="width:40%" id='inquiry_click_restart_btn'>
        <span class="icon common icon-shouye"
              style="margin-top: .20rem;margin-right:.12rem;"></span>重新问诊
      </div>

      <div @click="backPrev" style="width:50%;" id='inquiry_click_backprev_btn'
           v-if="question.length>1 && diagnose.length===0 && showBtn">
        <span class="icon common icon-fanhuisjamguoto"
              style="margin-top: .20rem;margin-right:.10rem;"></span>
        上一步
      </div>

      <div @click="footerToggle" v-if="question.length>1 && diagnose.length===0 && showBtn"
           style="text-align:right;padding-right: .1rem;box-sizing: border-box;">
        <span class="icon icomoon" :class="footerToggleIcon"></span>
      </div>
      <div @click="sendMessage" v-if="diagnose.length>0"
           style="text-align:right;padding-right: .1rem;box-sizing: border-box; text-align: center;width:40%;color: #FF2F4A;">
        <span class="icon icomoon icon-union"></span>
        查看症状
      </div>
    </div>

    <div class="options-wrap" :style="{height:optionsWrapStyle}" v-if="diagnose.length===0">
      <div class='options clearfix udf_scroller' :style="{maxHeight:optionsStyle}">
        <div class="option-list fll" :class="{selected:item.selected}"
             v-for="(item,index) in options"
             :key="index" @click="clickOption(item)">
          {{item.text}}
          <div class="tri-icon" v-if="item.selected">
            <!--<img src="../../images/x1.svg" style="width:100%;height:100%;"/>-->
          </div>
        </div>
      </div>
      <div class="submit clearfix " v-if="currentType==='checkbox'">
        <div class="without-sel fll">
          <span @click="clickWithout" style="display:inline-block">未有以上症状</span>
        </div>
        <div class="submitBtn flr" :class="{disabled:!allowSend}" @click="recordResult">发送</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'InquiryFooter',
    data () {
      return {
        showBack: false,
        haveResult: false,
//                loadingShow: false,
        options: [],
        currentType: '',
        showBtn: true

      }
    },
    components: {},
    beforeMount () {
      this.setState()
    },
    computed: {
      question () {
        return this.$store.state.question
      },
      showOptions () {
        return this.$store.state.showOptions
      },
      optionsWrapStyle () {
        return this.showOptions ? '2.96rem' : '0rem'
      },
      optionsStyle () {
        return this.currentType === 'checkbox' ? '2.30rem' : '2.82rem'
      },
      footerToggleIcon () {
        return this.showOptions ? 'icon-xia' : 'icon-shang'
      },
      diagnose () {
        return this.$store.state.diagnose
      },
      allowSend () {
        let {question} = this.$store.state,
          len = question.length - 1,
          curOpt = question[len].options,
          allowSend = false

        curOpt.map(val => {
          if (val.selected) {
            allowSend = true
          }
        })

        return allowSend
      }
    },
    watch: {
      question () {
        this.setState()
      }
    },
    methods: {
      setState () {
        let {question} = this.$store.state,
          len = question.length - 1,
          currentQ = question[len]

        this.options = currentQ.options
        this.currentType = currentQ.type

        if (currentQ.action === 'DoctorInquiryActionDiagnose') {
          this.showBack = false
          this.showBtn = false
          this.$store.dispatch('showOptionsToggle', false)
          return
        }

        if (len > 0 && this.diagnose.length === 0) {
          this.showBack = true
          this.$store.dispatch('showOptionsToggle', true)
        } else {
          this.showBack = false
          this.$store.dispatch('showOptionsToggle', false)
        }
      },

      // 重新开始
      clickRestart () {
        window.location.reload()
      },
      // 返回上一题
      backPrev () {
        if (!this.showBack) {
          return
        }
        this.$store.dispatch('inquiryBackPrev')
      },
      // 底部区toggle
      footerToggle () {
        this.$store.dispatch('showOptionsToggle', !this.showOptions)
      },
      clickOption (item) {
        this.$store.dispatch('clickOptions', item)
      },
      clickWithout () {
        this.$store.dispatch('clickWithout')
      },
      recordResult () {
        if (this.allowSend) {
          this.$store.dispatch('recordResult')
        }
      },
      sendMessage () {
        let {userAge, userGender, userTel, diagnoseList, recall} = this.$store.state
        let message = {
          userAge: userAge,
          userGender: userGender,
          userTel: userTel,
          diagnose: diagnoseList.items,
          recall: recall,
          source: 'rxthinking'
        }

        window.parent.postMessage(JSON.stringify(message), this.$store.state.ifrSearch)
      }
    }
  }
</script>
