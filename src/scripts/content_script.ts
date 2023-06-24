import { EventParams } from '../types/event';
import { getBlockUrlStorageKey } from '../utils/index';
import { AddToBlockListKey, GetCurrentContextMenuClickDomain, EventName } from '../utils/constants';


function getCurrentDomain() {
  return location.origin
}

function getExtensionFocusPage() {
  return chrome.runtime.getURL('focus.html')
}

function addListener() {
  chrome.runtime.onMessage.addListener((message: EventParams, sender) => {
    const { eventName } = message
    if (eventName === GetCurrentContextMenuClickDomain) {
      chrome.runtime.sendMessage({
        eventName: AddToBlockListKey,
        data: {
          url: getCurrentDomain()
        }
      })
    }
  })
}

async function main() {
  addListener();
  const domain = getCurrentDomain();
  const storageKey = getBlockUrlStorageKey(domain);
  const blockInfo = await chrome.storage.sync.get(storageKey);
  const isBlocked = Boolean(blockInfo[storageKey]);
  if (isBlocked) {
    const focusUrl = getExtensionFocusPage();
    chrome.runtime.sendMessage<EventParams>({
      eventName: EventName.UpdateUrl,
      data: {
        url: focusUrl
      }
    })
  } else {
    // const focusUrl = getExtensionFocusPage();
    // chrome.runtime.sendMessage<EventParams>({
    //   eventName: EventName.UpdateUrl,
    //   data: {
    //     url: focusUrl
    //   }
    // })
  }
}

main()
