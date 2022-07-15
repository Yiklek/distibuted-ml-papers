import { createApp } from 'vue'
import App from './App.vue'
import List from './components/List.vue'
import Nav from './components/Nav.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { parse } from './parseRouter'
import * as constant from "./constant";
import 'axios'
import axios from 'axios'

function getRoute(datas, sharedData = {}) {
    let routes = parse(datas, sharedData);
    let navigateData: { path: string; display: string }[] = [] 
    routes.forEach(i => {
        i.component = List
        navigateData.push({path: i.path, display: decodeURI(i.path)})
    })
    routes.push({path:"/", component: Nav, props:()=>({datas: navigateData})})
    return routes
}
function getRouter(routes) {
    const router = createRouter({
        // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
        history: createWebHashHistory(),
        routes, // short for `routes: routes`
    })
    return router
}
function getErrRoute() {
    return [{
        path: "/", component: Nav
    }]

}
function mountApp(router) {
    const app = createApp(App)
    app.use(router)
    app.mount('#app')
}
Promise.all([axios.get(constant.ROUTE_DATA_URL),
            axios.get(constant.SHARED_DATA_URL)])
    .then(responses => {
        let r = []
        for (let i of responses){
            r.push(i.data)
        }
        return r
    })
    .then(data =>{
        mountApp(getRouter(getRoute(data[0], data[1])))
    })
    .catch(() => {
        mountApp(getRouter(getErrRoute()))
    })
