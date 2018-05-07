import {
    startFetch,
    sendTalkFetch,
    wikiFetch,
    statisticFetch,
    symptomsFetchPageData,
    sendDrugUsagePlans,
    fetchDiseaseIndex,
    sendShowMed,
    diseaseFetchPageData,
    sendDrugEntityUsagePlans,
    symptomsSearchAjax,
    statisticCartJsonApi
} from "../api";
import $ from 'jquery';
import {fetchType} from "../api/config";
import {ActionType} from "./mutation-types";
import {handleSymptomListFetch, handleDiseaseListFetch} from "../api/handleFetchData"
import {setSymotomList, setSymptomCategory, setDiseaseList, setDiseaseListContent} from "../store/modules/symptoms"
import router from '../router'

export const setLocationSearch = ({dispatch, commit}) => {
    let search = window.location.search,
        _search = search.substring(1).split('&'),
        url = '',
        token = '',
        userId = '';

    userId = new Date().getTime() + (parseInt(Math.random() * 9000) + 1000+"");
    _search.length > 0 && _search.map(val => {
        if (val.indexOf('ifr=') !== -1) {
            url = val.split('=')[1]
        } else if (val.indexOf('token=') !== -1) {
            token = val.split('=')[1]
        }
    });

    // test
    // token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6eyJhcHAiOnsiaWQiOiJ3eC1hcHAtZG9jdG9yIiwibmFtZSI6IuW-ruS_oemXruiviuWwj-eoi-W6jyJ9LCJ1c2VyIjp7ImlkIjoiM2IzYzU0MmNkODkyZDM1Njg5NDE1MGI0MTAwNjBhYWYxYjk1ZGEyZCJ9LCJzY29wZXMiOlsidXNlciIsImFpLnYxLmRvY3RvciIsImFpLnYxLmVudGl0eSIsImFpLnYxLnRleHQiLCJhaS52MS5hc3Npc3RhbnQiXX0sInV0Y3RpbWUiOiIyMDE3LTEwLTE5VDAwOjM4OjA5LjA3ODM2MTAyOVoiLCJ1dGNleHAiOiIyMDE3LTEwLTI2VDAwOjM4OjA5LjA3ODM2MTAyOVoifQ.I6czpSE0SoANuJV3mZrZ-jmdH6N1xoIYJBu3uD4JJLU2EXySjhLG7Ew4Qh20Um-vAq8ov72doUTkm3jnkeBZ-9BnvdPQxT27Hs9W0urP6cyIF6pOxhlhDGno1mp7vMHEyf9zCohK0vDOp_aYJ7ZmxWQdHLi8BpmT5DLng8c_Z9bBPzd0OVKkPa5-9EP369a3Izrlt6MNZlWfHtRj-LUxIVWt_mLDvqktuQlECCtwRUc3aO01SFZWGv9xT-d4bxC9acDJs3NYt2I_httpg0IcQfHyhLDtEfz3wpYpzTylz8l3RyiDx0CI9lJsiiLv6-xhNDdOfeihwxpQJcZPKbkVhQ'

    dispatch('statisticApi', {eventName: 'view_main', userId});

    commit(ActionType.SET_LOCATION_SEARCH, {
        url, token, userId
    })
}
export const userInfoModalToggle = ({commit}, toggle) => {
    commit(ActionType.USER_INFO_MODAL, {
        toggle
    })
}
export const addMedicationList = ({commit}, param) => {
    commit(ActionType.Add_MEDICATION_LIST, param)
}
export const setRouteFlag = ({commit}, param) => {
    commit(ActionType.SET_ROUTE_FLAG, param)
}
export const fetchDiseaseList = ({commit}, param) => {
    commit(ActionType.FETCH_DISEASE_LIST, param);
}
export const clearSymptomsSelected = ({commit, state}) => {
    commit(ActionType.CLEAR_SYMPTOMS_SELECTED, state);
}
export const minusQuantity = ({commit}, id) => {
    commit(ActionType.MINUS_QUANTITY, {
        id
    })
};
export const plusQuantity = ({commit}, id) => {
    commit(ActionType.PLUS_QUANTITY, {
        id
    })
};

