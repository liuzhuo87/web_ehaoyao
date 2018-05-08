export function handleSymptomListFetch(data) {
    let list = {}, 
        sort = ['常见症状','头部','咽喉和颈部','四肢症状','胸部','腹部','腰背部','泌尿生殖','臀部及肛门','皮肤','全身症状'],
        arr=[];
    data.items.map(function (val, idx) {
        let json = {};
        json.id = val.id;
        json.text = val.name;
        json.attrs = {
            time: {
                values: []
            }
        }
        json.choice = false;
        
        if (val.common && val.common.common){
            json.weight=val.common.weight || 0;
            arr.push(json);
        }

        if (list[val.category]) {
            list[val.category].push(json);
        } else {
            list[val.category] = [];
            list[val.category].push(json);
        }
    })
    list['常见症状']=arr.sort(function(a,b){
        return b.weight-a.weight
    })

    // for(let item in list){
    //     sort.push(item)
    // }
    
    return { list,sort};
}

export function handleWiki(data) {
    let json={
        id:data.id,
        name:data.name,
        items:[]
    }
    // { title: '典型症状', describe: '由于感染或非感染因素引起的气管、支气管黏膜炎性变化黏液分泌增多。', show: false },
    data.chapters && data.chapters.length > 0 && data.chapters.map((val, idx) => {
        json.items.push({
            title: val.title,
            describe: val.text,
            show: idx == 0 ? true : false
        })
    })

    return {json}
}