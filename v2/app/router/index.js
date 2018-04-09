import Vue from 'vue'
import VueRouter from 'vue-router'
import Inquiry from '../components/inquiry/index.vue'
import Symptoms from '../components/symptoms/index.vue'
import Report from '../components/report/index.vue'
import Wiki from '../components/wiki/index.vue'
import ForMedication from '../components/forMedication/index.vue'
import DetailedList from '../components/detailedList/index.vue'
import ShowBigPicture from '../components/showMedicalInfo/showBigPicture.vue'
import ShowMedicalInfo from '../components/showMedicalInfo/index.vue'
import NoMedication from '../components/noMedication/index.vue'
import DiseaseSearch from '../components/diseaseSearch/index.vue'
import DiseaseList from '../components/diseaseSearch/index.vue'

Vue.use(VueRouter)
const router=new VueRouter({
    // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/inquiry'
        },
        {
            path: '/inquiry',
            components: {
                default: Inquiry
            },
            meta:{allowBack:false}
        },
        {
            path: '/diseaseList',
            components: {
                default: DiseaseList
            },
            // meta:{allowBack:false}
        },
        {
            path: '/symptoms',
            components: {
                default: Symptoms
            },
            meta:{allowBack:true}
        },
        {
            path: '/report',
            components: {
                default: Report
            },
            // meta:{allowBack:false}
        }, {
            path: '/wiki',
            components: {
                default: Wiki
            },
            // meta:{allowBack:false}
        }, {
            path: '/forMedication',
            components: {
                default: ForMedication
            },
            // meta:{allowBack:false}
        }, {
            path: '/detailedList',
            components: {
                default: DetailedList
            },
            // meta:{allowBack:false}
        }, {
            path: '/showMedicalInfo',
            components: {
                default: ShowMedicalInfo
            },
            // meta:{allowBack:false}
        }, {
            path: '/noMedication',
            components: {
                default: NoMedication
            },
            // meta:{allowBack:false}
        },
        {
            path: '/diseaseSearch',
            components: {
                default: DiseaseSearch
            },
        },
        {
            path: '/showBigPicture',
            components: {
                default: ShowBigPicture
            },
        }
    ]
});
export default router;