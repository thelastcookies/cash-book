import type { OidcUserInfo } from '@/api/oidc/types';

/** 获取当前用户信息（id、username、roles），身份来自自身 Access Token */
export const getCurrentUser = () => {
  return useGet<OidcUserInfo>(
    `${OIDC_URL}/me`,
    undefined,
    { token: true },
  );
};
