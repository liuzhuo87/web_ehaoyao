<!--<style src="../../css/search"></style>-->

<template>
    <div  id='search' class="search">
        <div class="searchDiv">
            <span class="icon-search"></span>
            <input type="text" placeholder="请输入症状..." :value="symptomsSearchValue" @input="searchChange"/>
        </div>
        <!--<div class="mask" v-if="searchList&&searchList.length>0 && searchValue !='' ">-->
            <!--<div>-->
                <!--<div class="searchLi" v-for="(item,index) in searchList" :key="index">-->
                    <!--{{item.name}}-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="mask" v-else-if="searchList&&searchList.length==0 && searchValue != ''" @click="clickSearchMask">-->
            <!--<div style="line-height:3rem;text-align:center;color:#999;">-->
                <!--没有找到您要的症状-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import '../../css/search.css';

    export default {
        name: 'Search',
        data(){
          return{
          }
        },
        methods:{
            searchChange(e){
                let self = this;
                if (!e.target.value || e.target.value == '') {
                    this.$store.dispatch('symptomsSearchNull');
                    self.$store.dispatch('toSetSearchResult',false);
                    return;
                }
                self.$store.dispatch('toSetSearchResult',true);
                this.$store.dispatch('symptomsSearch',{
                    text:e.target.value
                });

            },
//            clickSearchListFunc(json){
//                console.log('json',json);
//                let obj={
//                    id:json.id,
//                    text:json.name
//                };
//                this.$store.dispatch('clickSearchList',obj);
//            },
//            clickSearchMask(){
//                this.$store.dispatch('searchMaskHide');
//            }
        },
        computed:{
//            searchList(){
//                return this.$store.state.symptoms.searchList;
//            },
            symptomsSearchValue(){
                return this.$store.state.symptoms.symptomsSearchValue;
            }
        }
    }
</script>