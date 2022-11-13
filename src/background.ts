let active = false;
let a = true

function makeOrange(): void {
  function replaceText(node: ChildNode | null, text: string, replacementNodeTemplate: HTMLElement) {
    if (node?.nodeName == "#text") {
        while (node) {
            var textIndex: any = node?.data.indexOf(text), currentNode = node;
            if (node?.nodeName != "#text") {
              node = null;
            }
            if (textIndex != -1) {
              // Split the text node after the text
              var splitIndex = textIndex + text.length;
              var replacementNode = replacementNodeTemplate.cloneNode(true);
              if (splitIndex < node?.length) {
                  node = node?.splitText(textIndex + text.length);
                  if (node?.parentNode) {
                    node?.parentNode.insertBefore(replacementNode, node);
                  }
              } else {
                if (node?.parentNode) {
                  node?.parentNode.appendChild(replacementNode);
                  node = null;
                }
              }
              currentNode.deleteData(textIndex, text.length);
            } else {
                node = null
            }
        }
    } else {
        var child = node?.firstChild, nextChild;
        while (child) {
            nextChild = child.nextSibling;
            replaceText(child, text, replacementNodeTemplate);
            child = nextChild;
        }
    }
  }

  const replacer = document.createElement('span')
  replacer.setAttribute('class', 'glossary-item')
  replacer.style.position = 'relative'
  replacer.innerHTML = "important"
  replacer.onclick = () => {
    console.log('hee')
  }
  const highlight = document.createElement('div')
  highlight.style.position = 'absolute'
  highlight.style.bottom = '-2px'
  highlight.style.left = '0'
  highlight.style.right = '0'
  highlight.style.height = '3px'
  highlight.style.backgroundColor = 'red'
  replacer.appendChild(highlight)
  
  
  const tooltip = document.createElement('div')
  tooltip.setAttribute('class', 'glossary-tooltip')
  tooltip.style.position = 'absolute'
  tooltip.style.fontSize = '.65rem'
  tooltip.style.width = '300px'
  tooltip.style.maxHeight = '120px'
  tooltip.style.bottom = '25px'
  tooltip.style.left = '-20px'
  tooltip.style.backgroundColor = 'white'
  tooltip.style.padding = '1.25em'
  tooltip.style.zIndex = '1000000'
  tooltip.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset'
  tooltip.innerHTML = `important: si penting
<br />
penting tidaknya bergantung pada persepsi
`
  replacer.appendChild(tooltip)

  replaceText(document.body, 'important', replacer)
}

function addStyle () {
  const head = document.querySelector('head')
  const styleDom = document.createElement('style')

  const style = `
    .glossary-tooltip {
      transition: all 0.3s ease;
      opacity: 0;
      visibility: hidden;
    }

    .glossary-item:hover .glossary-tooltip {
      visibility: visible;
      opacity: 1;
      border-radius: 8px;
    }
  `

  styleDom.innerHTML = style
  head?.appendChild(styleDom)
}

chrome.action.onClicked.addListener((tab) => {
  active = !active;

  chrome.scripting.executeScript({
    target: {
      tabId: tab.id ? tab.id : -1
    },
    func: addStyle,
    args: []
  }).then();

  chrome.scripting.executeScript({
      target: {
        tabId: tab.id ? tab.id : -1
      },
      func: makeOrange,
      args: []
  }).then();
});
