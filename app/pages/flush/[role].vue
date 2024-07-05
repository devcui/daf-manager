<template>
  <div>
    <Equitment @on-add="onEquitmentAdd" />
    <Tools @on-add="onToolsAdd" />
    <Editor
      :emails="emails"
      @edit="onEditEmail"
    />
  </div>
</template>

<script lang="ts" setup>
import Equitment from '~/components/Equitment.vue'
import type { Email, Equipment, Tools } from '~/types'

definePageMeta({
  auth: 'guest'
})

const router = useRouter()
const role = router.currentRoute.value.params.role.toString()
const emails = ref<Email[]>([])

const onEquitmentAdd = (item: Equipment) => {
  emails.value.push({
    receiveCharacNo: role,
    itemId: item.id,
    addInfo: 1
  })
}
const onToolsAdd = (item: Tools) => {
  emails.value.push({
    receiveCharacNo: role,
    itemId: item.id,
    addInfo: 1
  })
}
const onEditEmail = (e: Email[]) => {
  emails.value = [...e]
}

const sendEmail = async () => {
  return useFetch('/api/postal', { body: null, auth: false, immediate: false })
}
</script>

<style lang="scss" scoped></style>
