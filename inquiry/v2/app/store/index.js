import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'

import symptoms from './modules/symptoms'

Vue.use(Vuex)

const state = {
     conversationID:'',
    ifrSearch: '',
    userId: '',
    token: '',
    topTitle: '智能购药助手',
    globalLoading: false,
    userInfoModal: true,
    userAge: '',
    userTel: '',
    userGender: 'GenderMale',

    question: [],
    slots: [{values: []}],
    selectOption: 1,
    showProtocol: false,    //显示用户协议
    options: [],
    optionType: '',     //当前选项type
    isFetching: false,
    showOptions: false,
    labModal: false,
    labItems: [],
    labResult: [],
    // Symptom
    currentSortIdx: 0,
    showPicker: true,

    wiki: {
        name: '百科',
        id: '',
        items: []
    },
    diagnoseResult: [   ], //疾病结果
    diagnosis: [],
    diagnose: [],
    recall: {
        recall: {},
        isRecall: false
    },
    report: [],
    num1: {},
    recallDetail: '',
    isRecall: false,
    forArray: [
       ],
    totalObj: {
        totalMoney: 0,
        totalNum: 0},
    footerHeight:'',
    drugUsePlans: [],
    drugPlansTitle:'',
    diseaseItems:[],
    flagInquiry:false,
    diseaseList:[],
    diseaseListContent:{},
    showDiseaseSearchResult:false,
    currentDepartmentIndex:0,
    selectedDisease:[],
    curDiseaseList:[],
    searchList: [],
    searchValue: '',
    medicalDetailInfo:{},
    talkContent:[],
    firstDisease:{},
    compareData:true,
    medicationList:[],
    modalShow:false,
    modalShowSuccess:false,
    symptomToInquryFlag:true,
    routeFlag:false,
    defaultImgIndex:0,
};

export default new Vuex.Store({
    state,
    // getters,
    actions,
    mutations,
    modules: {
        symptoms
    }
})
