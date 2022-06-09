import { createApp } from 'vue'
import App from './App.vue'
import List from './components/List.vue'
import Nav from './components/Nav.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { parse } from './parseRouter'
import * as constant from "./constant";
import 'axios'
import axios from 'axios'

function getRoute(datas) {
    let routes = parse(datas);
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
axios.get(constant.ROUTE_DATA_URL)
    .then(res => {
        return res.data
    })
    .then(data =>{
        mountApp(getRouter(getRoute(data)))
    })
    .catch(() => {
        mountApp(getRouter(getErrRoute()))
    })
