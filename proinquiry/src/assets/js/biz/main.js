/**
 * Created by willzhao on 17/7/13.
 * Rewrite by chideat on 17/8/6.
 * Rewrite by Lian on 17/10/25.
 */

var console = !console ? {} : console;
console.log = !console.log ? function () {
    alert(JSON.stringify(arguments));
} : console.log;

function bind(obj, evname, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evname, fn, false);
    } else {
        obj.attachEvent("on" + evname, function () {
            fn.call(obj);
        })
    }
}

function FeatureState(state) {
    switch ((state || "unknown").toString().toLowerCase()) {
        case "0":
        case "featurestatepositive":
        case "positive":
        case "+":
            this.state = "0";
            break;
        case "1":
        case "featurestatenegative":
        case "negative":
        case "-":
            this.state = "1";
            break;
        default:
            this.state = "2";
            break;
    }
}

FeatureState.prototype.toString = function () {
    switch (this.state) {
        case "0":
            return "FeatureStatePositive";
        case "1":
            return "FeatureStateNegative";
        default:
            return "FeatureStateUnknown";
    }
};

function View(gender, age) {
    this._items = [];
    this._itemsFilter = {};

    this._age = parseInt(age);
    this._gender = gender;
    this._max_disease_count = 8;
    this._state='';

    this._selectedDisease = [];
    this._diseaseList = [];

}

View.prototype.Init = function (data) {
    this._age = (data && data.age) ? parseInt(data.age) : this._age;
    this._gender = (data && data.gender) ? data.gender : (data && data.sex ? data.sex : this._gender);

    this._genderKey = this._gender == '男' ? 'GenderMale' : 'GenderFemale';

    // init page
    $("#pSex").text(this._gender);
    $("#pAge").text(this._age);

    this.UpdatePatientComplaint(data && data.mainDiag ? data.mainDiag : "");
    this.UpdatePresentIllness(data && data.illHistory ? data.illHistory : "");
    this.UpdatePreviousHistory(data && data.pastHistory ? data.pastHistory : "");

    $("#diseasePredict").empty();
    $("#nextAskContainer").empty();
    $('#askResult').empty();

    this._items = [];
    this._itemsFilter = {};

    this._selectedDisease = [];
    this._diseaseList = [];
};

View.prototype.diseaseLiUnshift = function (disease, cb) {
    var _disL = this._diseaseList;

    for (var i = 0; i < _disL.length; i++) {
        if (_disL[i].disease.id == disease.id) {
            alert('请在列表中勾选');
            return;
        }
    }

    _disL.unshift(disease);
    this._selectedDisease.push(disease);
    this.setCheckedOrder();
    typeof cb == 'function' && cb();

};

View.prototype.removeCustom = function (diseaseId) {

    var _li = this._diseaseList,
        _sel = this._selectedDisease;

    for (var i = 0; i < _li.length; i++) {
        if (_li[i].disease.id == diseaseId) {
            _li.splice(i, 1);
            break;
        }
    }
    for (var i = 0; i < _sel.length; i++) {
        if (_sel[i].id == diseaseId) {
            _sel.splice(i, 1);
            break;
        }
    }

    this.setCheckedOrder();
};
View.prototype.GetSymptom = function (index) {
    var self = this;

    index = parseInt(index);
    if (index < 0 || index >= self._items.length) {
        return undefined;
    }
    return self._items[index];
};

View.prototype.SetSymptoms = function (items) {
    var self = this;
    $("#nextAskContainer").empty();

    items = items || [];

    items.forEach(function (item, index) {

        if (!item.id || !!self._itemsFilter[item.name]) {
            return;
        }
        self._items.push(item);
        self._itemsFilter[item.id] = item;

        var domStr = '';
        domStr += '<div class="next-ask-item" data-id="' + (self._items.length - 1) + '" data-type="' + item.type + '">' +
            '<div class="question">' + (index + 1) + '.' + item.text + '</div>' +
            '<div class="question-options">';

        item.options.forEach(function (val, idx) {
            domStr += '<div class="question-item" data-value="' + val.key + '">' + val.text + '</div>'
        });
        domStr += '</div></div>';
        $("#nextAskContainer").append(domStr)
    });
};

