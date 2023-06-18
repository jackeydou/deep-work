import { EventParams } from './types/event';
import { BlockUrlListKey, AddToBlockListKey, GetCurrentContextMenuClickDomain } from './utils/constants';


async function getBlockUrlList() {
  return chrome.storage.local.get(BlockUrlListKey)
}

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
  const blockList = await getBlockUrlList();
  const domain = getCurrentDomain();
  if (blockList[domain]) {
    const focusUrl = getExtensionFocusPage();
    chrome.runtime.sendMessage<EventParams>({
      eventName: 'update_url',
      data: {
        url: focusUrl
      }
    })
  } else {
  }
}

main()
