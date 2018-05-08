/**
 * Created by Lian on 17/10/25.
 */

/*
 * 1、function 命名：以 '_' 开头表示内部方法，不对外使用;
 * 2、用户自行添加药品id:'user_custom'，name:'新增药品';
 * 3、dataSource：inquiry(自能问诊) || assistant(用药助手)
 * */

/*
 var drug = [
 {
 "id": "001",
 "name": "舒筋健腰丸001",
 "type": "中成药",
 "usage": {
 "method": "注射",
 "dosage": {     //用量
 "unit": "mg",
 "recommend": 100
 },
 "frequency": {      //频次
 "recommend": 1.5
 },
 "treatmentTime": {      //时长(单位：天)
 "recommend": 1
 }
 },
 "spec": {
 "unit": "支",
 "dosageFactor": 2
 },
 "indications": [
 {
 "id": "adf",
 "name": "记性上呼吸道感染"
 }, {
 "id": "a",
 "name": "记道感染"
 }, {
 "id": "b",
 "name": "感染"
 }
 ],
 "images": [
 {
 'url': '/assets/images/img1.png',
 'isPrimary': true
 }
 ]
 }, {
 "id": "002",
 "name": "舒筋健腰丸002",
 "type": "中药",
 "usage": {
 "method": "口服",
 "dosage": {     //用量
 "unit": "g",
 "recommend": 100
 },
 "frequency": {      //频次
 "recommend": 1.5
 },
 "treatmentTime": {      //时长(单位：天)
 "recommend": 1
 }
 },
 "spec": {
 "unit": "ml",
 "dosageFactor": 2
 },
 "indications": [
 {
 "id": "adf",
 "name": "记性上呼吸道感染"
 }
 ],
 "images": [
 {
 'url': '/assets/images/img1.png',
 'isPrimary': true
 }
 ]
 }, {
 "id": "003",
 "name": "舒筋健腰丸003",
 "type": "西药",
 "usage": {
 "method": "未知",
 "dosage": {     //用量
 "unit": "喷",
 "recommend": 100
 },
 "frequency": {      //频次
 "recommend": 1.5
 },
 "treatmentTime": {      //时长(单位：天)
 "recommend": 1
 }
 },
 "spec": {
 "unit": "支",
 "dosageFactor": 2
 },
 "indications": [
 {
 "id": "adf",
 "name": "记性上呼吸道感染"
 }
 ],
 "images": [
 {
 'url': '/assets/images/img1.png',
 'isPrimary': true
 }
 ]
 }
 ];
 */