View.prototype.SetDiseases = function (items) {
    var self = this;
    $("#diseasePredict").empty();

    items = items || [];
    var count = 0;

    items.forEach(function (item, index) {
        var startStr, centerStr, endStr;

        if (count >= self._max_disease_count) {
            return true;
        }

        if (item.from == 'input') {

            var str = '<div class=" customDisease" data-id="' + item.disease.id + '">' +
                '<label class="bdmd-check-label">' + '<div class="checker-delete" data-id="' + item.disease.id + '">x</div>' + item.disease.name + '</label>' +
                '<div class="checkedOrder flr" style="display: inline-block">' + item.checkedOrder + '</div>' +
                '</div>';
            $("#diseasePredict").prepend(str)
        } else {

            centerStr = '<input type="checkbox" class="subcheck" name="disease-' + item.disease.id + '" data-id="' + item.disease.id + '" data-name="' + item.disease.name + '">' +
                '<label class="bdmd-check-label" for="disease-' + item.disease.id + '"><div class="checker-icon"></div>' + item.disease.name + '(' + (item.disease.id) + ')</label>';

            if (item.checkedOrder && item.checkedOrder != '') {
                startStr = '<div class="bdmd-checker checked clearfix" data-id="' + item.disease.id + '">';
                endStr = '<div class="checkedOrder flr" style="display: inline-block">' + item.checkedOrder + '</div></div>'
            } else {
                startStr = '<div class="bdmd-checker unchecked clearfix" data-id="' + item.disease.id + '">';
                endStr = '<div class="checkedOrder flr" style="display: none"></div></div>'
            }

            $("#diseasePredict").append(startStr + centerStr + endStr);
        }

        count++;
    });

    self._diseaseList = items;

    if ($("#diseasePredict").length === 0) {
        handle.append('<span>暂无疾病预测结果</span>');
    }
};

View.prototype.Refresh = function (items) {
    var self = this;

    self._diseaseList = [];
    self._selectedDisease = [];
    self._state=items.state;

    self.SetSymptoms(items.questions);
    self.SetDiseases(items.diagnosis ? items.diagnosis.items ? items.diagnosis.items : [] : []);

};

View.prototype.getSelectDiseaseSize = function () {
    var self = this,
        _sel = self._selectedDisease,
        allNum = _sel.length,
        predictNum = 0,
        inputNum = 0;
    for (var i = 0; i < allNum; i++) {
        if (_sel[i].from == 'predict') {
            predictNum++
        } else if (_sel[i].from == 'input') {
            inputNum++
        }
    }
    return {allNum: allNum, predictNum: predictNum, inputNum: inputNum}
};

View.prototype.SelectDisease = function (disease) {
    var self = this,
        _sel = self._selectedDisease;
    for (var i = 0; i < _sel.length; i++) {
        if (_sel[i].id == disease.id) {
            return;
        }
    }

    self._selectedDisease.push(disease);
    self.setCheckedOrder();
};

View.prototype.UnselectDisease = function (disease) {
    var self = this,
        _sel = self._selectedDisease;
    for (var i = 0; i < _sel.length; i++) {
        if (_sel[i].id == disease.id) {
            self._selectedDisease.splice(i, 1);
            self.setCheckedOrder();
            return;
        }
    }
};

View.prototype.setCheckedOrder = function () {
    var self = this,
        _sel = self._selectedDisease,
        _li = self._diseaseList || [];

    for (var j = 0; j < _li.length; j++) {
        _li[j].checkedOrder = '';
        for (var i = 0; i < _sel.length; i++) {
            if (_sel[i].id == _li[j].disease.id) {
                _li[j].checkedOrder = i + 1;
            }
        }
    }


    self.SetDiseases(_li);
};

