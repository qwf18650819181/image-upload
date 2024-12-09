import React, { createContext, useContext, useState } from 'react';

// 创建上下文
const UserSubscriptionContext = createContext();

// 提供者组件
export function UserSubscriptionProvider({ children }) {
  const [isSubscribed, setIsSubscribed] = useState(false); // 假设默认用户未订阅

  const subscribe = () => setIsSubscribed(true); // 模拟订阅操作
  const unsubscribe = () => setIsSubscribed(false); // 模拟取消订阅操作

  return (
    <UserSubscriptionContext.Provider value={{ isSubscribed, subscribe, unsubscribe }}>
      {children}
    </UserSubscriptionContext.Provider>
  );
}

// 自定义 Hook，用于在组件中访问订阅状态
export function useSubscription() {
  return useContext(UserSubscriptionContext);
}
