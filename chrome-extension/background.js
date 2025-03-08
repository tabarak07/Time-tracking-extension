let activeTabId = null;
let startTime = null;
const productiveDomains = ["github.com", "stackoverflow.com", "leetcode.com"];
const unproductiveDomains = ["facebook.com", "twitter.com", "instagram.com"];

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const now = Date.now();
  if (activeTabId && startTime) {
    const duration = now - startTime;
    const tab = await chrome.tabs.get(activeTabId);
    const hostname = new URL(tab.url).hostname;
    const isProductive = productiveDomains.includes(hostname);
    const isUnproductive = unproductiveDomains.includes(hostname);

    chrome.storage.local.get(["timeLogs"], (result) => {
      const logs = result.timeLogs || {};
      logs[hostname] = (logs[hostname] || 0) + duration / 1000;
      logs[hostname + "_type"] = isProductive ? "productive" : isUnproductive ? "unproductive" : "neutral";
      chrome.storage.local.set({ timeLogs: logs });
    });
  }
  activeTabId = activeInfo.tabId;
  startTime = now;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTimeLogs") {
    chrome.storage.local.get(["timeLogs"], (result) => {
      sendResponse(result.timeLogs || {});
    });
    return true; // Indicates async response
  }
});