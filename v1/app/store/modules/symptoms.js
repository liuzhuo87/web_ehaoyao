import {symptomsFetchPageData} from "../../api/index";
import {ActionType} from "../mutation-types";
import {handleSymptomListFetch} from "../../api/handleFetchData";

const state = {
    symptomList: {},
    symptomCategory: [],

    currentSort: 0,
    currentList: [],

    searchList: [],
    searchValue: '',

    selected: []
};

// getters
const getters = {};


// actions
const actions = {
    fetchPageData ({commit, rootState}, params) {
        let json = {
            age: rootState.userAge,
            gender: rootState.userGender,
            token:rootState.token
        };


        if (params && params.type == 'search') {
            json = Object.assign({}, json, params, {
                cb(data){
                    commit(ActionType.SYMPTOM_FETCH_SEARCH_TEXT, {
                        text: params.text
                    });

                    if (JSON.stringify(data) == "{}" || data.items.length == 0) {
                        commit(ActionType.SYMPTOM_FETCH_SEARCH_DATA, {
                            list: []
                        });

                    } else {
                        commit(ActionType.SYMPTOM_FETCH_SEARCH_DATA, {
                            list: data.items
                        });
                    }
                    typeof params.cb=='function' && params.cb()
                }
            })
        } else if (params && params.type == 'all') {
            json = Object.assign({}, json, params, {
                cb(data){
                    let {list, sort} = handleSymptomListFetch(data);
                    commit(ActionType.SYMPTOM_FETCH_PAGE_DATA, {
                        list, sort
                    });
                    typeof params.cb=='function' && params.cb()
                }
            })
        }
        symptomsFetchPageData(json);
    },

    clickSearchList({commit}, json){
        commit(ActionType.SYMPTOM_FETCH_SELECTED, json)
    },
    searchMaskHide({commit}){
        commit(ActionType.SYMPTOM_SEARCH_MASK_HIDE)
    },
    setCurrentSort({commit}, idx){
        commit(ActionType.SYMPTOM_SET_CURRENT_SORT, idx)
    },
    setSymptomChoice({commit}, json){
        commit(ActionType.SYMPTOM_SET_SYMOTOM_CHOICE, json)
    }

};

// mutations
const mutations = {
    [ActionType.SYMPTOM_FETCH_PAGE_DATA] (state, {list, sort}) {
        state.symptomList = JSON.parse(JSON.stringify(list));
        state.symptomCategory = JSON.parse(JSON.stringify(sort));
        state.currentList = getCurrentList({
            curList: list[sort[state.currentSort]],
            selected: state.selected
        });

    },

    [ActionType.SYMPTOM_SET_CURRENT_SORT] (state, idx) {
        let curList = state.symptomList[state.symptomCategory[idx]];

        state.currentSort = idx;
        state.currentList = getCurrentList({
            curList: JSON.parse(JSON.stringify(curList)),
            selected: state.selected
        });
    },

    [ActionType.SYMPTOM_SET_SYMOTOM_CHOICE] (state, json) {
        let _curList = JSON.parse(JSON.stringify(state.currentList)),
            _selected = JSON.parse(JSON.stringify(state.selected)),
            choice = false;

        for (let i = 0; i < _selected.length; i++) {
            if (_selected[i].id == json.id) {
                _selected.splice(i, 1);
                choice = true;
            }
        }

        if (!choice) {
            _selected.push(json);
        }

        _curList = setListChoice(_curList, json);

        state.currentList = _curList;
        state.selected = _selected;
    },

    [ActionType.SYMPTOM_FETCH_SEARCH_DATA] (state, {list}) {
        state.searchList = JSON.parse(JSON.stringify(list));
    },

    [ActionType.SYMPTOM_FETCH_SEARCH_TEXT] (state, {text}) {
        state.searchValue = text;
    },

    [ActionType.SYMPTOM_FETCH_SELECTED] (state, opt) {

        let _selected = JSON.parse(JSON.stringify(state.selected)),
            _list = JSON.parse(JSON.stringify(state.currentList)),
            json = {},
            alreadyHave=false;

        if (opt) {
            json = opt;
        }


        for (let i = 0; i < _selected.length; i++) {
            if (_selected[i].id == json.id) {
                alreadyHave=true;
            }
        }

        if(!alreadyHave){
            _list = setListChoice(_list, json);
            _selected.push(json);
        }

        state.selected = _selected;
        state.currentList = _list;
        state.searchList = [];
        state.searchValue = '';

    },

    [ActionType.SYMPTOM_SEARCH_MASK_HIDE](state){
        state.searchList = [];
        state.searchValue = '';
    }

};

function getCurrentList(params) {
    let {curList, selected}=params;

    let _currentList = JSON.parse(JSON.stringify(curList)),
        _selected = JSON.parse(JSON.stringify(selected));

    for (let i = 0; i < _selected.length; i++) {
        for (let j = 0; j < _currentList.length; j++) {
            if (_currentList[j].id == _selected[i].id) {
                _currentList[j].choice = true;
            }
        }
    }
    return _currentList
}

function setListChoice(list, json) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == json.id) {
            list[i].choice = !list[i].choice;
        }
    }
    return list;
}

export default {
    state,
    getters,
    actions,
    mutations
}
