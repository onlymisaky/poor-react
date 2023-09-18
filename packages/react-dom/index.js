import render from './render'

const ReactDom = {
  /**
   * 
   * @param {Element|Document} container 
   * @returns 
   */
  createRoot(container) {
    return {
      render(children) {
        render(children, container)
      }
    }
  }
}

export default ReactDom
