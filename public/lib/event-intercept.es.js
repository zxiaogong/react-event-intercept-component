var p = Object.defineProperty;
var a = (d, o, t) => o in d ? p(d, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : d[o] = t;
var c = (d, o, t) => (a(d, typeof o != "symbol" ? o + "" : o, t), t);
import m from "react";
class v extends m.Component {
  constructor(t) {
    super(t);
    c(this, "data", {
      eventName: [],
      eventFunc: []
    });
    c(this, "bindDomEvent", () => {
      var s;
      const t = (s = this.props.bindingRef) == null ? void 0 : s.current;
      if (t) {
        const e = this.props.bindingEvents || [], i = (e == null ? void 0 : e.length) || 0, n = [], h = [];
        for (let r = 0; r < i; r++)
          e[r][0] && e[r][1] && (n.push(e[r][0]), h.push(e[r][1]), t.addEventListener(e[r][0], this.handleDomEvent));
        h.length > 0 && n.length > 0 && n.length === h.length && (this.data = {
          eventName: n,
          eventFunc: h
        });
      }
    });
    c(this, "handleDomEvent", (t) => {
      const s = this.data.eventName.indexOf(t.type), e = this.props.ignoreRef;
      if (s > -1 && e) {
        let i = t.target;
        for (; i; ) {
          if (e.findIndex((n) => n.current === i) >= 0)
            return;
          i = i.parentNode;
        }
        return this.data.eventFunc[s](t), !0;
      }
    });
  }
  componentDidMount() {
    this.bindDomEvent();
  }
  componentWillUnmount() {
    var s;
    const t = (s = this.props.bindingRef) == null ? void 0 : s.current;
    if (t) {
      const e = this.props.bindingEvents || [], i = (e == null ? void 0 : e.length) || 0;
      for (let n = 0; n < i; n++)
        e[n][0] && e[n][1] && t.removeEventListener(e[n][0], this.handleDomEvent);
    }
  }
  render() {
    return null;
  }
}
export {
  v as default
};
