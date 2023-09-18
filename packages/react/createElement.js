const REACT_ELEMENT = Symbol('react.element')

const createElement = (type, config, maybeKey) => {

  let key = null
  let ref = null
  const props = {}

  if (maybeKey !== undefined) {
    key = maybeKey + ''
  }

  if (config.key !== undefined) {
    key = config.key + ''
  }

  if (config.ref !== undefined) {
    ref = config.ref
  }

  Object.keys(config).forEach((propName) => {
    if (['key', 'ref', '__self', '__source'].includes(propName)) {
      return
    }
    props[propName] = config[propName]
  })

  if (type && typeof type.defaultProps === 'object') {
    for (const propName in type.defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = type.defaultProps[propName]
      }
    }
  }

  const vNode = {
    $$typeof: REACT_ELEMENT,
    type,
    key,
    ref,
    props,
    _owner: null,
  }

  return vNode
}

export default createElement
