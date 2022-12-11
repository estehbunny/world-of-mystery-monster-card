function replaceOrAppendChildIfEmpty(parent, targetElement) {
  if (!parent.children || parent.children.length === 0) {
    parent.appendChild(targetElement)
  } else {
    parent.replaceChild(targetElement, parent.children[0])
  }
}

export default replaceOrAppendChildIfEmpty