export const storeInitQuestion = ({commit}) => {
    commit(ActionType.STORE_INIT_QUESTION)
}

export const showMedInfoFunc = ({commit, state}, params) => {
    showMed({commit, state, params})
}
export const storeInitRequestBody = ({commit}) => {
    commit(ActionType.STORE_INIT_REQUESTBODY)
}

export const storeInitResponseState = ({commit}) => {
    commit(ActionType.STORE_INIT_RESPONSESTATE)
}

export const userAgeChange = ({commit}, age) => {
    commit(ActionType.USER_AGE_CHANGE, {
        age
    })
}
export const userTelChange = ({commit}, tel) => {
    commit(ActionType.USER_TEL_CHANGE, {
        tel
    })
}

export const userGenderChange = ({commit}, gender) => {
    commit(ActionType.USER_GENDER_CHANGE, {
        gender
    })
}
export const globalLoadingToggle = ({commit}, toggle) => {
    commit(ActionType.GLOBAL_LAODING_TOGGLE, {
        toggle
    })
}

export const symptomRecordAnswer = ({commit}, params) => {
    commit(ActionType.SYMPTOM_RECORD_ANSWER, {
        params
    });
};
//购物车数据统计
export const cartJsonStatistic=({commit,state}, params)=>{
   toStatisticCartJson({commit, state, params})
};
//查看药品大图
export const pushPicture=({commit}, params)=>{
    commit(ActionType.PUSH_PICTURE,params);
};
export const toInquiry = ({commit, state}, par) => {
    toInquiryFunc({commit, state, par});
}
export const fetchQuestion = ({commit, state}) => {
    startFetchC({commit, state})
}
export const fetchFooterInfo = ({commit, state}, params) => {
    talkFetchFunc({commit, state, params})
}
export const drugUsagePlans = ({commit, state}, params) => {
    drugUsagePlansFunc({commit, state, params})
}
//症状搜索
export const symptomsSearch = ({commit, state}, params) => {
    symptomsSearchFunc({commit, state, params})
}
export const symptomsSearchNull = ({commit, state}) => {
    commit(ActionType.SET_SEARCH_RESUT);
}
export const drugEntityUsagePlans = ({commit, state}, params) => {
    drugEntityUsagePlansFunc({commit, state, params})
}
export const fetchDisease = ({commit, state}, params) => {
    fetchDiseaseFunc({commit, state, params})
}
export const toSetSearchResult = ({commit, state}, params) => {
    commit(ActionType.SET_SEARCH, params)
}
export const toSetDiseaseSearchResult = ({commit, state}, params) => {
    commit(ActionType.SET_DISEASE_SEARCH, params)
}
export const startDoctorInquiry = ({commit, state}, params) => {
    params.question = state.question;
    startDoctorInquiryFunc({commit, state, params})
}
export const toDiagnosis = ({commit, state}, params) => {
    commit(ActionType.TO_DIAGNOSIS, {
        params
    })
}
export const toSetReport = ({commit, state}, params) => {
    commit(ActionType.TO_REPORT, {
        params
    })
}
// 用户协议
export const Protocol = ({commit}, toggle) => {
    commit(ActionType.PROTOCOL, {
        toggle
    })
}

export const showOptionsToggle = ({commit}, toggle) => {
    commit(ActionType.INQUIRY_SHOWOPTIONS_TOGGLE, {
        toggle
    })
}

export const clickOptions = ({commit, state}, opt) => {
    commit(ActionType.INQUIRY_RECORD_OPTIONS, {
        opt
    })

    let {question} = state,
        len = question.length - 1,
        currentQ = question[len]

    if (currentQ.type == 'radio') {
        commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true})
        addRequestQ({commit, state})
    } else if (currentQ.type == 'labItem' && opt.value == 'no') {
        commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true})
        addRequestQ({commit, state})
    }
}

