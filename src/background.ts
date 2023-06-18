import { EventParams, UpdateUrlData } from "./types/event";
import { AddToBlockListKey, GetCurrentContextMenuClickDomain, BlockUrlListKey } from './utils/constants';

function setContextMenu() {
  chrome.contextMenus.create({
    title: "[Deep Work]Add to block list",       
    // contexts: ["tab"],
    id: AddToBlockListKey,
  })
}

function addListener() {
  chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == AddToBlockListKey) {
      chrome.runtime.sendMessage<EventParams>({
        eventName: GetCurrentContextMenuClickDomain,
        data: {
        }
      })
    }
  })
}

setContextMenu();
addListener();

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  console.log('>>>>> query', tabs)
})

chrome.runtime.onMessage.addListener((message: EventParams, sender) => {
  if (sender.id === chrome.runtime.id) {
    const { eventName, data } = message;
    if (eventName === 'update_url') {
      chrome.tabs.update({
        url: (data as UpdateUrlData).url
      })
    } else if (eventName === AddToBlockListKey) {
      chrome.storage.local.get(BlockUrlListKey).then(res => {
        const domain = (data as UpdateUrlData).url;
        if (!res[domain]) {
          chrome.storage.local.set({
            [BlockUrlListKey]: {
              ...res,
              [domain]: true
            }
          })
        }
      })
    }
  }
})