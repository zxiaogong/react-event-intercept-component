import { useRef } from 'react'
// import EventIntercept from './components/export'
import EventIntercept from '../public/type/event-intercept.es'
import './App.less'

function App() {
  const box1Ref = useRef(null)
  const box2Ref = useRef(null)
  const testClick = (e: any) => {
    alert("触发点击事件")
  }
  return (
    <div className="root">
      <div className="box1" ref={box1Ref}>
        会触发点击事件的区域
        <div className="box2" ref={box2Ref}>
          不会触发的区域
          <div></div>
        </div>
        <div className="box3">
          会触发点击事件的区域
        </div>
      </div>
      <EventIntercept bindingEvents={[['click', testClick]]} bindingRef={box1Ref} ignoreRef={[box2Ref]}></EventIntercept>
    </div>
  )
}

export default App
