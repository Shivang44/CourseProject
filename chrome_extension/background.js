let color = '#3aa757';
/*

Annotation Model

- id : Integer
- content : String
- line_number: Integer

*/


chrome.runtime.onInstalled.addListener(() => {
  console.log('Default background color set to %cgreen', `color: ${color}`);
  const mockAnnotations = [
    {
      id: 1,
      content: 'This is an annotation',
      line_number: 5
    },
    {
      id: 2,
      content: 'This is another annotation',
      line_number: 48
    }
  ];
  chrome.storage.sync.set({'https://github.com/Shivang44/MOBILE_MMO/blob/main/Assets/Scripts/Authenticate.cs': mockAnnotations});
});


chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  console.log(change);
  console.log(tab);
  if (change.status == 'complete') {
    const url = tab.url;
    fetchAnnotations(url);
  }
});


const fetchAnnotations = (url) => {
  return chrome.storage.sync.get([url], (result) => {
    const annotations = result[url];
    console.log('Retrieved annotations for url ' + url, annotations);
    displayAnnotations(annotations);
  });
};

const displayAnnotations = (annotations) => {
  console.log('Rendering annotations', annotations);

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {annotations: annotations}, function(response) {
      console.log('in background', response);
    });
  });
};