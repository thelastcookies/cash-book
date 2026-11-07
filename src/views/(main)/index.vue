<script setup lang="ts">
import type { RecordRecord } from '@/api/record/types';

const now = dayjs();

const formData = reactive({
  time: now.format('YYYY-MM-DD HH:mm'),
  item: '',
  amount: '',
});

const showDatePicker = ref(false);
const currentDate = ref([now.format('YYYY'), now.format('MM'), now.format('DD')]);
const currentTime = ref([now.format('HH'), now.format('mm')]);

const onPickerConfirm = () => {
  formData.time = currentDate.value.join('-') + ' ' + currentTime.value.join(':');
  showDatePicker.value = false;
};

const onPickerCancel = () => {
  showDatePicker.value = false;
};

const records = ref<RecordRecord[]>([]);
const reversedRecords = computed(() => [...records.value].reverse());
const groupedRecords = computed(() => {
  const grouped = groupBy(reversedRecords.value, (r: RecordRecord) => dayjs(r.createdAt).format('YYYY-MM-DD'));
  return Object.entries(grouped).map(([date, items]) => ({
    date,
    label: dayjs(date).format('M月D日'),
    items,
  }));
});
const refreshing = ref(false);
const currentPage = ref(1);
const pageSize = 10;

const fetch = async () => {
  const { success, data, msg } = await getRecords({ page: currentPage.value, pageSize });
  if (!success) {
    showToast(msg || '获取记录失败');
  }
  records.value = [...records.value, ...data.list];
  currentPage.value++;
  refreshing.value = false;
};

onMounted(() => {
  init();
});

const init = async () => {
  currentPage.value = 1;
  records.value = [];
  await fetch();
  await nextTick(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
};

const handleDelete = async (id: number) => {
  const res = await deleteRecord(id);
  if (res.success) {
    showToast('删除成功');
    await init();
  } else {
    showToast(res.msg || '删除失败');
  }
};

const onSubmit = async () => {
  if (!formData.time) {
    showToast('请选择时间');
    return;
  }
  if (!formData.amount) {
    showToast('请输入金额');
    return;
  }
  const res = await saveRecord({
    createdAt: dayjs(formData.time).toDate(),
    record: formData.item || '',
    amount: Number(formData.amount),
  });
  if (res.success) {
    formData.item = '';
    formData.amount = '';
    await init();
  } else {
    showToast(res.msg || '保存失败');
  }
};
</script>

<template>
  <div class="min-h-screen bg-#f7f8fa flex flex-col">
    <div class="flex-1 pb-3">
      <van-pull-refresh v-model="refreshing" @refresh="fetch">
        <van-cell-group
          inset
          v-for="group in groupedRecords"
          :key="group.date"
          :title="group.label"
        >
          <van-swipe-cell v-for="record in group.items" :key="record.id">
            <van-cell
              :title="record.record || '未命名'"
              :value="`¥${(record.amount ?? 0).toFixed(2)}`"
              :label="dayjs(record.createdAt).format('HH:mm')"
            />
            <template #right>
              <van-button square type="danger" text="删除" class="h-full!" @click="handleDelete(record.id)" />
            </template>
          </van-swipe-cell>
        </van-cell-group>
      </van-pull-refresh>
    </div>

    <div class="shrink-0 bg-white border-t border-#ebedf0 pb-12">
      <van-form @submit="onSubmit" class="mt-2">
        <van-cell-group inset>
          <van-field
            v-model="formData.time"
            is-link
            readonly
            label="时间"
            placeholder="选择时间"
            @click="showDatePicker = true"
          />

          <van-field
            v-model="formData.item"
            label="条目"
            placeholder="请输入记账条目"
          />

          <van-field
            v-model="formData.amount"
            label="金额"
            type="number"
            placeholder="请输入金额"
          />
        </van-cell-group>

        <div class="mt-3 mx-4">
          <van-button type="primary" block native-type="submit">
            确认
          </van-button>
        </div>
      </van-form>
    </div>

    <van-popup v-model:show="showDatePicker" position="bottom" round>
      <van-picker-group
        title="选择时间"
        :tabs="['选择日期', '选择时间']"
        @confirm="onPickerConfirm"
        @cancel="onPickerCancel"
      >
        <van-date-picker
          v-model="currentDate"
          :min-date="new Date(2020, 0, 1)"
          :max-date="new Date()"
        />
        <van-time-picker v-model="currentTime" />
      </van-picker-group>
    </van-popup>
  </div>
</template>
