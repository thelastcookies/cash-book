<script setup lang="ts">
import { useAppStore } from '@/stores/app.ts';

const userStore = useUserStore();

/** 当前登录账号展示名：优先真实姓名，其次用户名 */
const displayName = computed(() => {
  const { realName, username } = userStore.userInfo;
  return realName || username || '未登录';
});

/** 修改密码 */
const onChangePassword = () => {
  // todo 补充修改密码交互逻辑
};

/** 退出登录 */
const onLogout = () => {
  showToast('注销中，请稍候');
  const { signOut } = useAppStore();
  signOut();
};

const version = __APP_VERSION__;

</script>

<template>
  <div class="min-h-screen bg-#f7f8fa flex flex-col">
    <!-- 账号信息 -->
    <van-cell-group inset title="账号">
      <van-cell title="当前账号" :value="displayName" />
    </van-cell-group>

    <!-- 安全设置 -->
    <van-cell-group inset title="安全" class="mt-2">
      <van-cell
        title="修改密码"
        is-link
        @click="onChangePassword"
      />
      <van-cell title="版本信息" :value="version" />
    </van-cell-group>

    <!-- 退出登录 -->
    <div class="mt-6 mx-4">
      <van-button plain type="danger" block @click="onLogout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<style scoped>

</style>
