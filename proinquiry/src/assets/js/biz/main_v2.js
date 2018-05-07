/**
 * Created by Lian on 17/10/25.
 */

var console = !console ? {} : console;
console.log = !console.log ? function () {
    alert(JSON.stringify(arguments));
} : console.log;

$(function () {
    //点击 生成用药方案 按钮
    $(".btnRegimen").on("click", function (e) {

        var $wrap = $('#diseasePredict'),
            $checked = $wrap.find('.bdmd-checker.checked'),
            checkedSize = $checked.size(),
            customSize = $wrap.find('.customDisease').size();
        if (checkedSize == 0 && customSize == 0) {
            window.wxc.xcConfirm("请选择疾病", window.wxc.xcConfirm.typeEnum.info);
            return;
        }

        window.rxthinking.view.Save(function (err, data) {
            createDrugFun(data);

        });
    });

    function createDrugFun(data) {
        var items = data.items,
            len = items.length,
            arr = [];
        for (var i = 0; i < len; i++) {
            arr.push({
                id: items[i].id,
                type: 'EntityTypeDisease'
            });
        }
        getDrugInfo(arr, items);
    }

// 用药方案详细信息
    function getDrugInfo(ids, items) {

        var data = {
            ids: ids,
            count: 1,
            gender: rxthinking.view._genderKey,
            age: {
                year: rxthinking.view._age
            },
            state:window.rxthinking.view._state
        };
        $.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/proinquiry/drug-usage-plans',
            data: JSON.stringify(data),
            success: function (data) {
                drugSetData(data, items);
            }
        });
    };

    function drugSetData(data, list) {
        // if (!data.items || data.items.length == 0) {
        //     alert('没有找到用药方案');
        //     return;
        // }

        var items = data.items || [],
            len = items.length;

        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < len; j++) {
                if (list[i].id == items[j].id) {
                    if (items[j].items && items[j].items[0]) {

                        var itemK=items[j].items;
                        var drugArr=[],
                            ikLen=itemK.length;

                        if(ikLen>0){
                            for(var k=0;k<ikLen;k++){
                                if(itemK[k].items && itemK[k].items.length>0){
                                    drugArr=drugArr.concat(itemK[k].items);
                                }
                            }
                        }

                        list[i].drugs = drugArr;
                    } else {
                        list[i].drugs = [];
                    }
                }
            }
        }

        var diseases = formatDis(list);

        for (var i = 0; i < diseases.length; i++) {
            var curDrugs = diseases[i].drugs;
            for (var j = 0; j < curDrugs.length; j++) {
                curDrugs[j].isSelected = true;
            }
        }

        window.rxthinking.drug.setData(diseases, function () {
            window.rxthinking.drug.renderDrugProjectList();
            $('#inquiryBox .inquiryWrap').hide();
            $('#inquiryBox .drugProjectWrap').show();
            $('.pageTitle').html('智能问诊导航');
            $('#tab').attr('data-disabled', 0).find('.helper').addClass('disabled');
        });
    }

// tab
    $('#tab').on('click', 'li', function () {

        var status = $(this).parents('#tab').attr('data-disabled');
        if (status == '0') {
            return;
        }

        var index = $(this).index();

        if ($(this).hasClass('active'))return;

        if (index == '0') {
            $('#inquiryBox').show();
            $('#drugHelper').hide();

        } else if (index == '1') {  //用药助手
            $('#inquiryBox').hide();
            $('#drugHelper').show().find('.searchWrap .inpText').show().siblings('input').val('');

            try {
                window.rxthinking.drug.renderDrugHelperSearchResultList();
                window.rxthinking.drug.renderSelectedDrugListWrap();
            } catch (e) {
                console.log(e)
            }

        }
        $('.pageTitle').html('智能问诊导航');
        $(this).addClass('active').siblings().removeClass('active');

    });

//智能问诊 --> 添加疾病
    $('.addDiseaseBtn').on('click', function () {

        if ($(this).hasClass('disable'))return;
        $('.addDiseaseWrap').animate({right: 0}, 200, function () {
            $('.addDiseaseSug').show().html('<li class="null">搜索结果为空</li>');
            $('.addDiseaseWrap .placeh').css({display: 'block'});
        });
    });

    $('.resultTitle').on('click', '.close', function () {
        $('.addDiseaseWrap').animate({right: '-290px'}, 200).find('input').val('');
        $('.addDiseaseSug').hide().html('');

    });

