import { EventParams, UpdateUrlData } from "../types/event";
import { getBlockUrlStorageKey } from '../utils/index';
import { AddToBlockListKey, GetCurrentContextMenuClickDomain, EventName, StorageKey } from '../utils/constants';

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

chrome.runtime.onMessage.addListener((message: EventParams, sender) => {
  if (sender.id === chrome.runtime.id) {
    const { eventName, data } = message;
    if (eventName === EventName.UpdateUrl) {
      chrome.tabs.update({
        url: (data as UpdateUrlData).url
      })
    } else if (eventName === AddToBlockListKey) {
      chrome.storage.sync.get(StorageKey.BlockUrlListKey).then(res => {
        const domain = (data as UpdateUrlData).url;
        if (!res[domain]) {
          chrome.storage.sync.set({
            [StorageKey.BlockUrlListKey]: {
              ...res,
              [domain]: true
            }
          })
        }
      })
    }
  }
})