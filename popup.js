
const webId = document.getElementById("webId");

const button  = document.getElementById("btn")
const clrbtn = document.getElementById("clear")
clrbtn.addEventListener("click",()=>{
    chrome.storage.local.remove("list");
})
button.addEventListener("click", ()=>{
    let id = webId.value;
    id = id.trim()
    if(!id) return;
    console.log(webId.value);
    chrome.storage.local.get("list", (res)=>{
        let list = Array.isArray(res.list) ? res.list : [];
        list.push(id);
        chrome.storage.local.set({"list": list}, ()=>{console.log(list)})
    })
})