export const useAppStore = defineStore('app', () => {
  /**
   * signOut 退出登录
   * OIDC 模式下会重定向到认证中心登出端点，
   * 传统模式下跳转到登录页。
   */
  const signOut = () => {
    return new Promise<void>((resolve) => {
      const userStore = useUserStore();
      userStore.$reset();
      const tokenStore = useTokenStore();
      tokenStore.$reset();
      if (isOidcEnabled()) {
        oidcLogout().catch(console.error);
      } else {
        router.push('/login');
      }

      resolve();
    });
  };

  return {
    signOut,
  };
});
