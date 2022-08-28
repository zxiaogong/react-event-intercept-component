
import React, { MutableRefObject } from "react"

interface EventInterceptProps {
    /**需要绑定的事件 */
    bindingEvents?: Array<[string, Function]>
    /**绑定的dom节点 */
    bindingRef?: MutableRefObject<any>
    /**拦截的dom节点 */
    ignoreRef?: Array<MutableRefObject<any>>
}

interface EventInterceptData {
    eventName: string[],
    eventFunc: Function[]

}
export default class Index extends React.Component<EventInterceptProps>{
    data: EventInterceptData = {
        eventName: [],
        eventFunc: []
    }
    constructor(props: EventInterceptProps) {
        super(props)
    }

    componentDidMount() {
        this.bindDomEvent()
    }

    /**组件卸载前 */
    componentWillUnmount() {
        const dom = this.props.bindingRef?.current
        if (dom) {
            const bindingEvents = this.props.bindingEvents || []
            const evLength = bindingEvents?.length || 0
            for (let i = 0; i < evLength; i++) {
                if (bindingEvents[i][0] && bindingEvents[i][1]) {
                    dom.removeEventListener(bindingEvents[i][0] as string, this.handleDomEvent);
                }
            }
        }
    }

    /**给dom节点绑定事件 */
    bindDomEvent = () => {
        const dom = this.props.bindingRef?.current
        if (dom) {
            const bindingEvents = this.props.bindingEvents || []
            const evLength = bindingEvents?.length || 0
            const tempEventName: string[] = []
            const tempEventFunc: Function[] = []
            for (let i = 0; i < evLength; i++) {
                if (bindingEvents[i][0] && bindingEvents[i][1]) {
                    tempEventName.push(bindingEvents[i][0] as string)
                    tempEventFunc.push(bindingEvents[i][1] as Function)
                    dom.addEventListener(bindingEvents[i][0] as string, this.handleDomEvent);
                }
            }
            if (tempEventFunc.length > 0 && tempEventName.length > 0 && tempEventName.length === tempEventFunc.length) {
                this.data = {
                    eventName: tempEventName,
                    eventFunc: tempEventFunc
                }
            }
        }
    }

    /**事件 */
    handleDomEvent = (e: any) => {
        const subscript = this.data.eventName.indexOf(e.type)
        const ignoreRef = this.props.ignoreRef
        if (subscript > -1 && ignoreRef) {
            let node = e.target;
            while (node) {
                if (ignoreRef.findIndex((item) => item.current === node) >= 0) {
                    return;
                }
                node = node.parentNode;
            }
            this.data.eventFunc[subscript](e)
            return true
        }
    }

    render(): React.ReactNode {
        return (null)
    }

}