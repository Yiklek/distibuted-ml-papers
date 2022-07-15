export function parse(routeData, sharedData = {},currentPath = "") {
    let res = []
    if(routeData["data"] != undefined){
        res.push({path: currentPath == "" ? "/" : currentPath, props:()=>({datas:routeData["data"], shared: sharedData})})
    }
    if(routeData["dir"] == undefined){
        return res
    } else {
        Object.keys(routeData["dir"]).forEach(dir => {
            parse(routeData["dir"][dir], sharedData, [currentPath, encodeURI(dir)].join("/")).forEach((p) => res.push(p))
        });
    } 
    return res
}

