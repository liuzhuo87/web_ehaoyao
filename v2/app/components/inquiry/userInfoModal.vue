<!--用户基本信息输入框-->
<template>
  <div class="userInfoModal" v-if="userInfoModal">
    <div class="modalMask"></div>
    <div class="modalCont">
      <div style="font-size: 0.4rem;text-align: center;height: 1.8em;line-height: 1.4em;">
        基本信息
      </div>
      <!--性别-->
      <div class="gender inp-wrap">
        <div class="text" style="width: 25%;">性别</div>
        <div class="options" style="width:75%;justify-content: flex-end;">
          <radio-group
            :items="genders"
            :valueChange="genderChange"
            :defaultValue="userGender"
          />
        </div>
      </div>

      <!--年龄-->
      <div class="age inp-wrap">
        <div class="text" style="width:50%;">年龄(岁)</div>
        <div class="inp" style="width:50%">
          <input type='tel' placeholder="请输入年龄" @input="ageChange" style="height:100%;color:#666">
        </div>
      </div>
      <div class="tel inp-wrap" style="border-bottom:1px solid #eee;">
        <div class="text" style="width:50%;">手机</div>
        <div class="inp" style="width:60%">
          <input type="tel" maxlength="11" :value="userTel" @input="talChange" style="color:#666"
                 placeholder="请输入手机号">
        </div>
      </div>
      <div class="error" v-if="errorMsg!=''">{{errorMsg}}</div>
      <div class="beginAsk" @click="beginAsk">
        开始问诊
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import RadioGroup from '../common/radio/radioGroup.vue'

  export default {
    name: 'UserInfoModal',
    components: {
      RadioGroup
    },
    data () {
      return {
        errorMsg: '',
        genders: [
          {text: '男', value: 'GenderMale'},
          {text: '女', value: 'GenderFemale'}
        ]
      }
    },
    mounted () {
//            let {userInfoModal}=this;
//
//            if(userInfoModal){
//                this.$store.dispatch('statisticApi',{eventName:'view_main'});
//            }

    },
    methods: {
      ageChange (e) {
        this.$store.dispatch('userAgeChange', e.target.value)
      },
      beginAsk () {
        let {userAge, userGender, userTel} = this
        if (!Number(userAge) || userAge <= 0 || userAge > 120) {
          this.errorMsg = '年龄应当大于0，小于120'
          return
        }
        if (userGender === '') {
          this.errorMsg = '请选择性别'
          return
        }
        var reg = /^1[3|4|5|7|8|9][0-9]{9}$/
        if (!reg.test(userTel)) {
          this.errorMsg = '请输入正确的手机号'
          return
        }

        this.$store.dispatch('statisticApi', {
          eventName: 'view_introduce',
          customData: ['age=' + userAge, 'gender=' + userGender, 'tel=' + userTel]
        })
        this.$store.dispatch('userInfoModalToggle', false)
      },
      talChange (e) {
        this.$store.dispatch('userTelChange', e.target.value)
      },
      genderChange (params) {
        this.$store.dispatch('userGenderChange', params.result)
      }

    },
    computed: {
      ...mapState([
        'userInfoModal',
        'userAge',
        'userTel',
        'userGender'
      ])
    }

  }
</script>
