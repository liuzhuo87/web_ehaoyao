import $ from "jquery";
import {cfg, start,talk,drugInfo,statisticUrl, symptomListCfg,symptomSuggest,diseaseListCfg,diseaseSuggest,drugEntityUsagePlans,wikiCfg, inquiryRecord, recordList, feedBack,drugUsagePlans} from "./config";

export function startFetch(params) {
    let data = {
        id: params.id || '',
        request: params.request || {},
    };

    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + start,
        type: 'POST',
        data: JSON.stringify(data),
        success: function (res) {
            params.cb(res)

        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail

    })
}

export function fetchDiseaseIndex(params) {
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + diseaseSuggest+ params.data.text + '&count=100&types=EntityTypeDisease',
        type: 'GET',
        success: function (res) {
            params.cb(res);

        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail

    })
}

export function sendTalkFetch(params) {
    let {data} = params;
    $.ajax({
        headers: {
            'Authorization': 'bearer '+params.token
        },
        url: cfg + talk,
        type: 'POST',
        data: JSON.stringify(data),
        success: function (res) {
            params.cb(res);
        }
    })
}
export function sendShowMed(params) {
    let {data}=params;
    $.ajax({
        headers: {
            'Authorization': 'bearer '+params.token
        },
        url: cfg + drugInfo.replace(':id', data),
        type: 'GET',
        success: function (res) {
            params.cb(res)

        }
    })
}
export function sendDrugUsagePlans(params) {
    let data = params.data;
    $.ajax({
        headers: {
            'Authorization': 'bearer '+params.token
        },
        url: cfg + drugUsagePlans,
        type: 'POST',
        data: JSON.stringify(data),
        success: function (res) {
            params.cb(res)
        },
        // fail: typeof failCb === 'function' ? data.failCb : fetchFail

    })
}

//症状搜索
export function symptomsSearchAjax(params) {
    let text = params.data;
    $.ajax({
        headers: {
            'Authorization': 'bearer '+params.token
        },
        url: cfg + symptomSuggest+"?text="+text+"&count=100&options.userType=UserPatient",
        type: 'GET',
        // data: JSON.stringify(data),
        success: function (res) {
            params.cb(res)
        },
        // fail: typeof failCb === 'function' ? data.failCb : fetchFail

    })
}
export function sendDrugEntityUsagePlans(params) {
    let data = params.data;
    $.ajax({
        headers: {
            'Authorization': 'bearer '+params.token
        },
        url: cfg + drugEntityUsagePlans,
        type: 'POST',
        data: JSON.stringify(data),
        success: function (res) {
            params.cb(res)
        },
        // fail: typeof failCb === 'function' ? data.failCb : fetchFail

    })
}
// 症状列表
export function symptomsFetchPageData(params){
    let {age, gender, type, text, cb} = params;
    let data = getBasic({age, gender, type, text});
    let opt = "?start=0&count=2000&options.UserPatient=UserPatient&options.gender=" + gender + "&options.age.year=" + age;
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + symptomListCfg + opt,
        type: 'GET',
        data: JSON.stringify(data),
        success (res) {
            if (res) {
                cb(res)
            }
        },
        error: typeof params.failCb === 'function' ? params.failCb : fetchFail

    })
}

// 疾病列表
export function diseaseFetchPageData(params) {
    // alert('diseaseFetchPageData token  '+params.token);
    let opt = "?start=0&count=200&options.userType=UserPatient&options.gender=GenderFemale&options.age.year=20&category=level1";
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + diseaseListCfg + opt,
        type: 'GET',
        // data: JSON.stringify(data),
        success (res) {
            if (res) {
                params.cb(res)
            }
        },
        // error: typeof params.failCb === 'function' ? params.failCb : fetchFail

    })
}

function getBasic(params) {
    let {age, gender, type, text} = params

    let data = {
        options: {
            'userType': 'UserPatient',
            'gender': gender,
            'age': {
                'year': parseInt(age)
            }
        }
    }
    data.size = 1000
    if (type && type === 'search') {
        data.text = text
        data.start = 0
        data.size = 10
    }
    return data
}

// 请求症状分类列表
export function symptomCategoryFetch(params) {
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + symptomCategoryCfg,
        data: '{}',
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'bearer ' + params.token)
        },
        success: function (res) {
            if (res.data) {
                params.cb()
            }
        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail
    })
}
// 追问
export function addAskFetch(params) {
    let that = this
    let _data = JSON.stringify(params.data)

    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + start,
        data: _data,
        type: 'POST',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'bearer ' + params.token)
        },
        success: function (data) {
            if (data) {
                addAskFetchSuccess(data, params.cb)
            }
        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail
    })
}

function addAskFetchSuccess(data, cb) {

    let action = data.action

    if (action === 'DoctorInquiryActionAskSymptom') {  //询问症状
        askSympton(data, cb)
    } else if (action === 'DoctorInquiryActionAskLabItem') {  //询问化验项目
        askLabItem(data, cb)
    } else if (action === 'DoctorInquiryActionDiagnose') {   //给出诊断
        diagnose(data, cb)
    } else if (action === 'DoctorInquiryActionAskSymptomWithoutAttrs') {
        askSymptomWithoutAttrs(data, cb)
    }

}

function askSymptomWithoutAttrs(data, cb) {

    let json = {options: []}
    if (data.askSymptom) {
        let askSymptom = data.askSymptom
        let stem = '您还有其他症状么？如：'
        askSymptom.items && askSymptom.items.length > 0 && askSymptom.items.map(function (val, idx) {
            // json.stem="您还有其他症状么？";
            json.action = data.action
            json.type = 'checkbox'
            json.answer = ''
            json.detail = {}
            stem += val.question
            if (idx <= askSymptom.items.length - 2) {
                stem += ', '
            }

            let _optionLi = null
            if (val.preservedAttrs && JSON.stringify(val.preservedAttrs) != '{}') {
                _optionLi = {
                    text: val.question, value: val.id, attrs: val.preservedAttrs
                }
            } else {
                _optionLi = {text: val.question, value: val.id}
            }
            json.options.push(_optionLi)
        })
        json.stem = stem

        let state = data.state

        cb({state, json, type: data.action})
    }

}

