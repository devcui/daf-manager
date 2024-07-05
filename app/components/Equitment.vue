<template>
  <div>
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput
        v-model="keyword"
        @keydown.enter="onSearch"
      />
    </div>
    <UTable
      :columns="columns"
      :loading="loading"
      :rows="rows"
    >
      <template #actions-data="{ row }">
        <UButton
          color="gray"
          variant="ghost"
          @click="add(row)"
        >
          添加
        </UButton>
      </template>
    </UTable>
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination
        v-model="pageNum"
        :page-count="pageSize"
        :total="total"
        @update:model-value="queryPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Equipment, Page } from '~/types'

const emit = defineEmits(['onAdd'])

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'level', label: '等级' },
  { key: 'mainCategory', label: '分类' },
  { key: 'name', label: '名称' },
  { key: 'rarity', label: '稀有度' },
  { key: 'subCategory', label: '装备类型' },
  { key: 'subSubCategory', label: '装备子类型' },
  { key: 'actions', label: '操作' }
]
const rows = ref<Equipment[]>([])
const loading = ref<boolean>(false)
const keyword = ref<string>('')
const total = ref<number>(0)
const pageNum = ref<number>(1)
const pageSize = ref<number>(10)

const onSearch = async () => {
  initPage()
  queryPage()
}

const initPage = () => {
  pageNum.value = 1,
  pageSize.value = 10
}

const queryPage = () => {
  loading.value = true
  $fetch<Page<Equipment>>('/api/equipment', {
    auth: false,
    query: {
      keyword: keyword.value,
      pageNum: pageNum.value,
      pageSize: pageSize.value
    }
  }).then((data) => {
    loading.value = false
    rows.value = data?.records || []
    total.value = data?.total || 0
  })
}

const add = (item: Equipment) => {
  emit('onAdd', item)
}

onMounted(() => {
  initPage()
  queryPage()
})
</script>
