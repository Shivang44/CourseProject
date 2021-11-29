
// For each annotation passed from the background script, render it.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("In content-script:", request);

        if (request.annotations) {
            request.annotations.forEach((annotation) => {
                const para = document.createElement("p");
                const paraNode = document.createTextNode(annotation.content);
                para.style = "background-color:#FFFFCC;color:black;padding:25px;";
                para.appendChild(paraNode);
                para.dataset.lineNumber = annotation.line_number;
                para.addEventListener('click', e => {
                    // Unrender item
                    e.target.style = "display: none";

                    // Delete from storage
                    sendResponse({annotation_id_to_delete: e.target.dataset.lineNumber});
                });
                
                const node = document.getElementById("L" + annotation.line_number);
                if (node) {
                    node.appendChild(para);
                }
            });
        }
    }
  );
  
