
const coolDown = 15
chrome.runtime.onMessage.addListener((msg, sender,res)=>{
  if(msg.to == "background" && msg.from=="script" && msg.set){
    console.log("got message", msg.set);
    chrome.tabs.sendMessage(sender.tab.id, {status: "set",tabId:sender.tab.id, time:msg.set*60000});
  }
})
chrome.runtime.onMessage.addListener((msg, sender, res)=>{
  if(msg.status == "close"){
    if(sender.tab.id){
      chrome.tabs.remove(sender.tab.id)
    }
    let now = new Date;
    now = now.valueOf()
    let coolDownTime = now + (coolDown*60000);
    chrome.storage.local.set({"coolDownTime": coolDownTime}); 
  }
})

chrome.runtime.onMessage.addListener((msg, sender, res)=>{
  if(msg.status == "check"){
    chrome.storage.local.get("coolDownTime",(res)=>{
      const coolDownTime = res.coolDownTime
      let now = new Date;
      now = now.valueOf()
      if(coolDownTime>now){
        console.log(coolDownTime, "   ", now)
        chrome.tabs.remove(sender.tab.id);
      }
      return 1;
    })
  }
})




















// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Background installed niga");
// });

// class Tab {
//   constructor(id, time) {
//     this.id = id;
//     this.time = time * 60000;
//   }

//   close() {
//     chrome.tabs.remove(this.id);
//   }
// }

// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   const tabId = sender?.tab?.id;
//   if (!tabId) return;

//   if (msg.msg === "check") {
//     chrome.storage.local.get("cooldownEnd", (res) => {
//       const cooldownEnd = res.cooldownEnd || 0;
//       const now = Date.now();

//       if (now < cooldownEnd) {
//         chrome.tabs.remove(tabId);
//         sendResponse({ ok: false, cooldown: true });
//         return;
//       }

//       sendResponse({ ok: true });
//     });

//     return true;
//   }

//   if (msg.from === "script" && msg.to === "background" && msg.mins) {
//     chrome.storage.local.get("cooldownEnd", (res) => {
//       const cooldownEnd = res.cooldownEnd || 0;
//       const now = Date.now();

//       if (now < cooldownEnd) {
//         chrome.tabs.remove(tabId);
//         sendResponse({ ok: false, cooldown: true });
//         return;
//       }

//       const tab = new Tab(tabId, msg.mins);
//       chrome.storage.local.set({
//         cooldownEnd: Date.now() + 150000,
//         timeLimit: tab.time
//       });

//       setTimeout(() => {
//         chrome.tabs.remove(tab.id);
//       }, tab.time);

//       sendResponse({ ok: true });
//     });

//     return true;
//   }
// });
