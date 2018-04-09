import {ActionType} from "./mutation-types";
import {statisticFetch} from '../api/index'

export default {
    [ActionType.SET_LOCATION_SEARCH](state,{url,token,userId}){
        state.ifrSearch=url;
        state.token=token;
        state.userId=userId;
    },
    [ActionType.STORE_INIT_QUESTION](state){
        state.question=[
            {
                type: 'radio',
                stem: '您有什么不舒服？',
                options: [],
                answer: []
            }
        ]
    },
    [ActionType.STORE_INIT_REQUESTBODY](state){
        let _requestBody=JSON.parse(JSON.stringify(state.requestBody)),
            {patient}=_requestBody,
            {symptoms,labItems,pastDiseases}=patient;
        symptoms=[];
        labItems=[];
        pastDiseases=[];
        _requestBody.state='';
        _requestBody.skipActions=[
            "DoctorInquiryActionAskBasicInfo",
            "DoctorInquiryActionAskLivingHabit",
            "DoctorInquiryActionAskVitalSign",
            "DoctorInquiryActionAskSign"
        ];
        state.requestBody=_requestBody;
    },
    [ActionType.STORE_INIT_RESPONSESTATE](state){
        state.responseState=[];
    },
    [ActionType.USER_INFO_MODAL] (state, {toggle}) {
        state.userInfoModal = toggle;
    },
    [ActionType.USER_AGE_CHANGE] (state, {age}) {
        state.userAge = age;
        state.requestBody.patient.basic.age.year = parseInt(age);
    },
    [ActionType.USER_TEL_CHANGE](state,{tel}){
        state.userTel = tel;
    },
    [ActionType.USER_GENDER_CHANGE] (state, {gender}) {
        state.userGender = gender;
        state.requestBody.patient.basic.gender = gender;
    },
    [ActionType.INQUIRY_SHOWOPTIONS_TOGGLE](state, {toggle}){
        state.showOptions = toggle;
    },
    [ActionType.GLOBAL_LAODING_TOGGLE](state,{toggle}){
        state.globalLoading=toggle;
        state.isFetching=toggle;
    },

    // 记录症状列表结果
    [ActionType.SYMPTOM_RECORD_ANSWER](state, {params}){
        let {question, requestBody}=state,
            {answer,cb}=params,
            _question = JSON.parse(JSON.stringify(question)),
            _requestBody = JSON.parse(JSON.stringify(requestBody)),
            len = _question.length - 1,
            currentQ = _question[len];

        if (len == 0) {
            let arr = [],
                _arr = [];

            answer.map(val=> {
                arr.push(val.text);
                _arr.push({id: val.id})
            });

            currentQ.answer.push(arr.join(' , '));
            _requestBody.patient.symptoms = _arr;

        }
        state.question = _question;
        state.requestBody = _requestBody;
        cb();
    },

    [ActionType.INQUIRY_FETCH_QUESTION](state, {params}){
        handleFetchQuestion(state, params);
    },

    //记录用户选项
    [ActionType.INQUIRY_RECORD_OPTIONS](state, {opt}){
        recordOptions(state, opt);
    },

    [ActionType.INQUIRY_SUBMIT_RESOULT](state){
        recordResult(state);
    },

    [ActionType.INQUIRY_CLICK_WIDTHOUT](state){

        let _question = JSON.parse(JSON.stringify(state.question)),
            _requestBody = JSON.parse(JSON.stringify(state.requestBody)),

            {symptoms} = _requestBody.patient,
            len = _question.length - 1,
            currentQ = _question[len],
            {options} = currentQ;

        options.map((val, idx) => {
            symptoms.push({id: val.value, state: 'FeatureStateNegative'});
        });

        currentQ.answer = ['没有'];

        state.question = _question;
        state.requestBody = _requestBody;
    },
    [ActionType.INQUIRY_BACK_PREV](state){
        backPrev(state);
    },
    [ActionType.WIKI_FETCH_DATA](state, {data}){
        let wiki = {
            id: data.id,
            name: data.name,
            items: []
        }
        data.chapters.length > 0 && data.chapters.map((val, idx) => {
            wiki.items.push({
                title: val.title,
                describe: val.text,
                show: idx == 0 ? true : false
            })
        });
        state.wiki = wiki;
    },
    [ActionType.WIKI_ITEM_TOGGLE](state, {idx}){
        let {wiki}=state,
            _wiki = JSON.parse(JSON.stringify(wiki)),
            _items = _wiki.items;

        for (let i = 0; i < _items.length; i++) {
            if (i == idx) {
                _items[i].show = !_items[i].show;
            } else {
                _items[i].show = false;
            }
        }

        state.wiki = _wiki;
    },

    [ActionType.INQUIRY_RECORD_LAB_RESULT](state, {params}){
        let {labItems, labResult}=state,
            _labResult = JSON.parse(JSON.stringify(labResult)),
            {result, source}=params,
            id = source.id;

        let cur = null;
        for (let i = 0; i < _labResult.length; i++) {
            if (_labResult[i].id == id) {
                cur = _labResult[i];
                _labResult.splice(i, 1);
                break;
            }
        }
        if (!cur) {
            for (let i = 0; i < labItems.length; i++) {
                if (labItems[i].id == id) {
                    cur = labItems[i];
                    break;
                }
            }
        }

        if (result == 'FeatureStateUnknown') {
            _labResult.push({
                id: id,
                value: '不清楚',
                name: source.dataName,
                state: result
            })

        } else {
            _labResult.push({
                id: id,
                value: result,
                name: source.dataName
            })
        }

        state.labResult = _labResult;
    },
    [ActionType.INQUIRY_SURE_LAB](state){
        let {labResult, question,requestBody}=state,
            _question = JSON.parse(JSON.stringify(question)),
            _requestBody = JSON.parse(JSON.stringify(requestBody)),
            lastQA = _question[_question.length - 1].answer;

        labResult.map(val=> {
            lastQA.push(val.name + ':' + val.value);
        });

        _requestBody.patient.labItems=labResult;
        console.log(labResult);
        state.question = _question;
        state.labModal = false;
        state.requestBody = _requestBody;
    },

    [ActionType.INQUIRY_CANCEL_LAB](state){
        let {requestBody,question}=state,
            _question = JSON.parse(JSON.stringify(question)),
            _requestBody = JSON.parse(JSON.stringify(requestBody)),
            lastQA = _question[_question.length - 1].answer;

        lastQA.push('没有');
        _requestBody.patient.labItems=[];

        state.labModal = false;
        state.question = _question;
        state.requestBody = _requestBody;
    },
}

