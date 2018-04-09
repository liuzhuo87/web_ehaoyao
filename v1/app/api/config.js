module.exports = {

    cfg: "https://api.rxthinking.com",
    // cfg: window.location.protocol + "//" + window.location.host + "/_",

    inquiryCfg: "/ai/v1/doctor/inquiry",  //追问
    symptomListCfg: '/ai/v1/entity/search/symptom',    //症状查询
    symptomCategoryCfg: '/ai/v1/entity/search/symptom/category',    //症状分类查询
    wikiCfg: '/ai/v1/entity/view/wiki',

    inquiryRecord:'/user/v1/inquiry-record/',    //问诊记录详情（ url+id，type:GET）
                                                 //删除记录  （ url+id，type:DELETE）
    recordList: '/user/v1/inquiry-records',   //问诊记录列表 （ url+ ?size={size}&start={start} ,type:GET）
    saveRecord:'/ai/v1/doctor/inquiry/save',   //保存问诊记录

    feedBack:'/user/v1/feedbacks',


    // statisticCfgDev: 'https://api-dev.rxthinking.com',
    statisticUrl:'/stats/v1/icon.png'

}