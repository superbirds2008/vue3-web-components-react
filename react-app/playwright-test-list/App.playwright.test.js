const { test, expect } = require('@playwright/test');

test.describe('App Component', () => {
  test('renders my-vue-component with correct message', async ({ page }) => {
    // 启动应用
    await page.goto('http://localhost:3000');

    // 获取 Vue 组件
    const vueComponent = await page.locator('my-vue-component');

    // 验证初始属性
    await expect(vueComponent).toHaveAttribute('message', '从 React 传递的默认值');
  });

  test('updates message when React button is clicked', async ({ page }) => {
    // 启动应用
    await page.goto('http://localhost:3000');

    // 点击按钮
    await page.click('button:has-text("更新消息")');

    // 验证 Vue 组件的属性是否更新
    const vueComponent = await page.locator('my-vue-component');
    await expect(vueComponent).toHaveAttribute('message', 'React 更新了消息');
  });

  test('handles button click inside my-vue-component', async ({ page }) => {
    // 启动应用
    await page.goto('http://localhost:3000');

    // 获取 Vue 组件
    const vueComponent = await page.locator('my-vue-component');

    // 触发自定义事件
    await page.evaluate((vueComponent) => {
      const customEvent = new CustomEvent('vue-event', { detail: '从 Vue 组件发送的消息' });
      vueComponent.dispatchEvent(customEvent);
    }, await vueComponent.elementHandle());

    // 验证 Vue 组件的属性是否更新
    await expect(vueComponent).toHaveAttribute('message', '从 Vue 组件发送的消息');
  });
});