//智能问诊 --> 搜索疾病
    $('.resultTitle .addDiseaseWrap .placeh').click(function () {
        $(this).css({display: 'none'}).siblings('input').focus();
    });

// ;(function () {
    var addDiseaseSearchResNum = 0,
        addDiseaseSearchReqNum = 0,
        addDiseaseSearchList = [];
    $('.resultTitle .addDiseaseWrap input').on('input propertychange', function () {
        var $this = $(this),
            $parent = $this.parent('.addDiseaseInp'),
            $sug = $parent.siblings('.addDiseaseSug'),
            val = $('.resultTitle input').val();

        if (val == '') {
            $sug.html('<li class="null">搜索结果为空</li>');
            return;
        }

        var data = {
            text: val,
            count: 6,
            types: 'EntityTypeDisease'
        };

        addDiseaseSearchReqNum++;
        $.ajax({
            type: 'GET',
            url: '/_/ai/v1/doctor/entity/suggestions',
            data: data,
            success: function (data) {
                addDiseaseSearchResNum++;
                if (!data.items || data.items.length == 0) {
                    $sug.html('<li class="null">搜索结果为空</li>');
                    return;
                }
                if (addDiseaseSearchReqNum == addDiseaseSearchResNum && addDiseaseSearchReqNum != 0) {
                    var list = data.items,
                        len = list.length,
                        str = '';
                    for (var i = 0; i < len; i++) {
                        str += '<li class="cursor-p ell" data-id="' + list[i].id + '">' + list[i].name + '</li>'
                    }
                    $sug.html(str);
                    addDiseaseSearchList = list;
                }
            }
        });
    });

    $('.addDiseaseWrap').on('click', '.addDiseaseSug li', function () {
        var id = $(this).attr('data-id'),
            json = {};

        if ($(this).hasClass('null'))return;

        for (var i = 0; i < addDiseaseSearchList.length; i++) {
            if (addDiseaseSearchList[i].id == id) {
                json = addDiseaseSearchList[i];
            }
        }

        window.rxthinking.view.diseaseLiUnshift({
            disease: {
                "id": id,
                "name": json.name
            },
            id: id,
            "name": json.name,
            "from": "input"
        }, function () {
            $('.addDiseaseBtn').addClass('disable');
            $('.resultTitle').find('.close').click();
            addDiseaseSearchResNum = 0;
            addDiseaseSearchReqNum = 0;
        });

    });

// })()

    $("#diseasePredict").on("click", ".customDisease .checker-delete", function () {
        var id = $(this).attr('data-id');

        $('.addDiseaseBtn').removeClass('disable');
        $('.customDisease').remove();

        window.rxthinking.view.removeCustom(id)

    });

// ;(function () {
    var inquirySugResNum = 0,
        inquirySugReqNum = 0,
        // timer = null,
        searchResult = null,
        selctedDrug = null;

    // 智能问诊 --> 搜索
    $('.drugProjectWrap .searchWrap input').on('input propertychange', function () {
        var $this = $(this),
            $sugEl = $this.siblings('.inquirySuggestions');

        // if (timer)return false;
        // timer = setTimeout(function () {
        //     clearTimeout(timer);
        //     timer = null;

        var val = $('.drugProjectWrap .searchWrap input').val(),
            data = {
                text: val,
                count: 10,
                type: 'EntityTypeDrugProduct',
                userType: 'UserDoctor',
                gender: rxthinking.view._genderKey,
                age: {
                    year: rxthinking.view._age
                }
            };

        if (!val) {
            $sugEl.html('').hide(100);
            return false;
        }

        $this.siblings('.searchBtn').attr({'data-id': '', 'data-type': ''}).addClass('disabled');

        inquirySugReqNum++;
        $.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/entity/drugs',
            data: JSON.stringify(data),
            success: function (data) {
                inquirySugResNum++;
                if (inquirySugReqNum == inquirySugResNum && inquirySugReqNum != 0) {
                    var list = data.items || [],
                        len = list.length,
                        str = '';
                    if (len == 0) {
                        str = '<li class="null">搜索结果为空</li>';
                    } else {
                        for (var i = 0; i < len; i++) {
                            var _name = list[i].name;
                            if (list[i].spec && list[i].spec.text && list[i].spec.unit) {
                                _name += '（' + list[i].spec.text + '/' + list[i].spec.unit + '）';
                            }

                            str += '<li class="cursor-p ell" data-id="' + list[i].id + '" data-type="' + list[i].type + '">' + _name + '</li>'
                        }
                    }
                    $sugEl.html(str).show(100);
                    searchResult = list;
                }
            }
        });
        // }, 400);
    });


    // 智能问诊 --> 点击搜索结果列表
    $('.inquirySuggestions').on('click', 'li', function () {
        var sugId = $(this).attr('data-id'),
            sugType = $(this).attr('data-type'),
            $parent = $(this).parent('ul'),
            $html = $(this).html();

        $parent.hide(100).html('');
        $parent.siblings('.inpText').html($html).show();
        $parent.siblings('input').val($(this).html());
        $parent.siblings('.searchBtn').attr({'data-id': sugId, 'data-type': sugType}).removeClass('disabled');
        inquirySugResNum = 0;
        inquirySugReqNum = 0;

    });

    $('.drugProjectWrap').on('click', '.inpText', function () {
        $(this).hide();
        $(this).siblings('input').focus();
    });

    // 智能问诊 --> 点击 添加(搜索)
    $('.drugProjectWrap').on('click', '.searchBtn', function () {

        var $this = $(this),
            addDrugId = $this.attr('data-id'),
            addDrugName = $this.siblings('input').val();

        for (var i = 0; i < searchResult.length; i++) {
            if (searchResult[i].id == addDrugId) {
                selctedDrug = searchResult[i];
                selctedDrug.isSelected = true;
            }
        }
        rxthinking.drug.userCustomDrug(selctedDrug, function () {

            $this.attr({'data-id': '', 'data-type': ''}).addClass('disabled');
            $this.siblings('input').val('');
            $this.siblings('inpText').html('');

            rxthinking.drug.renderDrugProjectList();
        })

    });

