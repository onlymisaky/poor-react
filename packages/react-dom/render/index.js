/**
 * 
 * @param {HTMLElement} dom 
 * @param {object} attrs 
 * @returns 
 */
const setAttribute = (dom, attrs) => {
  Object.keys(attrs).forEach((key) => {
    const val = attrs[key]
    if (typeof val === 'symbol') return

    if (key === 'className') {
      dom.className = val || ''
      return
    }

    if (key === 'style') {
      if (!val) {
        dom.style.cssText = ''
      }
      if (typeof val === 'object') {
        Object.keys(val).forEach((name) => {
          dom.style[name] = val[name]
        })
        return
      }
      dom.style.cssText = val
      return
    }

    if (/on\w+/.test(key)) {
      dom[key.toLowerCase()] = val
      return
    }

    if (key in dom) {
      dom[key] = val
    }
    if (val) {
      dom.setAttribute(key, val)
    } else {
      dom.removeAttribute(key)
    }
  })
}

/**
 * 
 * @param {import('react').ReactNode} vNode 
 * @returns 
 */
const createDom = (vNode) => {
  if (typeof vNode === 'number' || typeof vNode === 'string') {
    return document.createTextNode(vNode + '')
  }

  if (typeof vNode === 'object' && vNode !== null) {
    const { type, props } = vNode
    const { children, ...otherProps } = props

    if (typeof type === 'function') {
      return document.createDocumentFragment()
    }

    const dom = document.createElement(type)
    setAttribute(dom, otherProps)

    if (Array.isArray(children)) {
      children.forEach((child) => dom.appendChild(render(child)))
    } else {
      dom.appendChild(render(children))
    }

    return dom
  }

  return document.createDocumentFragment()
}

/**
 * 
 * @param {import('react').ReactNode} vNode  
 * @param {Element|Document} container 
 * @returns 
 */
const render = (vNode, container) => {
  const dom = createDom(vNode)
  if (container) {
    if (container.lastChild) {
      container.replaceChild(dom, container.lastChild)
    } else {
      container.appendChild(dom)
    }
  }
  return dom
}

export default render
