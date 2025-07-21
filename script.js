// // chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
// //     console.log("msg recieved at scirpt")
// //     if (msg.msg === "showPopUp") {
// //     console.log("Got message from popup:", msg.msg);
// //   }
// // });

chrome.runtime.onMessage.addListener((msg, sender, res)=>{
    if(msg.status=="set"){
        setTimeout(() => {
            chrome.runtime.sendMessage({from:"script", to:"background", status:"close"})
        }, msg.time);
    }
})

let check = false
if(window.location.pathname === "/"){
    let currLink = window.location.href
    chrome.storage.local.get("list", (res)=>{
        let list = res.list || []
        for (let index = 0; index < list.length; index++) {
            let element = list[index];
            element= element.replace(/\/+$/, '').trim().toLowerCase()
            currLink = currLink.replace(/\/+$/, '').trim().toLowerCase()
            console.log(currLink, "  ", element)
            if(currLink === element){
                check = true;
                break;
            }
            
        }
        if(check){
        chrome.runtime.sendMessage({from:"script", to:"background", status:"check"})
        showPopUp()
    }
    })
}

function showPopUp(){
    const popupDiv = document.createElement("div");
    popupDiv.className = "PopUP";
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const btn3 = document.createElement("button");
    const btns  = [btn1, btn2, btn3]
    const para = document.createElement('p')
    para.innerText = "Set your timeout in minutes"
    btn1.className = "PopUP-button";
    btn2.className = "PopUP-button";
    btn3.className = "PopUP-button";
    btn1.innerText = "5";
    btn2.innerText = "10";
    btn3.innerText = "15";
    const btnContainer = document.createElement("div");
    btnContainer.className = "PopUP-buttons";
    btnContainer.appendChild(btn1);
    btnContainer.appendChild(btn2);
    btnContainer.appendChild(btn3);

    btns.forEach(element => {
        element.addEventListener("click", ()=>{
            sendMsg(element.innerText)
            popupDiv.remove()
        })
        
    });
    popupDiv.appendChild(para);
    popupDiv.appendChild(btnContainer);
    document.body.appendChild(popupDiv);
}

function sendMsg(time){
    chrome.runtime.sendMessage({from:"script", set:time, to:"background"})
}