View.prototype.GetPatientComplaint = function () {
    return $("#patientComplaint .input-main-content").val() || "";
}

View.prototype.UpdatePatientComplaint = function (text) {
    $("#patientComplaint .detail").text(text || "");
    $("#patientComplaint .input-main-content").val(text || "");
}

View.prototype.GetPresentIllness = function () {
    return $("#historyOfPresentIllness .input-main-content").val() || "";
}

View.prototype.UpdatePresentIllness = function (text) {
    var ret = "";
    (text || "").split(/[,，.。\s]/i).forEach(function (item) {
        if (!item) {
            return;
        }
        ret = ret + item + "，";
    });
    $("#historyOfPresentIllness .detail").text(ret);
    $("#historyOfPresentIllness")[0].scrollTop = $("#historyOfPresentIllness")[0].scrollHeight;

    $("#historyOfPresentIllness .input-main-content").val(ret);
};

View.prototype.GetPreviousHistory = function () {
    return $("#previousHistory .input-main-content").val() || "";
};

View.prototype.UpdatePreviousHistory = function (text) {
    var ret = "";
    (text || "").split(/[,，.。\s]/i).forEach(function (item) {
        if (!item) {
            return;
        }
        ret = ret + item + "，";
    });
    $("#previousHistory .detail").text(ret);
    $("#previousHistory")[0].scrollTop = $("#previousHistory")[0].scrollHeight;

    $("#previousHistory .input-main-content").val(ret);
};

View.prototype.UpdateState = function (index, state) {
    index = parseInt(index);
    if (index < 0 || index >= this._items.length) {
        return false;
    }

    this._items[index].state = state;
};
View.prototype.SelectedOpt = function (index, state) {
    index = parseInt(index);
    if (index < 0 || index >= this._items.length) {
        return false;
    }

    this._items[index].selected = state;
};

View.prototype.Serialize = function () {
    var self = this;

    var symptoms = [],
        pastDiseases = [];

    this._items.forEach(function (item) {
        if (item.$deleted) {
            return;
        }
        switch (item.type) {
            case "InferencedItemSymptom":
                var data = item.detail.symptom;
                var symptom = {
                    id: data.id,
                    state: (new FeatureState(item.state)).toString()
                };
                if (data.attrs) {
                    symptom.attrs = data.attrs;
                }
                symptoms.push(symptom);
                break;
            case "InferencedItemPastDisease":
                var data = item.detail.pastDisease;
                var pastDisease = {
                    id: data.id,
                    state: (new FeatureState(item.state)).toString()
                };
                pastDiseases.push(pastDisease);
                break;
        }
    });
    return {
        texts: {
            patientComplaint: self.GetPatientComplaint(),
            presentIllnessHistory: self.GetPresentIllness(),
            medicalHistory: self.GetPreviousHistory()
        },
        gender: (this._gender == "男" ? "GenderMale" : (this._gender == "女" ? "GenderFemale" : "GenderUnknown")),
        age: {
            year: self._age
        }
        // symptoms: symptoms,
        // pastDiseases: pastDiseases
    };
};

View.prototype.Save = function (callback) {

    var selDis = this._selectedDisease,
        disL = this._diseaseList;

    for (var i = 0; i < selDis.length; i++) {
        for (var j = 0; j < disL.length; j++) {
            if (selDis[i].id == disL[i].disease.id) {
                selDis[i].drugUsagePlans = disL[i].drugUsagePlans;
            }
        }
    }

    var ret = {
        items: selDis,
        mainDiag: this.GetPatientComplaint(),
        illHistory: this.GetPresentIllness(),
        pastHistory: this.GetPreviousHistory()
    };
    // $("#askResult .result-item").each(function () {
    //     ret.items.push({
    //         code: $(this).attr("data-id"),
    //         name: $(this).attr("data-name")
    //     });
    // });
    typeof callback == "function" && callback(null, ret);
};