// })();


//智能问诊 --> 选择用药
    $('#main').on('click', '.projectDetailList', function () {

        var drugId = $(this).attr('data-id'),
            diseaseId = $(this).attr('data-disease');

        var bool = setChecked($(this));
        // console.log(bool);
        rxthinking.drug.selectDrug({id: drugId, diseaseId: diseaseId, bool: bool});

    });

//智能问诊 --> 点击 生成处方
    $('.createDrugProject').click(function () {
        window.rxthinking.drug.getAllSelectedDrug('inquiry');
        createDrug();
    });

//用药助手 --> 选择适应症
    $('#drugHelper').on('click', '.indication', function () {
        var $li = $(this).parents('li'),
            indicId = $(this).attr('data-id'),
            drugId = $li.attr('data-id');

        setChecked($(this));
        setChecked($(this).find('.check-icon'));
        rxthinking.drug.selectIndication({drugId: drugId, indicId: indicId});

        // if ($(this).parent().find('.indication.checked').size() > 0) {
        //     $li.find('.listCheckIcon').addClass('checked');
        // } else {
        //     $li.find('.listCheckIcon').removeClass('checked');
        // }

        if ($(this).parent().find('.indication.checked').size() <= 0) {
            delHelperSel(drugId);
        }

        rxthinking.drug.renderSelectedDrugListWrap();
        rxthinking.drug.renderDrugHelperSearchResultList();
        setHelperH();
    });

    function setHelperH() {
        var wrapH = $('#drugHelper .drugListWrap').height(),
            selH = $('#drugHelper .selectedDrugWrap').height();
        var _h = wrapH - selH - 30;
        $('.drugHelperSearchResultList').css({height: _h})
    };

//用药助手 --> 删除选中药品
    $('#drugHelper').on('click', '.deleteDrug', function () {
        var id = $(this).attr('data-id');
        delHelperSel(id);
    });

    function delHelperSel(id) {
        rxthinking.drug.deleteHelperSelected({
            drugId: id,
            cb: function () {
                rxthinking.drug.renderDrugHelperSearchResultList();
                rxthinking.drug.renderSelectedDrugListWrap();
                setHelperH();
            }
        });
    }

//用药助手 --> 搜索
    $('#drugHelper').on('click', '.searchWrap .inpText', function () {
        $(this).hide().siblings('input').focus();
    });

    $('#drugHelper').on('click', '.searchBtn', function () {
        var inpVal = $(this).siblings('input').val(),
            type = $(this).siblings('.select').find('select').val();
        if (!inpVal)return;
        var data = {
            text: inpVal,
            count: 10,
            type: type,
            gender: rxthinking.view._genderKey,
            age: {
                year: rxthinking.view._age
            }
        };

        $.ajax({
            type: 'POST',
            url: '/_/ai/v1/doctor/entity/drugs',
            data: JSON.stringify(data),
            success: function (data) {
                var items = [];
                if (data.items && data.items.length > 0) {
                    items = data.items;
                } else {
                    $('.drugHelperSearchResultList').html('<li style="text-align: center">没有要搜索的内容</li>');
                    return;
                }

                $('.drugHelperSearchResultList').scrollTop(0);
                rxthinking.drug.setDrugList(items);
                rxthinking.drug.renderDrugHelperSearchResultList();
                setHelperH();
            }
        });

    });