// 返回上一步
function backPrev(state) {
    let {question, requestBody, responseState} = state;

    let _question = JSON.parse(JSON.stringify(question)),
        _requestBody = JSON.parse(JSON.stringify(requestBody)),
        _responseState = JSON.parse(JSON.stringify(responseState)),
        {symptoms, labItems, pastDiseases}=_requestBody.patient,
        len = _question.length;

    if (len == 1) {
        _question[0].answer = [];
        symptoms = [];
        labItems = [];
        pastDiseases = [];

    } else if (len > 1) {

        let _action = _question[len - 2].action;
        if (_action == "DoctorInquiryActionAskSymptom") {
            _requestBody.patient.symptoms.pop()
        } else if (_action == "DoctorInquiryActionAskLabItem") {
            _requestBody.patient.labItems.pop()
        } else if (_action == "DoctorInquiryActionDiagnose") {
            _requestBody.patient.pastDiseases.pop()
        } else if (_action == "DoctorInquiryActionAskSymptomWithoutAttrs") {
            _question[len - 2].options.map(val => {
                _requestBody.patient.symptoms.pop()
            })
        }

        _question.pop();
        _responseState.pop();
        if (_responseState.length > 0) {
            let resStateLen = _responseState.length;
            _requestBody.state = _responseState[resStateLen - 1];
        } else {
            _requestBody.state = '';
        }
        _question[len - 2].answer = [];
    }

    state.requestBody = _requestBody;
    state.question = _question;
    state.responseState = [];

}

// 记录用户选项
function recordOptions(state, opt) {
    let {value} = opt,
        {question} = state;

    let _question = JSON.parse(JSON.stringify(question)),
        len = _question.length - 1,
        currentQ = _question[len];

    let {options} = currentQ;

    if (currentQ.type == 'radio' || currentQ.type == 'labItem') {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value == value) {
                options[i].selected = true;
            } else {
                options[i].selected = false;
            }
        }
        state.question = _question;
        recordResult(state);
    } else if (currentQ.type == 'checkbox') {
        for (let i = 0; i < options.length; i++) {
            if (options[i].value == value) {
                if (options[i].selected) {
                    options[i].selected = false;
                } else {
                    options[i].selected = true;
                }
            }
        }
        state.question = _question;
    }

}