export const recordResult = ({commit, state}) => {
    commit(ActionType.INQUIRY_SUBMIT_RESOULT)
    commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true})

    addRequestQ({commit, state})
}

//未有以上症状
export const clickWithout = ({commit, state}) => {
    commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true})
    commit(ActionType.INQUIRY_CLICK_WIDTHOUT)
    addRequestQ({commit, state})
}

export const enterWiki = ({commit, state}, id) => {
    wikiFetch({
        id: id,
        token: state.token,
        cb(data) {
            commit(ActionType.WIKI_FETCH_DATA, {
                data
            });
            router.push({path: '/wiki'});
        }
    })
}
export const wikiItemToggle = ({commit}, idx) => {
    commit(ActionType.WIKI_ITEM_TOGGLE, {
        idx
    })
}

export const inquiryBackPrev = ({commit}) => {
    commit(ActionType.INQUIRY_BACK_PREV)
}
//症状跳转到首页停留在选择症状对话条处；
export const setSymptomToInqury = ({commit}) => {
    commit(ActionType.SET_SYMPTOM_TO_INQURY);
}

export const recordLabResult = ({commit}, params) => {
    commit(ActionType.INQUIRY_RECORD_LAB_RESULT, {
        params
    })
}

export const inquirySureLab = ({commit, state}) => {
    new Promise((resolve, reject) => {
        commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true})
        commit(ActionType.INQUIRY_SURE_LAB)
        resolve()
    }).then(() => {
        addRequestQ({state, commit})
    })
}

export const inquiryCancelLab = ({commit, state}) => {
    new Promise((resolve, reject) => {
        commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true})
        commit(ActionType.INQUIRY_CANCEL_LAB)
        resolve()
    }).then(() => {
        addRequestQ({state, commit})
    })
}

export const statisticApi = ({commit, state}, params) => {

    if (!params.userId) {
        params.userId = state.userId
    }
    try {
        statisticFetch(params)
    } catch (e) {
        console.log(e)
    }
}

function startFetchC({state, commit}) {
    setTimeout(() => startFetch({
        question: state.question,
        token: state.token,
        cb: function (params) {
            commit(ActionType.CONVERSATION_ID, params.id);
            commit(ActionType.INQUIRY_START_FETCH, params);
            commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: false});
            commit(ActionType.SHOW_LOADING, false);

        }
    }), 500)
}

function toInquiryFunc({state, commit, par}) {
    let {question} = state,
        selected = state.symptoms.selected,
        self = this;
    if (par.params && selected.length > 0) {
        init(state);
        actionClickFinish('ask-symptoms', state);
        let talkFetchParams = {
            params: {
                value: selected,
                type: 'symptomList'
            }, state, commit
        };
        setTimeout(function () {
            talkFetchFunc(talkFetchParams);
        }, 400)
    }
}
//购物车数据统计
function toStatisticCartJson({state, commit, params}) {
    params.userId=state.userId;
    statisticCartJsonApi({
        data: params,
        token: state.token,
        cb: function (data) {
            console.log(data);
        }
    })
}

function init(state) {
    let {question} = state,
        len = question.length - 1;

    let newQuestion = JSON.parse(JSON.stringify(question));
    // dialog: 'dialog' + len

    state.question = newQuestion;
    return state;
}

function actionClickFinish(commandid, state) {
    if ((commandid == 'ask-symptoms' &&
            state.symptoms.selected.length == 0)
        || commandid == 'show-doctor-inquiry-history') {
        return;
    }
    disabledAction(state)
}

function disabledAction(state) {
    let {question} = state,
        _dataList = JSON.parse(JSON.stringify(question)),
        _len = _dataList.length,
        _curLi = _dataList[_len - 1],
        _curStemsArr = _curLi.stems;
    for (let i = 0; i < _curStemsArr.length; i++) {
        if (_curStemsArr[i].action && !_curStemsArr[i].finish) {
            _curStemsArr[i].finish = true;
        }
    }
    state.question = _dataList;
}

