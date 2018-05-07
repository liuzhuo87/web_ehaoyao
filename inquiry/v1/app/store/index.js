import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import mutations from "./mutations";

import symptoms from './modules/symptoms'

Vue.use(Vuex);

const state = {
    ifrSearch:'',
    userId:'',
    token:'',
    topTitle: '好药师-自诊助手',
    globalLoading:false,
    userInfoModal:true,
    userAge:'',
    userTel:'',
    userGender:'GenderMale',

    question: [
        {
            type: 'radio',
            stem: '您有什么不舒服？',
            options: [],
            answer: []
        }
    ],
    requestBody: {
        "patient": {
            "basic": {
                "age": {
                    "year": ''
                },
                "gender": 'GenderMale'
            },
            "symptoms": [],
            "labItems": [],
            "pastDiseases": []
        },
        "options": {
            "askSymptomSize": 3,
            "enableInteractionTimesLimitation": true,
            "diagnoseSize": 6
        },
        "skipActions": [  //跳过的询问项
            "DoctorInquiryActionAskBasicInfo",  //基本信息
            "DoctorInquiryActionAskLivingHabit",  //生活习惯
            "DoctorInquiryActionAskVitalSign",   //生命体征
            "DoctorInquiryActionAskSign"    //体征
        ],
        "state": ''
    },
    responseState: [],
    isFetching:false,
    showOptions:false,
    labModal: false,
    labItems:[],
    labResult:[],

    wiki: {
        name: '百科',
        id: '',
        items: []
    },
    diagnose: [],
    recall: {
        recall: {},
        isRecall: false
    }
}


export default new Vuex.Store({
    state,
    // getters,
    actions,
    mutations,
    modules:{
        symptoms
    }
})
