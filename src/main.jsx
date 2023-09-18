import ReactDOM from '../packages/react-dom'
import './style.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

const vNode = (<div key={'root'}>
  My&nbsp;
  <span className='blue'>Poor</span>&nbsp;
  <span className='blod' style={{ color: 'hotpink' }}>React</span>
</div>)

root.render(vNode)
