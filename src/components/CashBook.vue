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

const onDateConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
  formData.time = selectedValues.join('-') + ' ' + formData.time.split(' ')[1];
  showDatePicker.value = false;
};

const records = ref<RecordRecord[]>([]);
const reversedRecords = computed(() => [...records.value].reverse());
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

onMounted(async () => {
  await fetch();
  await nextTick(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
});

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
    records.value.unshift(res.data);
    formData.item = '';
    formData.amount = '';
  } else {
    showToast(res.msg || '保存失败');
  }
};

</script>

<template>
  <div class="min-h-screen bg-#f7f8fa flex flex-col">
    <div class="flex-1 pb-3">
      <van-pull-refresh v-model="refreshing" @refresh="fetch">
        <van-cell-group inset v-for="record in reversedRecords" :key="record.id" class="mt-2!">
          <van-cell :title="record.record || '未命名'" :value="`¥${(record.amount ?? 0).toFixed(2)}`"
            :label="dayjs(record.createdAt).format('YYYY-MM-DD HH:mm')" />
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
      <van-date-picker
        v-model="currentDate"
        :min-date="new Date(2020, 0, 1)"
        :max-date="new Date()"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false"
      />
    </van-popup>
  </div>
</template>
