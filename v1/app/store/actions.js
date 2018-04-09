import {addAskFetch, wikiFetch,statisticFetch} from "../api";
import {ActionType} from "./mutation-types";

export const setLocationSearch=({dispatch,commit})=>{
    let search=window.location.search,
        _search=search.substring(1).split('&'),
        url='',
        token='',
        userId='';

    userId=new Date().getTime();
    _search.length>0 && _search.map(val=>{
        if(val.indexOf('ifr=') != -1){
            url=val.split('=')[1];
        }else if(val.indexOf('token=') !=-1){
            token=val.split('=')[1];
        }
    });

    // test
    // token='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGl0eSI6eyJhcHAiOnsiaWQiOiJtZXJjdXJ5IiwibmFtZSI6IuWlveiNr-W4iCJ9LCJzY29wZXMiOlsiYWkudjEuZW50aXR5IiwiYWkudjEuYXNzaXN0IiwiYWkudjEuZG9jdG9yIiwiYWkudjEudGV4dCJdfSwidXRjdGltZSI6IjIwMTctMDktMjZUMDI6NTE6MzUuNzIzODU3NTg1WiIsInV0Y2V4cCI6IjIwMTctMTAtMDNUMDI6NTE6MzUuNzIzODU3NTg1WiJ9.YzXyYUV1bKBSINU7RCulOrxfU1FvJCDFcsX85ERX-7EHTFJPQKm0QkMtSHk0KogkZUc44dj4Lidx6-CerhUXIqVTJnwczAxYy1x3ijFGh2fRq3Ps8Q_So-OYxqsey81TbRwC02jcWrzfmk-fGyROxf2rz7D4E-uoe9sSzUUa8pbTKeflRpfPGvs8A7lmqkVpq4RrpOOVtmPQPKps4iww0FmHZB3reIGm_jlNa7vxX1vrzfhhvKQbToNAjQAn6gl-eONHwaEDfbCwOVnoj9_6b9-qEjW46vQ4vpJvU1UtzjRl_-avkyDPeI-2b3o0j80gBm71Ii9aSooRK5YEQmwtlw';

    dispatch('statisticApi',{eventName:'view_main',userId});

    commit(ActionType.SET_LOCATION_SEARCH, {
        url,token,userId
    });
}
export const userInfoModalToggle = ({commit}, toggle)=> {
    commit(ActionType.USER_INFO_MODAL, {
        toggle
    })
}

export const storeInitQuestion=({commit})=>{
    commit(ActionType.STORE_INIT_QUESTION)
}

export const storeInitRequestBody=({commit})=>{
    commit(ActionType.STORE_INIT_REQUESTBODY)
}

export const storeInitResponseState=({commit})=>{
    commit(ActionType.STORE_INIT_RESPONSESTATE)
}


export const userAgeChange = ({commit}, age)=> {
    commit(ActionType.USER_AGE_CHANGE, {
        age
    })
}
export const userTelChange=({commit},tel)=>{
    commit(ActionType.USER_TEL_CHANGE,{
        tel
    })
}

export const userGenderChange = ({commit}, gender)=> {
    commit(ActionType.USER_GENDER_CHANGE, {
        gender
    })
}
export const globalLoadingToggle = ({commit}, toggle)=> {
    commit(ActionType.GLOBAL_LAODING_TOGGLE, {
        toggle
    })
}

export const symptomRecordAnswer = ({commit}, params)=> {

        commit(ActionType.SYMPTOM_RECORD_ANSWER, {
            params
        })

}

export const fetchQuestion = ({commit, state})=> {
    // commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true});
    addRequestQ({commit, state})
}

export const showOptionsToggle = ({commit}, toggle)=> {
    commit(ActionType.INQUIRY_SHOWOPTIONS_TOGGLE, {
        toggle
    })
}


export const clickOptions = ({commit, state}, opt)=> {
    commit(ActionType.INQUIRY_RECORD_OPTIONS, {
        opt
    })

    let {question} = state,
        len = question.length - 1,
        currentQ = question[len];

    if (currentQ.type == 'radio') {
        commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true});
        addRequestQ({commit, state})
    } else if (currentQ.type == 'labItem' && opt.value == 'no') {
        commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true});
        addRequestQ({commit, state})
    }
}

export const recordResult = ({commit, state})=> {
    commit(ActionType.INQUIRY_SUBMIT_RESOULT);
    commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true});

    addRequestQ({commit, state});
}

//未有以上症状
export const clickWithout = ({commit, state})=> {
    commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true});
    commit(ActionType.INQUIRY_CLICK_WIDTHOUT);
    addRequestQ({commit, state});
}

export const enterWiki = ({commit, state}, id)=> {
    wikiFetch({
        id: id,
        token:state.token,
        cb(data){
            commit(ActionType.WIKI_FETCH_DATA, {
                data
            })
        }
    })
}

export const wikiItemToggle = ({commit}, idx)=> {
    commit(ActionType.WIKI_ITEM_TOGGLE, {
        idx
    })
}

export const inquiryBackPrev = ({commit})=> {
    commit(ActionType.INQUIRY_BACK_PREV)
};

export const recordLabResult = ({commit}, params)=> {
    commit(ActionType.INQUIRY_RECORD_LAB_RESULT, {
        params
    })
};

export const inquirySureLab = ({commit, state})=> {
    new Promise((resolve, reject)=> {
        commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true});
        commit(ActionType.INQUIRY_SURE_LAB);
        resolve()
    }).then(()=> {
        addRequestQ({state, commit})
    })
}

export const inquiryCancelLab = ({commit, state})=> {
    new Promise((resolve, reject)=> {
        commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: true});
        commit(ActionType.INQUIRY_CANCEL_LAB);
        resolve()
    }).then(()=> {
        addRequestQ({state, commit})
    })
}

export const statisticApi=({commit ,state},params)=>{

    if(!params.userId){
        params.userId=state.userId;
    }
    try{
        statisticFetch(params)
    }catch (e){console.log(e)}
}

function addRequestQ({state, commit}) {
    let {question} = state,
        len = question.length - 1,
        currentQ = question[len];

    if (currentQ.action == 'DoctorInquiryActionDiagnose') {
        return;
    }

    setTimeout(()=>addAskFetch({
        data: state.requestBody,
        question: state.question,
        token:state.token,
        cb: function (params) {
            commit(ActionType.INQUIRY_FETCH_QUESTION, {
                params
            })
            commit(ActionType.GLOBAL_LAODING_TOGGLE, {toggle: false});

        }
    }), 500);
}