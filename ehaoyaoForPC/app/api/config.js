module.exports = {
    // cfg: "http://192.168.100.40:8002",
    // cfg: "https://api.rxthinking.com",//本地测试版
    cfg: "/_",//本地测试版
    statisticCfg: 'https://api.rxthinking.com',
    statisticUrl: '/stats/v1/icon.png',

    start: '/ai/v1/assistant/conversation/start',
    talk: '/ai/v1/assistant/conversation/talk',
    close: '/ai/v1/assistant/conversation/close',

    symptomListCfg: '/ai/v1/doctor/entity/symptoms',    // 症状查询
    diseaseListCfg: '/ai/v1/doctor/entity/diseases',    // 疾病查询
    symptomSuggest: '/ai/v1/doctor/entity/suggestion/symptoms',      // 症状搜索
    drugUsagePlans: '/ai/v1/doctor/inquiry/drug-usage-plans',  //用药方案
    drugEntityUsagePlans: '/ai/v1/doctor/entity/drug-usage-plans',  //用药方案
    diseaseSuggest:'/ai/v1/doctor/entity/suggestions?text=' ,//疾病搜索
    drugInfo:'/ai/v1/doctor/entity/drug-products/:id/detail' ,//药品详情

    wikiCfg: '/ai/v1/doctor/entity/wiki',     // wiki
    recordList: '/user/v1/inquiry-records',     // 历史问诊记录列表 （ url+ ?size={size}&start={start} ,type:GET）
    inquiryRecord: '/user/v1/inquiry-record/',  // 问诊记录详情（ url+id，type:GET）
                                                // 删除记录  （ url+id，type:DELETE）
    feedBack: '/user/v1/feedbacks',     // 反馈

    fetchType: [
        {// 自由文本
            req: 'type.googleapis.com/iyoudoctor.ai.v1.assist.FreeText',
            res: 'type.googleapis.com/iyoudoctor.ai.v1.assist.FreeText.Response',
            type: 'FreeText'
        }, {// 文本内容
            req: 'type.googleapis.com/iyoudoctor.ai.v1.assist.PlainText',
            type: 'PlainText'
        }, { // 机器人气泡显示图片
            req: 'type.googleapis.com/iyoudoctor.ai.v1.assist.Image',
            type: 'Image'
        }, {// 文字单选
            req: 'type.googleapis.com/iyoudoctor.ai.v1.assist.TextOptions',
            res: 'type.googleapis.com/iyoudoctor.ai.v1.assist.TextOptions.Response',
            type: 'TextOptions'
        }, {// 图片单选
            req: 'type.googleapis.com/iyoudoctor.ai.v1.assist.ImageOptions',
            res: 'type.googleapis.com/iyoudoctor.ai.v1.assist.ImageOptions.Response',
            type: 'ImageOptions'
        }, {// 化验选项
            req: 'type.googleapis.com/iyoudoctor.ai.v1.assist.DoctorInquiryAskLabItemOptions',
            res: 'type.googleapis.com/iyoudoctor.ai.v1.assist.DoctorInquiryAskLabItemOptions.Response',
            type: 'AskLabItemOptions'
        }, {// 询问症状（输入或进入列表选择）
            req: 'type.googleapis.com/iyoudoctor.ai.v1.assist.DoctorInquiryAskSymptoms',
            res: 'type.googleapis.com/iyoudoctor.ai.v1.assist.DoctorInquiryAskSymptoms.Response',
            type: 'AskSymptoms'
        }, {// 诊断结果
            req: 'type.googleapis.com/iyoudoctor.ai.v1.doctor.Diagnosis',
            res: 'type.googleapis.com/iyoudoctor.ai.v1.doctor.Diagnosis.Response',
            type: 'Diagnosis'
        }, {// 保存记录
            req: 'type.googleapis.com/iyoudoctor.ai.v1.assist.DoctorInquirySaveOptions',
            res: 'type.googleapis.com/iyoudoctor.ai.v1.assist.DoctorInquirySaveOptions.Response',
            type: 'SaveOptions'
        }
    ]

}
