import Vue from 'vue'
import VueRouter from "vue-router";
import Inquiry from "../components/inquiry/index.vue";
import Symptoms from "../components/symptoms/index.vue";
import Report from '../components/report/index.vue';
import Wiki from '../components/wiki/index.vue';

Vue.use(VueRouter);
export default new VueRouter({
    // mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/inquiry'
        },{
            path: '/inquiry',
            components:  {
                default:Inquiry
            }

        },{
            path: '/symptoms',
            components: {
                default:Symptoms
            }
        },{
            path: '/report',
            components: {
                default:Report
            }
        },{
            path: '/wiki',
            components: {
                default:Wiki
            }
        }
    ]
})

