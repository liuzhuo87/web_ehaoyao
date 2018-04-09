## 第三方嵌入
1、引入在线js
```
<script src="https://assistant.rxthinking.com/js/sdk.js"></script>
```
2、调用api
```
rxThinking.createIfr({
    id:'rxthinking',      //iframe的id，可选，默认‘rx_iframe’
    name:'rxthinking',    //iframe的name，可选，如没有，同id
    ifrW: '375px',        //嵌入窗口的尺寸，width，需要带上单位'px', 必须设置
    ifrH: '667px',        //嵌入窗口的尺寸，height，需要带上单位'px', 必须设置
    ifrT: '0',            //嵌入窗口的位置，top，需要带上单位'px', 必须设置
    ifrL: '0',            //嵌入窗口的位置，left，需要带上单位'px', 必须设置
    domain:'http://127.0.0.1:4100/index.html',      //引用js的域名，可省略，
    styles: {},           //key值:驼峰命名，可省略，默认值：window.location.origin
    token:'',        //token，验证，必须的字段，通过后端对接进行获取
    cb: function (data) {       //回调函数，问诊结束后点击'查看症状'按钮触发，data为返回的问诊数据，数据结构见'4、回调参数data数据结构'
        console.log(data);
    }
});
```

3、销毁(从body里删除iframe)
```
rxThinking.destroyIfr({id:'rxthinking'});   //id : iframe的id，必须设置；
```
4、回调参数data数据结构
```
data={
     "userAge": 45,                  //用户年龄
     "userGender": "GenderMale",     //用户性别，GenderMale 男 GenderFemale 女
     "userTel": "18111111111",       //用户手机号
     "diagnose": [{                  //症状列表
         "entity": {"id": "J06.902", "name": "急性上呼吸道感染"},
         "weight": 0.852469,         //疾病权重，0 ~ 1
         "brief": "急性上呼吸道感染简称上感，又称普通感冒。是最常见的急性呼吸道感染性疾病，…",   //简介摘要
         "department": {             //症状所属科室，只有index==0时会有该字段，如无法获取科室，也没有该字段
             "id": "level2-呼吸内科",
             "name": "呼吸内科"       //科室名称
         },
         "id": "J06.902",            //疾病id
         "text": "急性上呼吸道感染"    //疾病名称
     }],
     "recall": {                     //疑似癌症时显示
         "recall": {
             "items": [{             //癌症列表，字段意思同diagnose，该列表数据未在页面中展示
                 "entity": {"id": "C22.901", "name": "肝恶性肿瘤"},
                 "weight": 0.5334332,
                 "brief": "原发性肝脏恶性肿瘤起源于肝脏的上皮或间叶组织，前者称为原发性肝癌，是我国…",
                 "department": {"id": "level2-消化内科", "name": "消化内科"},
                 "id": "C22.901",
                 "text": "肝恶性肿瘤"
             }],
             "notification": {       //癌症预警，用于页面中展示的内容
                 "title": "肝恶性肿瘤警告!",
                 "detail": "依据您的病情描述，您可能有罹患肝恶性肿瘤的风险，请尽快到医院消化内科就诊！"
             }
         },
         "isRecall": true            //是否疑似癌症
     },
     "source": "rxthinking"          //固定字段，必须
 }


 //如非疑似癌症时显示
 ...
 "recall":{
     "recall":{},
     "isRecall":false
 }
 ...
 ```

5、示例demo
```
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta name="MobileOptimized" content="320"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Page_2</title>
</head>
<body style="background: palegoldenrod;">
<div id="distory">销毁</div>
<script src="https://assistant.rxthinking.com/js/sdk.js"></script>
<script>
    //判断pc或移动
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    //设置irame的宽高
    var width = 0, height = 0;
    if (IsPC()) {
        width = '375px';
        height = '667px';
    } else {
        width = window.screen.width + 'px';
        height = window.screen.height + 'px';
    }

    //调用sdk
    rxThinking.createIfr({
        id:'rxthinking',
        //name:'rxthinking',
        ifrW: width,
        ifrH: height,
        ifrT: '0',
        ifrL: '0',
        //domain:'http://127.0.0.1:4100/index.html',
        styles: {
            'borderBotton':'1px solid #eee'
        },
        token:'这是一大串token',
        cb: function (data) {
            console.log(data);
        }
    });

    //销毁，销毁后，会从body中删除iframe
    var dis=document.getElementById('distory');
    dis.onclick=function(){
        rxThinking.destroyIfr({id:'rxthinking'});
    }

</script>
</body>
</html>

```