window.rxthinking = window.rxthinking ? window.rxthinking : {};
window.rxthinking.drug = {
    dosageOpts: [
        {key: 'g', value: 'g'},
        {key: 'ml', value: 'ml'},
        {key: '支', value: '支'},
        {key: '滴', value: '滴'},
        {key: '瓶', value: '瓶'},
        {key: '喷', value: '喷'},
        {key: 'ug', value: 'ug'},
        {key: 'mg', value: 'mg'},
        {key: 'mg/kg', value: 'mg/kg'},
        {key: '粒', value: '粒'},
        {key: '片', value: '片'},
        {key: '丸', value: '丸'},
        {key: '枚', value: '枚'},
        {key: '揿', value: '揿'},
        {key: '锭', value: '锭'},
        {key: '包', value: '包'},
        {key: '袋', value: '袋'}
    ],
    frequencyOpts: [
        {key: '1', value: '一天一次'},
        {key: '2', value: '一天两次'},
        {key: '3', value: '一天三次'},
        {key: '4', value: '一天四次'},
        {key: '0.5', value: '两天一次'},
        {key: '0', value: '按需使用'}
    ],
    usageOpts: [
        {key: '口服', value: '口服'},
        {key: '注射', value: '注射'},
        {key: '外用', value: '外用'},
        {key: '入眼', value: '入眼'},
        {key: '入耳', value: '入耳'},
        {key: '入鼻', value: '入鼻'},
        {key: '口腔', value: '口腔'},
        {key: '其它途径', value: '其它途径'},
        {key: '未知', value: '未知'}
    ],
    dataSource: '',
    diagnosis: [
        // {
        //     id: 'user_custom',
        //     name: '新增药品',
        //     drugs: [
        //         {
        //             id: 'yao1',
        //             name: '舒筋健腰丸(45g＊10瓶／盒)',
        //             type:'中成药',
        //             img: '/assets/images/img1.png',
        //             isSelected: false,
        //             category: [],
        //             indications: {
        //                 zey: {id: 'zey', name: '中耳炎'},
        //                 fy: {id: 'fy', name: '肺炎'}
        //             },
        //             selectedIndication: [],
        //             dosage: {value: 5, unit: 'g'},
        //             frequency: {key: 'oneTwo', value: '一天两次'},
        //             time: 30,
        //             spec: {value: 2, unit: '支'},
        //             usage: {key: 'wy', value: '外用'},
        //             advice: ""
        //         }
        //     ]
        // }
    ],
    diseaseList: {
        // diseaseId:{id:'',name:''}
    },
    drugList: {
        // yaoId: {}
    },
    helperSelect: [],
    selectedDrug: [],

    init: function () {
        this.dataSource = '';
        this.diagnosis = [];
        this.selectedDrug = [];
        this.diseaseList = {};
        this.drugList = {};
        this.helperSelect=[];
    },

    setData: function (diagnosis, cb) {
        var self = this,
            len = diagnosis.length,
            drugList = {};

        for (var i = 0; i < len; i++) {
            var _d = diagnosis[i];

            if (_d.drugs) {
                for (var j = 0; j < _d.drugs.length; j++) {
                    var _drug = _d.drugs[j];
                    if (!drugList[_drug.id]) {
                        drugList[_drug.id] = _drug;
                    }
                }
            }
        }

        self.diagnosis = diagnosis;
        self.drugList = drugList;
        typeof cb == "function" && cb();

    },

    setDrugList: function (arr) {
        var drugList = {},
            newList = formatDrug(arr);

        for (var i = 0; i < newList.length; i++) {
            drugList[newList[i].id] = newList[i];
        }
        this.drugList = drugList;
    },

    setDataSource: function (source) {
        this.dataSource = source
    },

    // 智能问诊 用户添加新药品
    userCustomDrug: function (params, cb) {
        // params json 格式同drug
        var self = this,
            diagnosis = self.diagnosis;

        var newDrug = handleSingleDrug(params);

        if (diagnosis[0].id == 'user_custom') {
            var oldDrugs = diagnosis[0].drugs,
                len = oldDrugs.length;
            for (var i = 0; i < len; i++) {
                if (oldDrugs[i].id == newDrug.id) {
                    return;
                }
            }
            diagnosis[0].drugs.unshift(newDrug);

        } else {
            var arr = [];
            arr.push(newDrug);
            diagnosis.unshift({
                id: 'user_custom',
                name: '新增药品',
                drugs: arr
            });
        }

        self.setData(diagnosis);
        typeof cb == "function" && cb();

    },

    //用药方案 --> 选择药品
    selectDrug: function (params) {  //切换药品选中状态

        var drugId = params.id,
            diseaseId = params.diseaseId,
            self = this,
            drugList = self.drugList,
            diagnosis = self.diagnosis;

        if (drugList[drugId]) {
            drugList[drugId].isSelected = params.bool
        }

        for (var i = 0; i < diagnosis.length; i++) {
            if (diagnosis[i].id == diseaseId) {
                var curDia = diagnosis[i],
                    curDrug = curDia.drugs;
                for (var j = 0; j < curDrug.length; j++) {
                    if (curDrug[j].id == drugId) {
                        curDrug[j].isSelected = params.bool;
                        break;
                    }
                }
            }
        }
    },

    //用药助手 --> 选择适应症
    selectIndication: function (params) {
        var self = this,
            drugId = params.drugId,
            indicationId = params.indicId,
            drugList = self.drugList,
            helperSel = self.helperSelect,
            hasD=false;

        if (drugList[drugId]) {
            var curDrug = drugList[drugId],
                selInd = curDrug.selectedIndication,
                idx = selInd.indexOf(indicationId);

            if (idx >= 0) {
                selInd.splice(idx, 1);
            } else {
                selInd.push(indicationId);
            }

            if (selInd.length > 0) {
                curDrug.isSelected = true;
                for(var i=0;i<helperSel.length;i++){
                    if(helperSel[i].id==drugId){
                        hasD=true;
                        break;
                    }
                }
                if(!hasD){
                    helperSel.push(drugList[drugId]);
                }
            } else {
                curDrug.isSelected = false;
                self.deleteHelperSelected({drugId:drugId})
            }

        }

    },

    // 获取所有选中的 疾病 和 药品
    getAllSelectedDrug: function (dataSource) {
        /*
         * dataSource : assistant (用药助手) ||  inquiry(智能问诊)
         * */
        var self = this,
            drugList = self.drugList,
            helperSel = self.helperSelect;

        self.selectedDrug = [];
        self.diseaseList = {};

        self.setDataSource(dataSource);

        if (dataSource == 'assistant') {
            self.selectedDrug = helperSel;
            for (var i = 0; i < helperSel.length; i++) {
                self._getAllSelectedDrugToDisease(helperSel[i])
            }

        } else {
            for (var i in drugList) {
                if (drugList[i].isSelected) {
                    self.selectedDrug.push(drugList[i]);
                    self._getAllSelectedDisease();
                }
            }
        }
    },

    _getAllSelectedDisease: function () {
        var self = this,
            diagnosis = self.diagnosis,
            diseaseList = {},
            // drugList = {},
            len = diagnosis.length;

        for (var i = 0; i < len; i++) {
            var _d = diagnosis[i];
            if (_d.id == 'user_custom')continue;

            if (!diseaseList[_d.id]) {
                diseaseList[_d.id] = {
                    id: _d.id,
                    name: _d.name,
                    type:_d.from
                };
            }

            // for (var j = 0; j < _d.drugs.length; j++) {
            //     var _drug = _d.drugs[j];
            //     if (!drugList[_drug.id]) {
            //         drugList[_drug.id] = _drug;
            //     }
            // }
        }

        self.diseaseList = diseaseList;
        // self.drugList = drugList;

    },

    //获取 所选择的疾病 (按药品)
    _getAllSelectedDrugToDisease: function (selDrug) {

        var self = this,
            indication = selDrug.indications,
            selInd = selDrug.selectedIndication,
            selIndLen = selInd.length,
            diseaseList = self.diseaseList;

        for (var i = 0; i < selIndLen; i++) {
            var _selInd = selInd[i];
            if (!diseaseList[_selInd]) {
                diseaseList[_selInd] = indication[_selInd];
            }
        }

    },

    //删除 选择的药
    deleteSelectedDrug: function (params) {
        var self = this,
            drugList = self.drugList,
            drugId = params.drugId;
        for (var i in drugList) {
            if (drugList[i].id == drugId) {
                drugList[i].isSelected = false;
                drugList[i].selectedIndication = [];
            }
        }

        typeof params.cb == 'function' && params.cb();
    },

    deleteHelperSelected: function (params) {
        var self = this,
            helperSel = self.helperSelect,
            drugId = params.drugId;
        for (var i = 0; i < helperSel.length; i++) {
            if (helperSel[i].id == drugId) {
                helperSel.splice(i, 1);
                break;
            }
        }
        self.deleteSelectedDrug({drugId:drugId});
        typeof params.cb=='function' && params.cb();
    },

    //删除 选择的适应症
    deleteSelectedIndication: function (params) {
        var self = this,
            drugList = self.drugList,
            drugId = params.drugId,
            indicId = params.indicationId;

        for (var i in drugList) {
            if (drugList[i].id == drugId) {
                var selIndic = drugList[i].selectedIndication,
                    idx = selIndic.indexOf(indicId);
                if (idx >= 0) {
                    selIndic.splice(idx, 1);
                }
                if (selIndic.length == 0) {
                    drugList[i].isSelected = false;
                }
                return;
            }
        }

    },

    //编辑处方
    editDrug: function (params) {
        // params = {
        //     drugId: {
        //         dosage: {value: 5, unit: 'g'},
        //         frequency: {key: '2', value: '一天两次'},
        //         time: 30,
        //         spec: {value: 2, unit: '支'},
        //         usage: {key: 'wy', value: '外用'},
        //         advice: ""
        //     }
        // }

        var self = this,
            selectedDrug = self.selectedDrug,
            selDrugLen = selectedDrug.length;

        for (var i = 0; i < selDrugLen; i++) {

            var curId = selectedDrug[i].id,
                curP = params[curId];

            selectedDrug[i].dosage = curP.dosage;
            selectedDrug[i].frequency = curP.frequency;
            selectedDrug[i].time = curP.time;
            selectedDrug[i].usage = curP.usage;
            selectedDrug[i].advice = curP.advice;
            selectedDrug[i].count = curP.count;

        }
        typeof params.cb == "function" && params.cb();
    },

    //修改单个药品的数量(总量)
    reviseDrugCount: function (params) {
        var drugId = params.drugId,
            ylVal = params.ylVal,
            pcVal = params.pcVal,
            tsVal = params.tsVal,

            selectedDrug = this.selectedDrug,
            len = selectedDrug.length;

        var count = ylVal * pcVal * tsVal;
        count = Math.ceil(count.toFixed(2));
        count = count > 0 ? count : 1;

        for (var i = 0; i < len; i++) {
            if (selectedDrug[i].id == drugId) {
                var specVal = selectedDrug[i].spec.value;
                if (specVal) {
                    selectedDrug[i].count.value = Math.ceil(count / specVal);
                } else {
                    selectedDrug[i].count.value = count;
                }

                selectedDrug[i].dosage.value = ylVal;
                selectedDrug[i].frequency.key = pcVal;
                selectedDrug[i].time = tsVal;
                break;
            }
        }
        this.renderEditDrug()
    },

    // 智能问诊 --> 用药方案
    renderDrugProjectList: function () {
        var self = this,
            diagnosis = self.diagnosis,
            len = diagnosis.length,
            str = '',
            order = 1;

        $('.drugProjectListWrap').html('');

        for (var i = 0; i < len; i++) {
            var cur = diagnosis[i];
            var _ord = '';

            if (cur.id != 'user_custom') {
                _ord = order + '、';
                order++;
            }

            str += '<div class="projectList">' +
                '<div class="title">' + _ord + cur.name + ' </div>' +
                '<div class="projectDetail">' +
                '<ul>';


            if (cur.drugs) {
                var curDrug = cur.drugs;

                for (var j = 0; j < curDrug.length; j++) {
                    var _cls = self.setTagCls(curDrug[j].type);

                    var _checkCls = '';
                    if (curDrug[j].isSelected) {
                        _checkCls = 'checked';
                    }

                    var _name = curDrug[j].name;
                    if (curDrug[j].spec && curDrug[j].spec.text && curDrug[j].spec.unit) {
                        _name += '（' + curDrug[j].spec.text + '/' + curDrug[j].spec.unit + '）';
                    }

                    str += '<li class="projectDetailList clearfix ' + _checkCls + '" data-id="' + curDrug[j].id + '" data-disease="' + diagnosis[i].id + '">' +
                        '<div class="tag tag1 ' + _cls + ' fll">' + curDrug[j].type + '</div>' +
                        '<div class="tag tag2 fll">' + curDrug[j].usage.value + '</div>' +
                        '<div class="drugName ell fll">' + _name + '</div>' +
                        '<div class="checkBox flr cursor-p"></div>' +
                        '</li>'
                }
            }
            str += '</ul></div></div>';
        }

        $('.drugProjectListWrap').append(str);

    },

    // 用药助手 --> 搜索结果列表
    renderDrugHelperSearchResultList: function () {
        var self = this,
            drugList = self.drugList,
            len = drugList.length,
            str = '';

        $('.drugHelperSearchResultList').html('');

        for (var i in drugList) {

            var cur = drugList[i],
                _cls = self.setTagCls(cur.type);

            var indic = '';   //适应症
            var curIndic = cur.indications;

            for (var j in curIndic) {
                var _t = cur.selectedIndication.indexOf(curIndic[j].id) >= 0 ? 'checked' : '';
                indic += '<div class="indication cursor-p ' + _t + '" data-id="' + curIndic[j].id + '">' +
                    '<span class="check-icon fll ' + _t + '"></span>' +
                    '<span class="fll">' + curIndic[j].name + '</span>' +
                    '</div>';
            }

            var drugState = drugList[i].isSelected ? "checked" : "";
            var _str = '';
            if (cur.dosage.value && cur.dosage.unit) {
                _str = ' 每次' + cur.dosage.value + cur.dosage.unit
            }

            var _name = cur.name;
            if (cur.spec && cur.spec.text && cur.spec.unit) {
                _name += '（' + cur.spec.text + '/' + cur.spec.unit + '）';
            }
            str += '<li class="clearfix" data-id="' + cur.id + '">' +
                '<div class="imgWrap fll">' +
                '<img src="' + cur.img + '" alt="">' +
                '</div>' +
                '<div class="listCont fll">' +
                '<div class="row1 clearfix">' +
                '<div class="fll tag tag1 ' + _cls + '">' + cur.type + '</div>' +
                '<div class="fll tag tag2">' + cur.usage.value + '</div>' +
                '<div class="fll name ell" style="max-width: 250px">' + _name + '</div>' +
                '</div>' +
                '<div class="row2">【Sig：' + cur.frequency.value + _str + '】</div>' +
                '<div class="row3">' +
                '<div class="fll">适应症：</div>' +
                '<div class="tagWrap">' +
                indic +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="listCheckIcon ' + drugState + '"></div>' +
                '</li>';

        }
        $('.drugHelperSearchResultList').append(str);
    },

    //用药助手 --> 已选择的药品
    renderSelectedDrugListWrap: function () {
        var self = this,
            // drugList = self.drugList,
            selArr = self.helperSelect,
            str = '';

        // for (var i in drugList) {
        //     if (drugList[i].isSelected) {
        //         selArr.push(drugList[i])
        //     }
        // }

        for (var i = 0; i < selArr.length; i++) {
            str += '<div class="selectedDrug fll">' +
                selArr[i].name +
                '<span class="deleteDrug cursor-p" data-id="' + selArr[i].id + '">x</span>' +
                '</div>'
        }

        $('#drugHelper .selectedDrugListWrap').html(str);

    },

    // 处方单 --> 临床诊断 结果
    renderRecipeDiseaseResult: function () {
        var self = this,
            diseases = self.diseaseList,
            str = '', idx = 1;

        for (var i in diseases) {
            str += '<li class="resultList">' + idx + '、' + diseases[i].name + '</li>';
            idx++;
        }

        $('.recipeDiseaseResult ul').html(str);
    },

    // 处方单 --> Rp
    renderRecipeDrugResult: function () {
        var self = this,
            selDrug = self.selectedDrug,
            len = selDrug.length,
            str = '';

        for (var i = 0; i < len; i++) {

            var _title = selDrug[i].name;
            if (selDrug[i].count.value && selDrug[i].count.unit) {
                _title += '&nbsp;&nbsp;' + selDrug[i].count.value + selDrug[i].count.unit
            }
            if (selDrug[i].spec.text && selDrug[i].spec.text != '' && selDrug[i].spec.unit) {
                _title += '&nbsp;&nbsp;(' + selDrug[i].spec.text + '/' + selDrug[i].spec.unit + ')'
            }

            var _sig = '';
            if (selDrug[i].usage.value && selDrug[i].usage.value != '未知') {
                _sig += '&nbsp;' + selDrug[i].usage.value + '&nbsp;';
            }
            if (selDrug[i].frequency.value) {
                _sig += '&nbsp;' + selDrug[i].frequency.value + '&nbsp;';
            }
            if (selDrug[i].dosage.value && selDrug[i].dosage.unit) {
                _sig += '&nbsp;' + '每次' + selDrug[i].dosage.value + selDrug[i].dosage.unit + '&nbsp;'
            }
            if (selDrug[i].time) {
                _sig += '&nbsp;' + '共' + selDrug[i].time + '天'
            }

            var _advice = '';
            if (selDrug[i].advice && selDrug[i].advice != '') {
                _advice += '医嘱：' + selDrug[i].advice;
            }

            str += '<li class="resultList">' +
                '<div class="drugName">' + _title + '</div>' +
                '<div class="sig">Sig：' + _sig + '</div>' +
                '<div class="advice">' + _advice + '</div>' +
                '</li>';
        }

        $('.recipeDrugResultList').html(str);
    },

    // 处方单 --> 编辑
    renderEditDrug: function () {
        var self = this,
            selDrug = self.selectedDrug,
            len = selDrug.length,
            str = '';

        var self = this,
            dosageOpts = self.dosageOpts,
            frequencyOpts = self.frequencyOpts,
            usageOpts = self.usageOpts;

        for (var i = 0; i < len; i++) {
            var cur = selDrug[i];
            str += '<li class="editResultList" data-id="' + cur.id + '">' +
                '<div class="editDrugName">' + cur.name + '</div>' +
                '<div class="clearfix">' +
                '<div class="edit_inp fll yl">' +
                '<div class="fll optName">用量：</div>' +
                '<div class="fll editBox">' +
                '<div class="editDetail fll">' +
                '<input type="text" value="' + cur.dosage.value + '" class="fll">' +
                self.drawSelect(dosageOpts, cur.dosage.unit) +
                '</div>' +
                '<span class="warn">*必填</span>' +
                '</div>' +
                '</div>' +
                '<div class="edit_inp fll pc">' +
                '<div class="fll optName">频次：</div>' +
                '<div class="fll editBox">' +
                '<div class="editDetail fll">' +
                self.drawSelect(frequencyOpts, cur.frequency.key) +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="edit_inp fll ts">' +
                '<div class="fll optName">天数：</div>' +
                '<div class="fll editBox">' +
                '<div class="editDetail fll">' +
                '<input type="text" value="' + cur.time + '">' +
                '</div>' +
                '<span class="warn">*最多30天</span>' +
                '</div>' +
                '</div>' +
                '<div class="edit_inp fll sl">' +
                '<div class="fll optName">数量：</div>' +
                '<div class="fll editBox">' +
                '<div class="editDetail fll">' +
                '<input type="text" value="' + cur.count.value + '">' +
                '<span class="unit">' + cur.count.unit + '</span>' +
                '</div>' +
                '<span class="warn">*根据情况计算</span>' +
                '</div>' +
                '</div>' +
                '<div class="edit_inp fll yf">' +
                '<div class="fll optName">用法：</div>' +
                '<div class="fll editBox">' +
                '<div class="editDetail fll">' +
                self.drawSelect(usageOpts, cur.usage.key) +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="edit_inp fll zt">' +
                '<div class="fll optName">嘱托：</div>' +
                '<div class="fll editBox">' +
                '<div class="editDetail fll">' +
                '<input type="text" value="' + cur.advice + '">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>'
        }
        $('.recipeDrugResultEdit').html(str);

    },

    drawSelect: function (sel, curOpt) {
        var str = '';
        str += '<select class="fll ">';
        for (var i = 0; i < sel.length; i++) {
            if (curOpt == sel[i].key) {
                str += '<option value="' + sel[i].key + '" selected="selected">' + sel[i].value + '</option>'
            } else {
                str += '<option value="' + sel[i].key + '">' + sel[i].value + '</option>'
            }

        }
        str += '</select>';
        return str;
    },

    setTagCls: function (type) {
        var _cls = '';
        if (type == '中成药') {
            _cls = 'zcy'
        } else if (type == '中药') {
            _cls = 'zy'
        } else {
            _cls = 'xy'
        }
        return _cls;
    }

};


