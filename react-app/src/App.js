import React, { useEffect, useRef, useState } from "react";

function App() {
  const vueComponentRef = useRef(null);
  const [vueMessage, setVueMessage] = useState("从 React 传递的默认值");

  useEffect(() => {
    const el = vueComponentRef.current;

    // 监听 Vue3 组件的自定义事件
    const handleVueEvent = (event) => {
      console.log("从 Vue 收到的消息:", event.detail);
      setVueMessage(event.detail); // 更新 React 状态
    };

    el.addEventListener("vue-event", handleVueEvent);

    // 清理事件监听器
    return () => {
      el.removeEventListener("vue-event", handleVueEvent);
    };
  }, []);

  useEffect(() => {
    const el = vueComponentRef.current;

    // 更新 Vue3 组件的属性
    el.setAttribute("message", vueMessage);
  }, [vueMessage]);

  return (
    <div>
      <h1>React 应用</h1>
      {/* Vue 组件 */}
      <my-vue-component
        ref={vueComponentRef}
        message={vueMessage}
      ></my-vue-component>
      <button onClick={() => setVueMessage("React 更新了消息")}>
        更新消息
      </button>
    </div>
  );
}

export default App;