<template>
  <div>
    <UTable
      :rows="props.emails"
      :columns="columns"
    >
      <template #actions-data="{ row, index }">
        <UButton
          color="gray"
          variant="ghost"
          @click="update(index, row)"
        >
          修改
        </UButton>
        <UButton
          color="gray"
          variant="ghost"
          @click="remove(index)"
        >
          删除
        </UButton>
      </template>
    </UTable>
    <UModal v-model="visable">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <UForm
          :state="state"
          class="space-y-4"
          @submit="onOk"
        >
          <UFormGroup
            label="索引"
            name="index"
          >
            <UInput
              v-model="state.index"
              disabled
              placeholder="索引"
              type="number"
            />
          </UFormGroup>
          <UFormGroup
            label="名字"
            name="name"
          >
            <UInput
              v-model="state.name"
              disabled
              placeholder="名字"
            />
          </UFormGroup>

          <UFormGroup
            label="接收人ID(角色ID)"
            name="receiveCharacNo"
          >
            <UInput
              v-model="state.receiveCharacNo"
              disabled
              placeholder="角色ID"
            />
          </UFormGroup>

          <UFormGroup
            label="物品附件ID"
            name="itemId"
          >
            <UInput
              v-model="state.itemId"
              disabled
              placeholder="附件ID"
              type="number"
            />
          </UFormGroup>

          <UFormGroup
            label="物品数量"
            name="addInfo"
          >
            <UInput
              v-model="state.addInfo"
              placeholder="数量"
              type="number"
            />
          </UFormGroup>

          <UFormGroup
            label="物品强化等级"
            name="upgrade"
          >
            <UInput
              v-model="state.upgrade"
              placeholder="强化等级"
              type="number"
            />
          </UFormGroup>

          <UFormGroup
            label="红字属性类型"
            name="amplifyOption"
          >
            <UInput
              v-model="state.amplifyOption"
              placeholder="属性类型"
              type="number"
            />
          </UFormGroup>

          <UFormGroup
            label="红字属性值"
            name="amplifyValue"
          >
            <UInput
              v-model="state.amplifyValue"
              placeholder="属性值"
              type="number"
            />
          </UFormGroup>

          <UFormGroup
            label="金币数量"
            name="gold"
          >
            <UInput
              v-model="state.gold"
              placeholder="金币数量"
              type="number"
            />
          </UFormGroup>

          <UFormGroup
            label="物品是否是封装"
            name="sealFlag"
          >
            <UToggle
              v-model="state.sealFlag"
            />
          </UFormGroup>

          <UFormGroup
            label="物品锻造等级"
            name="seperateUpgrade"
          >
            <UInput
              v-model="state.seperateUpgrade"
              placeholder="锻造等级"
              type="number"
            />
          </UFormGroup>

          <UButton type="submit">
            提交
          </UButton>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
import type { Email } from '~/types'

const visable = ref(false)
const state = reactive<Email>({
  receiveCharacNo: '',
  itemId: 0,
  addInfo: 0
})
const props = defineProps({
  emails: Array<Email>
})
const emit = defineEmits(['onEdit'])

const update = (index: number, email: Email) => {
  state.receiveCharacNo = email.receiveCharacNo
  state.itemId = email.itemId
  state.addInfo = email.addInfo
  state.upgrade = email?.upgrade
  state.amplifyOption = email?.amplifyOption
  state.amplifyValue = email?.amplifyValue
  state.gold = email?.gold
  state.sealFlag = email?.sealFlag
  state.seperateUpgrade = email?.seperateUpgrade
  state.name = email?.name
  state.index = index
  visable.value = true
}

const onOk = () => {
  const data = props.emails.map((email, index) => {
    if (index === state?.index) {
      return state
    }
    return email
  })
  emit('onEdit', data)
  visable.value = false
}

const remove = (index: number) => {
  const data = props.emails.filter((email, i) => i !== index)
  emit('onEdit', data)
}

const columns = [
  {
    key: 'itemId',
    label: '物品ID'
  },
  {
    key: 'name',
    label: '名称'
  },
  {
    key: 'addInfo',
    label: '数量'
  },
  {
    key: 'upgrade',
    label: '强化等级'
  },
  {
    key: 'amplifyOption',
    label: '红字属性/0空/-1体力/-2精神/-3力量/-4智力'
  },
  {
    key: 'amplifyValue',
    label: '红字属性'
  },
  {
    key: 'gold',
    label: '金币数量'
  },
  {
    key: 'sealFlag',
    label: '是否封装'
  },
  {
    key: 'seperateUpgrade',
    label: '物品锻造等级'
  },
  {
    key: 'actions',
    label: '操作'
  }
]
</script>

<style></style>