View.ShowWaiting = function () {
    $(".mask-body").show();
    $(".mask-watting-for").show();
};

View.HideWaiting = function () {
    $(".mask-body").hide();
    $(".mask-watting-for").hide();
};

function API() {
    this.info = {
        inference: {
            state: "",
            options: {
                "questionSize": 7,
                "enableAskSymptom": true,
                "enableAskPastDisease": true,
                "enableAskLabItem": false,
                "enableDiagnose": true,
                "diagnosisSize": 5,
                "enableSeparateDepartment": false,
                "separateDepartmentSize": 1
            }
        }
    };

    this._parentURL = decodeURIComponent(getQueryString("purl"));
}

API.prototype.Inference = function (data, callback) {
    var self = this;

    if (!data.texts || !data.texts.patientComplaint) {
        window.wxc.xcConfirm("请输入主诉信息", window.wxc.xcConfirm.typeEnum.info);
        return false;
    }

    data["options"] = self.info.inference.options;
    data["state"] = self.info.inference.state;
    $.ajax({
        type: "POST",
        // url: '/_/ai/v1/doctor/inferencer/inference',
        url: '/_/ai/v1/doctor/proinquiry',
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        success: function (data) {
            self.info.inference.state = data.state || "";
            callback(null, data || {});
        },
        error: function (err) {
            // console.log(err);
            callback(err);
        }
    });
};

API.prototype.InputSuggestions = function (type, input, callback) {
    if (!input) {
        callback("invalid input");
        return;
    }
    if (type === "disease") {
        $.ajax({
            type: "POST",
            url: '/_/ai/v1/entity/search/disease',
            data: JSON.stringify(input),
            dataType: "json",
            contentType: 'application/json',
            success: function (ret) {
                callback(null, ret.items || []);
            },
            error: function (err) {
                callback(err);
            }
        });
    } else if (type === "symptom") {
        callback(); // pass
    } else {
        callback("invalid suggestion type");
    }
};

API.prototype.Save = function (state, data) {
    var ret = {
        state: parseInt(state) || 0
    };
    state = parseInt(state);

    var _data = {
        illHistory: data.illHistory || '',
        mainDiag: data.mainDiag || '',
        pastHistory: data.pastHistory || '',
        customDiagnose:''
    };

    _data.diseases = window.rxthinking.drug.diseaseList;
    _data.drugs = window.rxthinking.drug.selectedDrug;

    var json=this.handlePostData(_data);
    _data=json.data;
    _data.customDiagnose=json.customDiseaseName;

    if (ret.state === 1) {
        ret.data = _data;
    } else {
        ret.message = (data || "unknown error").toString();
    }

    ret.type = 'sendData';
    this.Postmessage(ret);

};

API.prototype.handlePostData=function (data) {
    var _data=JSON.parse(JSON.stringify(data)),
        name='';
    _data.items=[];

    if(_data.diseases && JSON.stringify(_data.diseases)!='{}'){
        var _dis=_data.diseases;
        for(var i in _dis){
            if(_dis[i].type=='input'){
                name=_dis[i].name;
            }else{
                _data.items.push({
                    code:_dis[i].id || '',
                    name:_dis[i].name || ''
                });
            }
        }
    }
    return {data:_data,customDiseaseName:name}
};

API.prototype.Postmessage = function (data) {
    data.source = 'rxthinking';
    window.parent.postMessage(JSON.stringify(data), this._parentURL);
};

window.rxthinking = window.rxthinking ? window.rxthinking : {};
window.rxthinking.view = new View("男", "27岁");
window.rxthinking.api = new API();


