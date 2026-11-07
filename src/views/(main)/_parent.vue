<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const tabs = [
  { title: '记账', path: '/' },
  { title: '分析', path: '/analysis' },
];

const activePath = computed<string>({
  get: () => route.path,
  set: (path: string) => router.push(path),
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="shrink-0 bg-white pt-[env(safe-area-inset-top)]">
      <van-tabs v-model:active="activePath">
        <van-tab v-for="tab in tabs" :key="tab.path" :title="tab.title" :name="tab.path" />
      </van-tabs>
    </header>
    <main class="flex-1 min-h-0 overflow-hidden">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>
