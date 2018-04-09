import {ActionType} from './mutation-types';
import $ from 'jquery';
import {statisticFetch} from '../api/index';
import {handleDialogueSucCb} from "../api/handleFetchData";

export default {
    [ActionType.INQUIRY_CHANGE_TALK_FLUX](state, params) {
        // state = Object.assign(state, params);
        state=$.extend(state,params);
    },
    [ActionType.SET_COMPARE_DATA](state, params) {
        state.compareData =params;
    },
    [ActionType.SET_SYMPTOM_TO_INQURY](state) {
        state.symptomToInquryFlag =false;
    },
    [ActionType.SET_ROUTE_FLAG](state,param) {
        state.routeFlag =param;
    },
    [ActionType.Add_MEDICATION_LIST](state, param) {
        let {listCast,cb}=param;
        state.medicationList=listCast;
        cb();
    },
    [ActionType.FETCH_DISEASE_LIST](state, param) {
        let _tempIndex;
        state.talkContent.map((item, index) => {
            if (item.disease.id == param) {
                _tempIndex = index;
                state.firstDisease = item;
                state.firstDisease.weight=(state.firstDisease.weight * 100).toFixed(2);
            }else{
                // item.weight = (item.weight * 100).toFixed(2);
            }
        });
        if (_tempIndex >= 0) {
            state.talkContent.splice(_tempIndex, 1);
        }
    },
    [ActionType.INQUIRY_TALK_CONTENT_FETCH](state, params) {
        let resultData = JSON.parse(JSON.stringify(params.contents));
        resultData.map((item, index) => {
            if (item.items && item.items.length > 0) {
                state.talkContent = item.items;
            }
        });
    },
    [ActionType.SEARCH_VALUE](state, params) {
        state.searchValue = params;
    },
    [ActionType.MEDICAL_DETAIL_INFO](state, params) {
        state.medicalDetailInfo = params;
    },
    [ActionType.CONVERSATION_ID](state, params) {
        state.conversationID = params;
    },
    [ActionType.FLAG_TO_INQUIRY](state, params) {
        state.flagInquiry = params;
    },

    [ActionType.DRUG_PLANS_TITLE](state, name) {
        state.drugPlansTitle = name;
    },
    [ActionType.SET_SEARCH](state, params) {
        state.symptoms.showSearchResult = params;
    },
    [ActionType.SET_LOCATION_SEARCH](state, {url, token, userId}) {
        state.ifrSearch = url;
        state.token = token;
        state.userId = userId;
    },
    //查看药品大图
    [ActionType.PUSH_PICTURE](state,params){
        let {cb,index}=params;
        state.defaultImgIndex=index;
        cb();
    },
    //症状搜列表
    [ActionType.DISEASE_SEARCH_LIST](state, result) {
        state.searchList = result.items;
    },
    [ActionType.SET_SEARCH_RESUT](state) {
        state.searchList = [];
    },

    [ActionType.DISEASE_FETCH](state, result) {
        state.diseaseItems = result.items;
    },
    // 疾病列表
    [ActionType.DISEASE_FETCH_LIST](state, params) {
        let {_list, _listContent} = params;
        state.diseaseList = _list;
        state.curDiseaseList = JSON.parse(JSON.stringify(_listContent))[_list[state.currentDepartmentIndex].name];
        state.diseaseListContent = _listContent;
        state.showDiseaseSearchResult = false;
        state.searchValue = '';
    },
    //疾病分类点击
    [ActionType.DISEASE_SET_CURRENT_SORT](state, param) {
        state.curDiseaseList = JSON.parse(JSON.stringify(state.diseaseListContent[param.name]));
        state.currentDepartmentIndex = state.diseaseList.indexOf(param);
    },
    [ActionType.INQUIRY_START_FETCH](state, params) {
        successCb(state, params);
    },
    [ActionType.INQUIRY_TALK_FETCH](state, params) {
        successCb(state, params);
    },
    [ActionType.FINISH](state, params) {
        let len = state.question.length;
        let stemLen=null;
        if(state.question[len - 1]){
            stemLen = state.question[len - 1].stems.length;
            state.question[len - 1].stems[stemLen - 1].finish = params;
        }

    },
    [ActionType.STORE_INIT_QUESTION](state) {
        state.question = [
            {
                type: 'radio',
                stem: '您有什么不舒服？',
                options: [],
                answer: []
            }
        ]
    },
    [ActionType.CLEAR_SYMPTOMS_SELECTED](state) {
        state.symptoms.selected = [];
        state.symptoms.showSearchResult = false;
    },
    [ActionType.SET_DISEASE_SEARCH](state, params) {
        state.showDiseaseSearchResult = params;
    },
    [ActionType.STORE_INIT_REQUESTBODY](state) {
        let _requestBody = JSON.parse(JSON.stringify(state.requestBody)),
            {patient} = _requestBody,
            {symptoms, labItems, pastDiseases} = patient
        symptoms = []
        labItems = []
        pastDiseases = []
        _requestBody.state = ''
        _requestBody.skipActions = [
            'DoctorInquiryActionAskBasicInfo',
            'DoctorInquiryActionAskLivingHabit',
            'DoctorInquiryActionAskVitalSign',
            'DoctorInquiryActionAskSign'
        ]
        state.requestBody = _requestBody
    },
    [ActionType.STORE_INIT_RESPONSESTATE](state) {
        state.responseState = []
    },
    [ActionType.USER_INFO_MODAL](state, {toggle}) {
        state.userInfoModal = toggle
    },
    [ActionType.USER_AGE_CHANGE](state, {age}) {
        state.userAge = age
        state.requestBody.patient.basic.age.year = parseInt(age)
    },
    [ActionType.USER_TEL_CHANGE](state, {tel}) {
        state.userTel = tel
    },
    [ActionType.USER_GENDER_CHANGE](state, {gender}) {
        state.userGender = gender
        state.requestBody.patient.basic.gender = gender
    },
    [ActionType.INQUIRY_SHOWOPTIONS_TOGGLE](state, {toggle}) {
        state.showOptions = toggle
    },
    [ActionType.GLOBAL_LAODING_TOGGLE](state, {toggle}) {
        state.globalLoading = toggle
        state.isFetching = toggle
    },
    //用户协议
    [ActionType.PROTOCOL](state, {toggle}) {
        state.showProtocol = toggle
    },
    [ActionType.SHOW_LOADING](state, params) {
        state.globalLoading = params;
    },

    [ActionType.TO_DIAGNOSIS](state, {params}) {
        state.diagnosis.push(params)
    },
    [ ActionType.TO_REPORT](state, {params}) {
        state.report = params.diagnose.slice(0, 7),
            state.num1 = params.item,
            state.isRecall = params.isRecall,
            state.recallDetail = params.recallDetail
    },
    //药品方案
    [ ActionType.DRUG_USAGE_PLANS](state, params) {
        //返回对象数组
        let {items} = params;
        state.drugUsePlans.length=0 ;//重置用药方案
        if (items && items.length > 0) {
            //疾病用药方案
            let drugs = items[0].items;
            if (drugs && drugs.length > 0) {
                for (let i = 0, drugsLen = drugs.length; i < drugsLen; i++) {

                    let temp = drugs[i];
                    if (temp.items && temp.items.length > 0) {
                        for (let k = 0; k < temp.items.length; k++) {
                            temp.items[k].checkValue = true;
                            if(temp.items[k].price.stock && temp.items[k].price.stock > 0) {
                                temp.items[k].quantity = 1;
                                temp.items[k].checkValue = true;
                            }
                            else {
                                temp.items[k].quantity = 0;
                                temp.items[k].checkValue = false;
                            }
                            //针对症状
                            temp.items[k].indicationStr = '';
                            let _indications = temp.items[k].indications;
                            let _treatmentName = temp.items[k].treatmentNames;
                            if (_indications && _indications.length > 0) {
                                for (let n = 0; n < _indications.length; n++) {
                                    if(_indications[n].type=='EntityTypeDisease'){
                                        temp.items[k].treatmentNameStr =  _indications[n].name;
                                    }else{
                                        temp.items[k].indicationStr += _indications[n].name + ' | ';
                                    }

                                }
                                temp.items[k].indicationStr =
                                    temp.items[k].indicationStr.substr(0, temp.items[k].indicationStr.length - 3);
                            }
                            // if (_treatmentName && _treatmentName.length > 0) {
                            //     for (let m = 0; m < _treatmentName.length; m++) {
                            //         temp.items[k].treatmentNameStr = _treatmentName[m] + '';
                            //     }
                            // }
                        }
                    }
                    state.drugUsePlans = drugs;
                }
            } else {
                console.log("没有该疾病！");
            }
        }
    },
    // 记录症状列表结果
    [ActionType.SYMPTOM_RECORD_ANSWER](state, {params}) {
        let {question} = state,
            {vData, cb} = params,
            _question = JSON.parse(JSON.stringify(question)),
            len = _question.length - 1,
            currentQ = _question[len];
        let arr = [];
        vData.map((val) => {
            arr.push(val.text);
        });
        currentQ.answer=[arr.join(' , ')];
        cb(currentQ);
    },

    [ActionType.INQUIRY_FETCH_QUESTION](state, {params}) {
        handleFetchQuestion(state, params)
    },

    // 记录用户选项
    [ActionType.INQUIRY_RECORD_OPTIONS](state, {opt}) {
        recordOptions(state, opt)
    },

    [ActionType.INQUIRY_SUBMIT_RESOULT](state) {
        recordResult(state)
    },

    [ActionType.INQUIRY_CLICK_WIDTHOUT](state) {

        let _question = JSON.parse(JSON.stringify(state.question)),
            _requestBody = JSON.parse(JSON.stringify(state.requestBody)),

            {symptoms} = _requestBody.patient,
            len = _question.length - 1,
            currentQ = _question[len],
            {options} = currentQ

        options.map((val, idx) => {
            symptoms.push({id: val.value, state: 'FeatureStateNegative'})
        })

        currentQ.answer = ['没有']

        state.question = _question
        state.requestBody = _requestBody
    },
    [ActionType.INQUIRY_BACK_PREV](state) {
        backPrev(state)
    },
    [ActionType.WIKI_FETCH_DATA](state, {data}) {
        let wiki = {
            id: data.id,
            name: data.name,
            items: []
        }
        data.items.length > 0 && data.items.map((val, idx) => {
            wiki.items.push({
                title: val.title,
                describe: val.text,
                show: idx == 0 ? true : false
            })
        })
        state.wiki = wiki
    },
    [ActionType.WIKI_ITEM_TOGGLE](state, {idx}) {
        let {wiki} = state,
            _wiki = JSON.parse(JSON.stringify(wiki)),
            _items = _wiki.items

        for (let i = 0; i < _items.length; i++) {
            if (i == idx) {
                _items[i].show = !_items[i].show
            } else {
                _items[i].show = false
            }
        }

        state.wiki = _wiki
    },

    /*----------记录化验结果 start------------*/
    [ActionType.INQUIRY_RECORD_LAB_RESULT](state, {params}) {
        let {result, source, idx} = params,
            {options} = state,
            _options = JSON.parse(JSON.stringify(options)),
            curOpt = _options[idx];

        for (let i = 0; i < curOpt.options.length; i++) {
            if (curOpt.options[i].key == result) {
                curOpt.selectedKey = result;
                curOpt.selectedAnswer = curOpt.options[i].answer;
            }
        }

        state.options = _options
    },

    /*----------记录化验结果 end------------*/
    [ActionType.INQUIRY_SURE_LAB](state) {
        let {labResult, question, requestBody} = state,
            _question = JSON.parse(JSON.stringify(question)),
            _requestBody = JSON.parse(JSON.stringify(requestBody)),
            lastQA = _question[_question.length - 1].answer;

        labResult.map(val => {
            lastQA.push(val.name + ':' + val.value)
        });

        _requestBody.patient.labItems = labResult;
        state.question = _question
        state.labModal = false
        state.requestBody = _requestBody
    },

    [ActionType.INQUIRY_CANCEL_LAB](state) {
        let {requestBody, question} = state,
            _question = JSON.parse(JSON.stringify(question)),
            _requestBody = JSON.parse(JSON.stringify(requestBody)),
            lastQA = _question[_question.length - 1].answer

        lastQA.push('没有')
        _requestBody.patient.labItems = []

        state.labModal = false
        state.question = _question
        state.requestBody = _requestBody
    },

}


