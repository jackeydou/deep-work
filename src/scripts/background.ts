import { EventParams, UpdateUrlData } from "../types/event";
import { getBlockUrlStorageKey } from '../utils/index';
import { EventName, StorageKey } from '../utils/constants';
import { logInDev } from "../utils/dev";


function setContextMenu() {
  chrome.contextMenus.create({
    title: "Add to Block List",
    id: EventName.AddToBlockListKey,
  })
  chrome.contextMenus.create({
    title: "Add to White List",
    id: EventName.AddToWhiteListKey,
  });
}

function addListener() {
  chrome.contextMenus.onClicked.addListener(async function(clickData) {
    if (clickData.menuItemId == EventName.AddToBlockListKey) {
      const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
      if (tab?.id) {
        const response = await chrome.tabs.sendMessage<EventParams>(tab.id, {
          eventName: EventName.AddToBlockListKey,
          data: {
          }
        });
        logInDev('contextMenus.onClicked', response);
      }

    } else if (clickData.menuItemId === EventName.AddToWhiteListKey) {

    }
  });

  chrome.runtime.onMessage.addListener((message: EventParams, sender) => {
    if (sender.id === chrome.runtime.id) {
      const { eventName, data } = message;
      if (eventName === EventName.UpdateUrl) {
        chrome.tabs.update({
          url: (data as UpdateUrlData).url
        })
      }
    }
  })
}


function main() {
  setContextMenu();
  addListener();
}

main();
