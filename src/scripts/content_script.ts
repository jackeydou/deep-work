import { EventParams } from '../types/event';
import { getBlockUrlStorageKey } from '../utils/index';
import { EventName, StorageKey } from '../utils/constants';
import { logInDev } from '../utils/dev';


function getCurrentDomain() {
  return location.origin
}

function getExtensionFocusPage() {
  return chrome.runtime.getURL('focus.html')
}

function addListener() {
  chrome.runtime.onMessage.addListener((message: EventParams, sender) => {
    if (sender.id === chrome.runtime.id) {
      const { eventName } = message
      if (eventName === EventName.AddToBlockListKey) {
        chrome.storage.sync.get(StorageKey.BlockUrlListKey).then(result => {
          const domain = getCurrentDomain();
          const blockDomains = result[StorageKey.BlockUrlListKey] as string[] ?? [];
          const hasBeenBlocked = blockDomains.findIndex(it => it === domain) >= 0;
          logInDev('hasBeenBlocked', hasBeenBlocked)
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