$(function () {
    bind(window, 'message', function (e) {
        var e = window.event || arguments[0];

        if (e.source != window.parent) return;
        var data = JSON.parse(e.data);
        pageInit();
        window.rxthinking.view.Init(data.data);
    });


    function pageInit() {
        $('#recipe').hide();
        $('#main').show();
        $('#inquiryBox').show();
        $('#drugHelper').hide();
        $('.inquiryWrap').show();
        $('.drugProjectWrap').hide();
        $('#tab').attr({'data-disabled': 1}).find('.helper').removeClass('disabled active').siblings('.inquiry').addClass('active');
        window.rxthinking.drug.init();
    }

    $(".textarea-block").on("click", function (e) {
        $(this).find(".main-content").hide();
        $(this).find(".input-main-content").show().focus();
    });

    $(".textarea-block").on("blur", ".input-main-content", function (e) {
        $(".main-content", $(this).hide().parent()).show().find(".detail").empty().text($(this).val() || "");
    });


    // 点击追问选项
    $("#nextAskContainer").on("click", ".question-options>.question-item", function (e) {
        var $parent = $(this).parents(".next-ask-item"),
            curKey = $(this).attr('data-value');

        if ($(this).hasClass("active")) {
            return;
        }

        var id = $parent.attr("data-id");
        var symptom = window.rxthinking.view.GetSymptom(id),
            options = symptom.options;

        // var oldVal = symptom.formatedAnswers[$parent.find(".question-item.active").attr("data-value") || ""] || "";

        var oldOptKey = $parent.find(".question-item.active").attr("data-value") || '',
            oldOpt = transOpt(options, oldOptKey),
            oldVal = oldOpt.answer || '',
            oldKey = oldOpt.key || '';

        $parent.find(".question-item").removeClass("active");
        $(this).addClass("active");

        var items = [];
        switch (symptom.type) {
            case "QuestionTypeSymptom":
                items = window.rxthinking.view.GetPresentIllness().split(/[,，.\s]/i);
                break;
            case "QuestionTypePastDisease":
                items = window.rxthinking.view.GetPreviousHistory().split(/[,，.\s]/i);
                break;
        }

        // filter and merge
        for (var i = 0; i < items.length; i++) {
            if (items[i] === oldVal) {
                items[i] = "";
            }
        }
        items.push(transOpt(options, curKey).answer || '');

        window.rxthinking.view.SelectedOpt(id, $(this).attr("data-value") || "");

        var text = "";
        items.forEach(function (item) {
            if (!item) {
                return;
            }
            text = text + item + "，";
        });

        switch (symptom.type) {
            case "QuestionTypeSymptom":
                window.rxthinking.view.UpdatePresentIllness(text);
                break;
            case "QuestionTypePastDisease":
                window.rxthinking.view.UpdatePreviousHistory(text);
                break;
        }

    });

    function transOpt(opt, s) {
        for (var i = 0; i < opt.length; i++) {
            if (opt[i].key == s) {
                return opt[i];
            }
        }
        return {};
    };

    $("#diseasePredict").on("click", ".bdmd-checker", function () {
        var disease = {
            "id": $(this).find("input[type=checkbox]").attr("data-id"),
            "name": $(this).find("input[type=checkbox]").attr("data-name"),
            "from": "predict"
        };

        var selNum = window.rxthinking.view.getSelectDiseaseSize();

        if ($(this).hasClass('checked')) {
            $(this).addClass("unchecked").removeClass('checked');
            window.rxthinking.view.UnselectDisease(disease);
        } else {
            if (selNum.allNum >= 4 || selNum.predictNum >= 3) {
                return;
            }
            $(this).addClass("checked").removeClass('unchecked');
            window.rxthinking.view.SelectDisease(disease);
        }

    });

    $("#btnAsk").on("click", function (e) {
        var data = window.rxthinking.view.Serialize();

        window.rxthinking.api.Inference(data, function (err, items) {
            if (err) {
                return;
            }

            $('.addDiseaseWrap').animate({right: '-290px'}, 200).find('input').val('');
            $('.addDiseaseSug').hide().html('');
            $('.addDiseaseBtn').removeClass('disable');
            window.rxthinking.view.Refresh(items);
        });
    });

    // 保存结果并发送数据
    $(document).on('click', '#submitData', function () {
        window.wxc.xcConfirm("点击确认保存数据并返回", "custom", {
            title: "保存数据",
            btn: parseInt("0011", 2),
            onOk: function () {
                window.rxthinking.view.Save(function (err, data) {

                    if (err) {
                        window.rxthinking.api.Save(0, err);
                    } else {
                        window.rxthinking.api.Save(1, data);
                    }
                });
            }
        });
    });

    $('.closeWin').click(function () {
        var data = {
            type: 'closeIfr'
        };
        rxthinking.api.Postmessage(data);
    });


    // $("#clearAsk").on("click", function (e) {
    //     window.wxc.xcConfirm("确认要清除问诊数据？", "custom", {
    //         title: "自定义",
    //         btn: parseInt("0011", 2),
    //         onOk: function () {
    //             window.rxthinking.view.Init();
    //             window.rxthinking.api.info.inference.state = "";
    //         }
    //     });
    // });

    // $("#askResult").on("click", ".item-del", function (e) {
    //     var $parent = $(this).parents(".result-item");
    //     var disease = {
    //         "id": $parent.attr("data-id"),
    //     };
    //     window.rxthinking.view.UnselectDisease(disease);
    // });

    // $('.addDisease').on('click', function () {
    //
    //     if($(this).hasClass('disabled'))return;
    //     $(this).addClass('disabled');
    //     window.wxc.xcConfirm("", "input", {
    //         onOk: function (value) {
    //             if (value == '')return;
    //
    //             window.rxthinking.view.diseaseLiUnshift({
    //                 disease:{
    //                     "id": "custom_disease",
    //                     "name": value
    //                 },
    //                 id:"custom_disease",
    //                 "name": value,
    //                 "from": "input"
    //             });
    //         }
    //     })
    // });

    // $(window).on("click", function () {
    //     if ($(".sug-menu").is(":visible")) {
    //         $(".sug-menu").hide();
    //     }
    // });

    // input suggestion
    // $("#addICD10Value").on("keyup", function (e) {
    //     var self = this;
    //     if ($("#addICD10Value").val()) {
    //         $("#btnAddICD10OK").get(0).disabled = false;
    //     } else {
    //         $("#btnAddICD10OK").get(0).disabled = true;
    //     }
    //     if (!$(self).val()) {
    //         $(".sug-menu").empty().hide();
    //         return;
    //     }
    //     throttle(function () {
    //         window.rxthinking.api.InputSuggestions("disease", {
    //             "text": $(self).val(),
    //             "start": 0,
    //             "size": 6,
    //         }, function (err, data) {
    //             if (err) {
    //                 console.log(err);
    //                 return;
    //             }
    //             window.rxthinking.view.SetDiseaseSuggestion(data);
    //         });
    //     }, 300)();
    // });

    // $(".sug-menu").on("click", ".sug-item", function (e) {
    //     if ($(this).hasClass("no-item")) {
    //         return false;
    //     }
    //     window.rxthinking.view.SelectDisease({
    //         "id": $(this).attr("data-id"),
    //         "name": $(this).text(),
    //         "from": "input"
    //     });
    //     $("#addICD10Value").val("");
    //     $(".sug-menu").empty().hide();
    // });

    // $("#btnAddICD10OK").on("click", function (e) {
    //     window.rxthinking.view.SelectDisease({
    //         "id": "",
    //         "name": $("#addICD10Value").val(),
    //         "from": "input"
    //     });
    //     $("#addICD10Value").val("");
    //     $(this).get(0).disabled = true;
    // });
});