function successCb(state, data) {
    let self = this,
        {question} = state,
        // _dataList = JSON.parse(JSON.stringify(question)),
        {_list, _options, age, gender, _diseaseResult, _askName} = handleDialogueSucCb(data),
        _type = _list.optType,
        _labModal = false,
        askName = false;


    state.conversationId = data.id;
    if (age && gender) {
        state.userAge = age;
        state.userGender = gender;
    }

    question.push(_list);

    if (_type == 'FreeText' || _type == 'AskSymptoms') {     //自由输入
        _options = _list.asking.watermark
    } else if (_type == 'AskLabItemOptions') {    //化验列表
        _labModal = true;
    } else if (_type == 'SaveOptions') {
        // _diseases && (state.diagnosis = _diseases);
        // _recall && (state.recall = _recall);
        _diseaseResult && (state.diagnoseResult.push(_diseaseResult));
        askName = _askName;
    }

    // state.question=JSON.parse(JSON.stringify(_dataList));
    state.options = _options;
    state.optionType = _type;
    state.labModal = _labModal;
    state.loadingShow = false;
    state.askName = askName;
    state.networkErr = false;
    state.freeInpDisabled = false;
    state.freeTextVal = '';
    // state.pickerDefaultValue=
    // state.freeTextVal=''

};

