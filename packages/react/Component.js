export default class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }

  setState(partialState, callback) {
    if (typeof partialState !== 'object' && typeof partialState !== 'function' && partialState !== null) {
      throw new Error('setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.')
    }

    let newState = {}
    if (typeof partialState === 'function') {
      newState = partialState(this.state, this.props)
    } else {
      newState = partialState
    }
    Object.assign(this.state, newState)
    // updateComponent(this)
    if (typeof callback === 'function') {
      callback()
    }
  }
}

Component.props.isReactComponent = {}
