import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    setTimeout(() => {
      const el = document.querySelector("my-vue-component");
      el.setAttribute("message", "Hello from React to Vue!");
    }, 1000);
  }, []);

  return (
    <div>
      <h1>React 应用</h1>
      {/* Vue 组件 */}
      <my-vue-component message="从 React 传递的默认值"></my-vue-component>
    </div>
  );
}

export default App;