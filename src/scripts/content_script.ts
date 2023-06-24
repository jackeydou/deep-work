import { EventParams } from '../types/event';
import { getBlockUrlStorageKey } from '../utils/index';
import { EventName } from '../utils/constants';
import { logInDev } from '../utils/dev';


function getCurrentDomain() {
  return location.origin
}

function getExtensionFocusPage() {
  return chrome.runtime.getURL('focus.html')
}

function addListener() {
  chrome.runtime.onMessage.addListener((message: EventParams, sender) => {
    const { eventName } = message
    if (eventName === EventName.GetCurrentContextMenuClickDomain) {
      chrome.runtime.sendMessage({
        eventName: EventName.AddToBlockListKey,
        data: {
          url: getCurrentDomain()
        }
      })
    }
  })
}

async function main() {
  logInDev('content script run');
  addListener();
  const domain = getCurrentDomain();
  const storageKey = getBlockUrlStorageKey(domain);
  const blockInfo = await chrome.storage.sync.get(storageKey);
  logInDev(blockInfo);
  const isBlocked = Boolean(blockInfo[storageKey]);
  if (isBlocked) {
    const focusUrl = getExtensionFocusPage();
    chrome.runtime.sendMessage<EventParams>({
      eventName: EventName.UpdateUrl,
      data: {
        url: focusUrl
      }
    });
  } else {
  }
}

main();
