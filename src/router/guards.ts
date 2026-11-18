/** OIDC 事件监听是否已初始化 */
let oidcEventsInitialized = false;

/**
 * 初始化 OIDC 事件监听
 *
 * 监听 token 刷新事件，自动同步 access_token 到 token store
 */
const initOidcEvents = () => {
  if (oidcEventsInitialized || !isOidcEnabled()) return;
  oidcEventsInitialized = true;

  const userManager = getUserManager();
  userManager.events.addUserLoaded((user) => {
    const { setToken } = useTokenStore();
    setToken(user.access_token);
  });
  userManager.events.addUserUnloaded(() => {
    const { $reset } = useTokenStore();
    $reset();
  });
};

router.beforeEach(async (to) => {
  /** 初始化 OIDC 事件监听 */
  initOidcEvents();

  /** OIDC 模式下，同步 access_token 到 token store */
  if (isOidcEnabled()) {
    const user = await getOidcUser();
    const { setToken, getToken } = useTokenStore();
    if (user && !user.expired) {
      const currentToken = getToken();
      if (currentToken !== user.access_token) {
        setToken(user.access_token);
      }
    } else {
      // OIDC 模式下无有效用户，发起 OIDC 登录（重定向到认证中心）
      // 回调路径不需要触发登录，避免循环
      const oidcCallbackPath = new URL(import.meta.env.APP_OIDC_REDIRECT_URI).pathname;
      if (oidcCallbackPath !== to.path) {
        await oidcLogin();
        return false;
      }
    }
  }
  const userStore = useUserStore();
  if (!Object.keys(userStore.userInfo).length) {
    // 如果用户信息不存在则尝试获取
    try {
      // 获取用户、Action 信息并进行初始化。
      await userStore.getUserInfo();
      // 获取 Actions 并生成路由配置
    } catch (e) {
      if ((e as Error).message === WITH_UNAUTHORIZED) {
        const { signOut } = useAppStore();
        await signOut();
      }
    }
    return;
  }
});