function talkFetchFunc(_params) {
    var {state, commit, params} = _params;
    var data = handledTalkData(params, state);
    sendTalkFetch({
        data: data,
        token: state.token,
        cb: function (params) {
            commit(ActionType.INQUIRY_TALK_FETCH, params);
            commit(ActionType.INQUIRY_TALK_CONTENT_FETCH, params);
            commit(ActionType.SET_COMPARE_DATA, true);
        }
    })
}

function showMed(_params) {
    var {state, commit, params} = _params;
    var {param, cb} = params;
    sendShowMed({
        data: param,
        token: state.token,
        cb: function (cbData) {
            // commit(ActionType.INQUIRY_TALK_FETCH, cbData);
            commit(ActionType.MEDICAL_DETAIL_INFO, cbData);
            cb();
        }
    })
}

function drugUsagePlansFunc({state, params, commit}) {
    let {sid, ids, callback, name} = params;
    let data = {sid, ids};
    sendDrugUsagePlans({
        data: data,
        token: state.token,
        cb: function (result) {
            commit(ActionType.DRUG_USAGE_PLANS, result);
            commit(ActionType.DRUG_PLANS_TITLE, name);
            if (callback) {
                callback();
            }
        }
    })
}

//症状搜索
function symptomsSearchFunc({state, params, commit}) {
    let {text} = params;
    symptomsSearchAjax({
        data: text,
        token: state.token,
        cb: function (result) {
            commit(ActionType.DISEASE_SEARCH_LIST, result);
        }
    })
}

function drugEntityUsagePlansFunc({state, params, commit}) {
    let {ids, callback, name} = params;
    let data = {ids};
    sendDrugEntityUsagePlans({
        data: data,
        token: state.token,
        cb: function (result) {
            commit(ActionType.DRUG_USAGE_PLANS, result);//给前面判断条件self.drugUsePlans
            commit(ActionType.DRUG_PLANS_TITLE, name);
            if (callback) {
                callback();
            }
        }
    })
}

function fetchDiseaseFunc({state, params, commit}) {
    let {text, types} = params;
    let _param = {text, types};
    let self = this;
    state.searchValue = text;
    fetchDiseaseIndex({
        data: _param,
        token: state.token,
        cb: function (result) {
            commit(ActionType.DISEASE_FETCH, result);
            params.cb();
        }
    })
}

function startDoctorInquiryFunc({params, state, commit}) {
    var data = handledTalkData(params, state);
    sendTalkFetch({
        data: data,
        token: state.token,
        cb: function (params) {
            commit(ActionType.INQUIRY_TALK_FETCH, params);
            commit(ActionType.FINISH, true);
        }
    })
}

function setFetchType(type) {
    let resType = '',
        optType = '';
    for (let i = 0; i < fetchType.length; i++) {
        if (type == fetchType[i].type) {
            resType = fetchType[i].res || fetchType[i].req;
            break;
        }
    }
    return {resType};
}

export function handledTalkData(params, state) {
    let {question} = state,
        self = this,
        _dataList = JSON.parse(JSON.stringify(question)),
        _len = _dataList.length,
        curLi = _dataList[_len - 1],
        curId = curLi.id,
        curSN = curLi.sn,
        optionType = curLi.optType,
        data;
    let {resType} = setFetchType(optionType),
        input = {
            "@type": resType
        };
    data = {
        "id": curId,
        "sn": parseFloat(curSN) + 1
    };
    if (params.value) {
        if (optionType == 'FreeText') {
            input.text = params.value;
        } else if (optionType == 'TextOptions') {
            input.key = params.value;
        } else if (optionType == 'AskSymptoms') {
            if (params.type == 'symptomList') {
                input.symptoms = params.value;
            } else if (params.type == 'symptomText') {
                input.text = params.value;
            }

        } else if (optionType == 'AskLabItemOptions') {
            if (params.type == 'skip') {
                input.skip = params.value
            } else if (params.type == 'keys') {
                input.keys = params.value;
            }
        } else if (optionType == 'SaveOptions') {
            input.save = params.save;
            if (params.save) {
                input.name = params.name;
            }
        } else if (optionType == 'ImageOptions') {
            input.key = params.value
        }

        data.input = input;
    }

    if (params.commands) {
        data.commands = [{
            id: params.commands.id
        }]
    }
    return data;
}

