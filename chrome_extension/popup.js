let createButton = document.getElementById("create-annotation");


// When the button is clicked, create an annotation
createButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const annotationContent = document.getElementById("annotation-content").value;
  const annotationLineNumber = document.getElementById("line-number").value;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createAnnotation,
    args: [tab.url, annotationContent, annotationLineNumber]
  });
});

// The body of this function will be execuetd as a content script inside the
function createAnnotation(url, content, line_number) {
  chrome.storage.sync.get(url, annotations => {
    const currentAnnotations = annotations[url] || [];
    currentAnnotations.push({
      content,
      line_number
    });
    chrome.storage.sync.set({[url]: currentAnnotations});
    location.reload();
  });
}
