<!--<style src="../../css/search"></style>-->

<template>
    <div id='search'>
        <div class="search">
            <span class="icon-search"></span>
            <input type="text" placeholder="请输入症状..." :value="searchValue" @input="searchChange" />
        </div>

        <div class="mask" v-if="searchList.length>0 && searchValue !='' ">
            <div>
                <div class="searchLi" v-for="(item,index) in searchList" :key="index" @click="clickSearchList(item)">
                    {{item.name}}
                </div>
            </div>
        </div>
        <div class="mask" v-else-if="searchList.length==0 && searchValue != ''" @click="clickSearchMask">
            <div style="line-height:3rem;text-align:center;color:#999;">
                没有找到您要的症状
            </div>
        </div>
    </div>
</template>

<script>
    import '../../css/search.css';

    export default {
        name: 'Search',
        methods:{
            searchChange(e){
                this.$store.dispatch('fetchPageData',{text:e.target.value,type:'search'});
            },
            clickSearchList(json){
                let obj={
                    id:json.id,
                    text:json.name
                };
                this.$store.dispatch('clickSearchList',obj);
            },
            clickSearchMask(){
                this.$store.dispatch('searchMaskHide');
            }
        },
        computed:{
            searchList(){
                return this.$store.state.symptoms.searchList;
            },
            searchValue(){
                return this.$store.state.symptoms.searchValue;
            }
        }
    }
</script>