export function clone(from) {
    if (from instanceof Array) {
        return cloneArr(from);
    } else if (from instanceof Object) {
        return cloneObj(from);
    } else {
        return (from);
    }
}

export function cloneObj(from) {
    return Object.keys(from)
        .reduce((obj, key) => (obj[key] = clone(from[key]), obj), {});
}

export function cloneArr(from) {
    return from.map((n) => clone(n));
}

export const recordUserInp = ({commit, state}, params) => {
    recordUserInpFunc({commit, state, params})
}
export const setFinish = ({commit, state}, params) => {
    commit(ActionType.FINISH, params)
}

export const flagSetToInquiry = ({commit, state}, params) => {
    commit(ActionType.FLAG_TO_INQUIRY, params)
}
export const showLoading = ({commit, state}, params) => {
    commit(ActionType.SHOW_LOADING, params)
}
export const setCompareData = ({commit, state}, params) => {
    commit(ActionType.SET_COMPARE_DATA, params)
}


export function recordUserInpFunc({commit, state, params}) {
    let self = this,
        {options, question, optionType} = state,
        _dataList = JSON.parse(JSON.stringify(question)),
        _len = _dataList.length,
        _curLi = _dataList[_len - 1];
    _curLi.answer = params;
    drawFlux({
        question: _dataList
    }, function (data) {
        commit(ActionType.INQUIRY_CHANGE_TALK_FLUX, data)
    })
}

function drawFlux(params, cb) {
    let {question} = params,
        _dataList = params.question || question,
        _len = _dataList.length,
        _lastLi = _dataList[_len - 1],
        {optType, asking} = _lastLi,
        {options} = asking,
        footerH,
        toView;

    if (optType == 'FreeText' || (optType == 'TextOptions' && options.length == 1) || optType == 'AskSymptoms' || optType == 'AskLabItemOptions') {
        footerH = '1rem'
    } else if (optType == 'SaveOptions') {
        footerH = "2.02rem"
    } else {
        footerH = '4.60rem'
    }

    if (_lastLi.answer.length > 0) {
        toView = 'dialog' + (_lastLi.sn + 1)
    } else {
        toView = 'dialog' + (_lastLi.sn)
    }

    // console.log('toView : ' + toView);
    // let json = Object.assign({}, params, {
    //     toView,
    //     footerHeight: footerH
    // });
    let json=$.extend({}, params, {
        toView,
        footerHeight: footerH
    });
    typeof cb == 'function' && cb(json);

}

//获取症状列表数据
export const getSymptom = ({commit, state}, params) => {
    getSymptomList({commit, state, params})
};

//疾病找药
export const getDiseaseForStart = ({commit, state}) => {
    getDiseaseForStartFunc({commit, state})
};
//疾病分类点击
export const setCurrentDiseaseSort = ({commit, state}, param) => {
    commit(ActionType.DISEASE_SET_CURRENT_SORT, param)
};

function getSymptomList({commit, state}) {
    let self = this,
        {userAge, userGender} = state;

    symptomsFetchPageData({
        age: userAge,
        gender: userGender,
        token: state.token,
        cb(data) {
            let {_list, _sort} = handleSymptomListFetch(data);
            setSymotomList(_list);
            setSymptomCategory(_sort);
            commit(ActionType.CLEAR_SYMPTOMS_SELECTED, state);
            router.push({path: '/symptoms'});
        }
    })
}

function getDiseaseForStartFunc({commit, state}) {
    let self = this;
    diseaseFetchPageData({
        token: state.token,
        cb(data) {
            let {_list, _listContent} = handleDiseaseListFetch(data);
            commit(ActionType.DISEASE_FETCH_LIST, {_list, _listContent});
            router.push({path: '/diseaseList'});
        }
    })
}
