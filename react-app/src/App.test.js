import App from './App';
import { render, screen } from '@testing-library/react';
import { waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders my-vue-component with correct message', () => {
  const { container } = render(<App />);
  const vueComponent = container.querySelector('my-vue-component');
  expect(vueComponent).toHaveAttribute('message', '从 React 传递的默认值');
});

test('updates message when button is clicked', () => {
  const { container } = render(<App />);

  // 获取按钮
  const button = screen.getByRole('button', { name: /更新消息/i });

  // 模拟点击按钮
  userEvent.click(button);

  // 验证 Vue 组件的属性是否更新
  const vueComponent = container.querySelector('my-vue-component');
  expect(vueComponent).toHaveAttribute('message', 'React 更新了消息');
});

test('handles button click inside my-vue-component', async () => {
  const { container } = render(<App />);

  // 获取 Vue 组件
  const vueComponent = container.querySelector('my-vue-component');

  // 创建并触发自定义事件
  act(() => {
    const customEvent = new CustomEvent('vue-event', { detail: '从 Vue 组件发送的消息' });
    vueComponent.dispatchEvent(customEvent);
  }
  );

  // 等待 React 状态更新
  await waitFor(() => {
    const updatedVueComponent = container.querySelector('my-vue-component');
    expect(updatedVueComponent).toHaveAttribute('message', '从 Vue 组件发送的消息');
  });
});