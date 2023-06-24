import { EventParams, UpdateUrlData } from "../types/event";
import { getBlockUrlStorageKey } from '../utils/index';
import { EventName, StorageKey } from '../utils/constants';

function setContextMenu() {
  chrome.contextMenus.create({
    title: "Add to Block List",
    id: EventName.AddToBlockListKey,
  })
  chrome.contextMenus.create({
    title: "Add to White List",
    id: EventName.AddToWhiteListKey,
  })
}

function addListener() {
  chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == EventName.AddToBlockListKey) {
      chrome.runtime.sendMessage<EventParams>({
        eventName: EventName.GetCurrentContextMenuClickDomain,
        data: {
        }
      })
    }
  });
  chrome.runtime.onMessage.addListener((message: EventParams, sender) => {
    if (sender.id === chrome.runtime.id) {
      const { eventName, data } = message;
      if (eventName === EventName.UpdateUrl) {
        chrome.tabs.update({
          url: (data as UpdateUrlData).url
        })
      } else if (eventName === EventName.AddToBlockListKey) {
        chrome.storage.sync.get(StorageKey.BlockUrlListKey).then(result => {
          const domain = (data as UpdateUrlData).url;
          const blockDomains = result[StorageKey.BlockUrlListKey] as string[] ?? [];
          const hasBeenBlocked = blockDomains.findIndex(it => it === domain);
          if (!hasBeenBlocked) {
            chrome.storage.sync.set({
              [StorageKey.BlockUrlListKey]: [
                ...blockDomains,
                domain,
              ],
              [getBlockUrlStorageKey(domain)]: true
            });
          }
        })
      }
    }
  })
}

setContextMenu();
addListener();