// requestBody 记录选择结果
function recordResult(state) {
    let {question, requestBody, isFetching} = state;

    let _question = JSON.parse(JSON.stringify(question)),
        _requestBody = JSON.parse(JSON.stringify(requestBody)),
        len = _question.length - 1,
        currentQ = _question[len],

        {symptoms} = _requestBody.patient,
        {options} = currentQ;

    // 症状列表进入
    if (symptoms.length == 0) {
        return;
    }

    if (isFetching) {
        return;
    }

    if (currentQ.action == 'DoctorInquiryActionAskSymptom') {

        let value = '',
            text = '';

        options.map((val) => {
            if (val.selected) {
                value = val.value;
                text = val.text;
            }
        });
        if (value == '') return;
        currentQ.answer = [text];

        let detail = currentQ.detail,
            _attrs = {},
            _preservedAttrs = {};

        if (detail.attrs) {
            _attrs = JSON.parse(JSON.stringify(detail.attrs))
        }
        if (currentQ.preservedAttrs) {
            _preservedAttrs = JSON.parse(JSON.stringify(currentQ.preservedAttrs));
        }

        _attrs[currentQ.attrName].values=[];
        if (detail.attrs && value != 'FeatureStateUnknown') {

            _attrs[currentQ.attrName].values.push(value);
            delete detail.state

        } else {
            detail.state = value;
        }

        detail.attrs = Object.assign({},
            _attrs,
            _preservedAttrs
        );

        symptoms.push(detail);


    } else if (currentQ.action == 'DoctorInquiryActionAskSymptomWithoutAttrs') {
        let _str = '',
            noSelected = true;

        options.map((val, idx) => {
            if (val.selected) {
                noSelected = false;
                symptoms.push({id: val.value});
                _str += val.text + ', ';
            } else {
                symptoms.push({id: val.value, state: 'FeatureStateNegative'})
            }
        });

        if (noSelected) {
            return
        }

        _str = _str.slice(0, _str.lastIndexOf(','));
        currentQ.answer = [_str];

    } else if (currentQ.action == 'DoctorInquiryActionAskLabItem') {
        let value = '';
        options.map((val) => {
            if (val.selected) {
                value = val.value;
            }
        });

        if (value == '') return;

        let {skipActions}=_requestBody;
        _requestBody.skipActions = skipActions.concat(['DoctorInquiryActionAskSymptom', 'DoctorInquiryActionAskLabItem', 'DoctorInquiryActionAskSymptomWithoutAttrs']);

        if (value == 'yes') {
            state.labModal = true;

        } else if (value == 'no') {
            currentQ.answer = ['没有'];

        }

    }

    state.question = _question;
    state.requestBody = _requestBody;
}

//解析请求数据
function handleFetchQuestion(state, params) {

    let {requestBody, question, responseState} = state;

    let _gStr = {},
        len = question.length - 1,
        currentQ = question[len];

    requestBody.state = params.state;   //设置请求体state
    responseState.push(params.state);

    let _showBack = true;

    if (params.type == "DoctorInquiryActionAskSymptom") {  //症状属性选择
        question.push(params.json);

    } else if (params.type == "DoctorInquiryActionAskSymptomWithoutAttrs") {     //症状选择
        question.push(params.json);

    } else if (params.type == "DoctorInquiryActionAskLabItem") {
        question.push({
            stem: "您是否做过化验",
            action: params.type,
            type: 'labItem',
            options: [
                {text: '是', value: 'yes'},
                {text: '否', value: 'no'}
            ],
            answer: []
        });
        state.labItems = params.arr;


    } else if (params.type == "DoctorInquiryActionDiagnose") {
        state.diagnoseList = params.diagnose;

        try{
            statisticFetch({eventName:'view_diagnosis_all',userId:state.userId});
        }catch(e){console.log(e)}

        if (params.arr.length == 0) {   //未诊断出结果
            question.push({haveResult: false, action: 'DoctorInquiryActionDiagnose'})

        } else {    //有诊断结果
            let num1 = params.arr[0];
            num1.haveResult = true;

            let deg = num1.weight / 100 * 360;
            num1.deg = deg.toFixed(1);

            question.push(params.arr[0]);
            state.diagnose = params.arr;

            let recall = {}, isRecall = false;

            if (params.diagnose.recall && JSON.stringify(params.diagnose.recall) != '{}') {
                recall = params.diagnose.recall;
                isRecall = true;
            }
            state.recall = {
                recall,
                isRecall
            }

            try{
                statisticFetch({eventName:'view_diagnosis_suc',userId:state.userId})
            }catch(e){console.log(e)}
        }

    }

    state.isFetching = false;
}