<script setup lang="ts">
import dayjs from 'dayjs'
import { showToast } from 'vant'

interface Record {
  id: number
  time: string
  item: string
  amount: number
}

const now = dayjs()

const formData = reactive({
  time: now.format('YYYY-MM-DD HH:mm'),
  item: '',
  amount: '',
})

const showDatePicker = ref(false)
const currentDate = ref([now.format('YYYY'), now.format('MM'), now.format('DD')])

function onDateConfirm({ selectedValues }: { selectedValues: string[] }) {
  formData.time = selectedValues.join('-') + ' ' + formData.time.split(' ')[1]
  showDatePicker.value = false
}

function onSubmit() {
  if (!formData.time) {
    showToast('请选择时间')
    return
  }
  if (!formData.amount) {
    showToast('请输入金额')
    return
  }
  const record: Record = {
    id: Date.now(),
    time: formData.time,
    item: formData.item,
    amount: Number(formData.amount),
  }
  records.value.unshift(record)
  formData.item = ''
  formData.amount = ''
}

let nextOffset = 0

// mock 数据
function generateMockRecords(count: number): Record[] {
  const items = ['午餐', '地铁', '咖啡', '超市', '水果', '晚餐', '打车', '电影', '奶茶', '早餐']
  const result: Record[] = []
  for (let i = 0; i < count; i++) {
    const hoursAgo = nextOffset + count - 1 - i
    result.push({
      id: now.valueOf() - hoursAgo * 3600000,
      time: now.subtract(hoursAgo, 'hour').format('YYYY-MM-DD HH:mm'),
      item: items[hoursAgo % items.length],
      amount: Number((Math.random() * 100 + 5).toFixed(2)),
    })
  }
  nextOffset += count
  return result
}

const records = ref<Record[]>(generateMockRecords(10))
const refreshing = ref(false)

onMounted(() => {
  nextTick(() => {
    window.scrollTo(0, document.documentElement.scrollHeight)
  })
})

function onRefresh() {
  setTimeout(() => {
    const olderRecords = generateMockRecords(5)
    records.value.unshift(...olderRecords)
    refreshing.value = false
  }, 500)
}
</script>

<template>
  <div class="min-h-screen bg-#f7f8fa flex flex-col">
    <div class="flex-1 pb-3">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-cell-group inset v-for="record in records" :key="record.id" class="mt-2!">
          <van-cell :title="record.item || '未命名'" :value="`¥ ${record.amount.toFixed(2)}`" :label="record.time" />
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