function askSympton(data, cb) {

    let json = null
    if (data.askSymptom) {
        let askSymptom = data.askSymptom
        askSymptom.items && askSymptom.items.length > 0 && askSymptom.items.map(function (val, idx) {

            json = {
                id: val.id,
                stem: val.question,
                action: data.action,
                options: [],
                answer: '',
                detail: {
                    id: val.id,
                    attrs: {}
                }

            }
            let _attrs = {}

            if (val.attr) {
                json.type = val.multiValue ? 'checkbox' : 'radio'
                json.attrName = val.attr.name

                json.detail.attrs[val.attr.name] = {
                    values: []
                }

                _attrs = {
                    [val.attr.name]: {
                        values: []
                    }
                }

                val.attr.choices.map(function (val, idx) {
                    let _json = {}
                    _json.text = val.text
                    _json.value = val.name

                    json.options.push(_json)

                })
                json.options.push({text: '不清楚', value: 'FeatureStateUnknown'})
            } else {
                json.type = 'radio'
                json.options = [
                    {text: '是', value: 'FeatureStatePositive'},
                    {text: '否', value: 'FeatureStateNegative'},
                    {text: '不清楚', value: 'FeatureStateUnknown'}
                ]
            }

            if (val.preservedAttrs && JSON.stringify(val.preservedAttrs) != '{}') {
                json.preservedAttrs = val.preservedAttrs
            }
        })

        let state = data.state
        cb({state, json, type: data.action})
    }
}

function askLabItem(data, cb) { //化验

    let arr = []
    data.askLabItem.items.map(function (val, idx) {
        let json = {
            id: val.id,
            dataName: val.entity.name,
            action: data.action,
            name: 'lab',
            type: 'radio',
            stem: val.question,
            options: []
        }

        val.choices.map(function (item, index) {
            let _json = {
                text: item,
                value: item,
                checked: false
            }
            json.options.push(_json)
        })
        json.options.push({text: '不清楚', value: 'FeatureStateUnknown', checked: false})
        arr.push(json)
    })

    let state = data.state
    cb({state, arr, type: data.action})

}

function diagnose(data, cb) { //诊断结果

    let arr = []
    if (data.diagnose) {
        let diagnose = data.diagnose
        diagnose.items && diagnose.items.length > 0 && diagnose.items.map(function (val, idx) {
            let _weight = (val.weight * 100).toFixed(1)
            if (_weight > 0) {
                let json = {}
                json.id = val.id
                json.name = val.text
                json.action = data.action
                json.department = val.department ? (val.department.name ? val.department.name : '') : ''
                json.type = 'diagnose'
                json.weight = (val.weight * 100).toFixed(1)
                json.describe = val.brief
                json.answer = []

                arr.push(json)
            }
        })
    }
    let state = data.state
    cb({state, arr, type: data.action, diagnose: data.diagnose})
}

// 百科
export function wikiFetch(params) {
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + wikiCfg,
        data: {type: 'disease', id: params.id},
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'bearer ' + params.token)
        },
        success: function (data) {
            if (data) {
                params.cb(data, params.id)
            }
        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail
    })
}

// 保存问诊记录
export function saveRecordFetch(params) {

    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + saveRecord,
        data: JSON.stringify(params.data),
        type: 'POST',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'bearer ' + params.token)
        },
        success: function (data) {
            if (data) {
                params.cb(data)
            }
        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail
    })
}

// 获取问诊记录列表1
export function recordsListFetch(params) {
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + recordList,
        data: params.data,
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'bearer ' + params.token)
        },
        success: function (data) {
            if (data) {
                params.cb(data, params.id)
            }
        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail
    })
}

// 获取记录详情（get）|| 删除单条记录（delete）
export function inquiryRecordFetch(params) {
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + inquiryRecord + params.id,
        data: params.data,
        type: params.method,
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'bearer ' + params.token)
        },
        success: function (data) {
            if (data) {
                params.cb(data)
            }
        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail
    })
}

// 反馈
export function feedBackFetch(params) {
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + feedBack,
        data: params.data,
        type: 'POST',
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'bearer ' + params.token)
        },
        success: function (data) {
            if (data) {
                params.cb(data)
            }
        },
        fail: typeof params.failCb === 'function' ? params.failCb : fetchFail
    })
}

// 数据统计
export function statisticFetch(params) {

    if (!params.eventName) {
        throw 'params.eventName is obligatory'
    }
    let str = '?$app=mercury&$event=' + params.eventName + '&$sessionId=' + params.userId;
    if (params.customData) {
        let customDataStr = params.customData.join('&')
        str += '&' + customDataStr
    }

    let image = new Image()
    image.src = cfg + statisticUrl + str
    // image.src=statisticCfgDev+ statisticUrl +str;
}
//购物车数据统计
export function statisticCartJsonApi(params) {
    let {data}=params;
    if (!data.eventName) {
        throw 'params.eventName is obligatory'
    }
    let str = '?$app=mercury&$event=' + data.eventName +'&dataPattern='+ data.statisticCartJson+'&$sessionId=' + data.userId;
    $.ajax({
        headers: {
            'Authorization': 'bearer ' + params.token
        },
        url: cfg + statisticUrl + str,
        type: 'GET',
        success: function (res) {
            if (res) {
                params.cb(res)
            }
        },
    })
}

function fetchFail() {

}