//用药助手 --> 生成处方
    $('#drugHelper').on('click', '.helperCreateDrug', function () {
        window.rxthinking.drug.getAllSelectedDrug('assistant');
        createDrug()
    });

//预览处方 --> 点击 编辑  编辑处方
    $('#recipe').on('click', '.editDrugResult', function () {

        window.rxthinking.drug.renderEditDrug();

        $('.pageTitle').html('预览处方笺');
        $(this).hide();

        $('.resultListWrap').hide();
        $('.editResultWrap').show();

        $('#submitData').hide();
        $('#sureEdit').show();
    });

//预览处方 --> 点击 完成  确认编辑输入
    $('#recipe').on('click', '#sureEdit', function () {
        var params = getEditData();
        params.cb = function () {
            rxthinking.drug.renderRecipeDrugResult();
            $('.pageTitle').html('预览处方笺');

            $('.editDrugResult').show();

            $('.resultListWrap').show();
            $('.editResultWrap').hide();

            $('#submitData').show();
            $('#sureEdit').hide();
        };

        rxthinking.drug.editDrug(params);

    });

//预览处方 --> 编辑用量
//     $('.recipeDrugResultEdit').on('change', '.yl input', function () {
//         var $this = $(this);
//         getDrugCount($this);
//     });

//预览处方 --> 编辑频次
//     $('.recipeDrugResultEdit').on('change', '.pc select', function () {
//         var $this = $(this);
//         getDrugCount($this);
//     });

//预览处方 --> 编辑天数
//     $('.recipeDrugResultEdit').on('change', '.ts input', function () {
//         var $this = $(this);
//         getDrugCount($this);
//     });

    function getDrugCount($obj) {
        var $parent = $obj.parents('.editResultList'),
            drugId = $parent.attr('data-id');

        var ylVal = $parent.find('.yl input').val(),
            pcVal = $parent.find('.pc select').val(),
            tsVal = $parent.find('.ts input').val();


        // if (!isNaN(Number(ylVal)) || !isNaN(Number(tsVal))) {
        //     alert("用量或天数的内容应为数字");
        //     return;
        // }

        window.rxthinking.drug.reviseDrugCount({drugId: drugId, ylVal: ylVal, pcVal: pcVal, tsVal: tsVal})

    }


    function createDrug() {

        window.rxthinking.drug.renderRecipeDiseaseResult();
        window.rxthinking.drug.renderRecipeDrugResult();

        $('.pageTitle').html('预览处方笺');
        $('#main').hide();
        $('#recipe').show();
        $('#recipe').find('.createTime .val').html(new Date().format("yyyy-MM-dd"));
        if (window.rxthinking.view._gender == '男') {
            $('#recipe .gender .male').addClass('checked').siblings('.female').removeClass('checked');
        } else if (window.rxthinking.view._gender == '女') {
            $('#recipe .gender .female').addClass('checked').siblings('.male').removeClass('checked');
        }
        $('#recipe .age .val').html(window.rxthinking.view._age + '岁');
    }

    function getEditData() {
        var json = {};
        $('.recipeDrugResultEdit').find('.editResultList').each(function (i, el) {
            var _json = {},
                id = $(this).attr('data-id'),
                $this = $(this);
            _json.dosage = {
                value: $this.find('.yl input').val(),
                unit: $this.find('.yl select').val()
            };
            _json.frequency = {
                key: $this.find('.pc select').val(),
                value: $this.find('.pc select').find("option:selected").text()
            };
            _json.time = $this.find('.ts input').val();
            _json.count = {
                value: $this.find('.sl input').val(),
                unit: $this.find('.sl .unit').html()
            };
            _json.usage = {
                key: $this.find('.yf select').find("option:selected").text(),
                value: $this.find('.yf select').val()
            };
            _json.advice = $this.find('.zt input').val();
            json[id] = _json;
        });
        return json;
    }

    function setChecked($obj) {
        if ($obj.hasClass('checked')) {
            $obj.removeClass('checked');
            return false;
        } else {
            $obj.addClass('checked');
            return true;
        }
    }
});

