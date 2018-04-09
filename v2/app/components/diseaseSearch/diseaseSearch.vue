<!--<style src="../../css/search"></style>-->

<template>
    <div id='diseaseSearch' class="search">
        <div class="searchDiv">
            <span class="icon-search"></span>
            <input type="text" placeholder="搜索疾病..." :value="searchValue" @input="diseaseSearchChange"/>
        </div>

        <!--<div class="mask" v-if="searchList&&searchList.length>0 && searchValue !='' ">-->
            <!--<div>-->
                <!--<div class="searchLi" v-for="(item,index) in searchList" :key="index"-->
                     <!--@click="clickSearchList(item)">-->
                    <!--{{item.name}}-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="mask" v-else-if="searchList&&searchList.length==0 && searchValue != ''"-->
             <!--@click="clickSearchMask">-->
            <!--<div style="line-height:3rem;text-align:center;color:#999;">-->
                <!--没有找到您搜索的疾病-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
    import '../../css/search.css'
    import {mapState} from 'vuex'
    import $ from 'jquery'

    export default {
        name: 'DiseaseSearch',
        methods: {
            diseaseSearchChange(e) {
                let self = this;
                if (!e.target.value || e.target.value == '') {
                    self.$store.dispatch('toSetDiseaseSearchResult',false);
                    return;
                }
                self.$store.dispatch('toSetDiseaseSearchResult',true);
                self.searchText=e.target.value;
                this.$store.dispatch('fetchDisease',
                    {
                        text: e.target.value,
                        types: 'EntityTypeDisease',
                        cb: function () {
//                            self.$router.push({path: '/diseaseSearch'});
                        }
                    })
            },
        },
        computed: {
            ...mapState(['showSearchResult']),
//            searchList() {
//                return this.$store.state.symptoms.searchList
//            },
            searchValue() {
                return this.$store.state.searchValue;
            }
        }
    }
</script>