function formatDis(disease) {
    var disease = JSON.parse(JSON.stringify(disease));

    for (var i = 0; i < disease.length; i++) {
        if (disease[i].drugs) {
            disease[i].drugs = formatDrug(disease[i].drugs);
        }
    }
    return disease
}

function formatDrug(drugs) {
    var result = [];

    for (var i = 0; i < drugs.length; i++) {
        var newJson = handleSingleDrug(drugs[i]);
        result.push(newJson);
    }
    return result;
}

function handleSingleDrug(drug) {

    var dosageVal = drug.usage.dosage ? drug.usage.dosage.recommend ? drug.usage.dosage.recommend : '' : '',
        timeVal = drug.usage.treatmentTime ? drug.usage.treatmentTime.recommend ? drug.usage.treatmentTime.recommend : '' : '',
        specVal = drug.spec ? drug.spec.dosageFactor ? drug.spec.dosageFactor : '' : '',
        freVal = drug.usage.frequency ? drug.usage.frequency.recommend ? drug.usage.frequency.recommend : '' : '';


    var newJson = {
        id: drug.id,
        name: drug.name,
        type: drug.type,
        img: '',
        isSelected: drug.isSelected,
        indications: {},
        selectedIndication: [],
        dosage: {
            unit: drug.usage.dosage ? drug.usage.dosage.unit ? drug.usage.dosage.unit : '' : '',
            value: dosageVal
        },
        frequency: {
            key: freVal,
            value: ''
        },
        time: timeVal,
        spec: {
            value: drug.spec ? drug.spec.dosageFactor ? drug.spec.dosageFactor : '' : '',
            unit: drug.spec ? drug.spec.unit ? drug.spec.unit : '' : '',
            text: drug.spec ? drug.spec.text ? drug.spec.text : '' : ''
        },
        count: {
            unit: drug.spec ? drug.spec.unit ? drug.spec.unit : '' : '',
            value: 1
        },
        usage: {
            value: drug.usage.method || '',
            key: drug.usage.method || ''
        },
        advice: ""
    };

    var freq = window.rxthinking.drug.frequencyOpts;
    for (var i = 0; i < freq.length; i++) {
        if (freVal && freq[i].key == freVal) {
            newJson.frequency = {
                key: drug.usage.frequency.recommend,
                value: freq[i].value
            }
        }
    }

    if (dosageVal && timeVal && freVal && specVal) {
        newJson.count.num = dosageVal * timeVal * freVal / specVal;
    }

    if (drug.indications) {
        var indic = drug.indications;
        for (var j = 0; j < indic.length; j++) {
            newJson.indications[indic[j].id] = {
                id: indic[j].id,
                name: indic[j].name
            }
        }
    }

    if (drug.images) {
        var imgs = drug.images;
        for (var j = 0; j < imgs.length; j++) {
            if (imgs[j].isPrimary) {
                newJson.img = imgs[j].url
            }
        }

        if (newJson.img == '') {
            newJson.img = drug.images[0].url;
        }
    }

    return newJson;
}