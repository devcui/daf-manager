<template>
  <div class="min-h-screen relative back">
    <UNotifications />
    <div class="absolute inset-0 bg-gray-800 opacity-90" />
    <div class="absolute inset-0 flex justify-center items-center">
      <div class="bg-cover bg-center back-image">
        <div class="flex flex-col h-full">
          <div class="flex justify-around py-4">
            <div class="w-1/3 p-4">
              <Equitment @on-add="onEquitmentAdd" />
            </div>
            <div class="w-1/3 p-4">
              <Editor
                :emails="emails"
                @on-edit="onEditEmail"
              />
            </div>
            <div class="w-1/3 p-4">
              <Tools @on-add="onToolsAdd" />
            </div>
          </div>
          <button
            :disabled="loading"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="sendEmail"
          >
            发送邮件
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Equitment from '~/components/Equitment.vue'
import type { Email, Equipment, Tools } from '~/types'

const loading = ref(false)
const toast = useToast()

definePageMeta({
  auth: 'guest'
})

const router = useRouter()
const role = router.currentRoute.value.params.role.toString()
const emails = ref<Email[]>([])

const onEquitmentAdd = (item: Equipment) => {
  emails.value.push({
    name: item.name,
    receiveCharacNo: role,
    itemId: item.id,
    addInfo: 1
  })
}
const onToolsAdd = (item: Tools) => {
  emails.value.push({
    name: item.name,
    receiveCharacNo: role,
    itemId: item.id,
    addInfo: 1
  })
}
const onEditEmail = (e: Email[]) => {
  emails.value = e
}

const sendEmail = async () => {
  loading.value = true
  for (let index = 0; index < emails.value.length; index++) {
    const email = emails.value[index]
    toast.add({
      title: '发送邮件',
      description: `正在发送第${index + 1}-${email.name}封邮件`
    })
    await useFetch('/api/postal', {
      auth: false,
      method: 'POST',
      body: {
        ...email
      }
    })
  }
  toast.add({
    title: '发送邮件',
    description: '邮件发送完毕'
  })
  loading.value = false
}
</script>

<style lang="scss" scoped>
.back {
  background-image: url('@/public/background.webp');
  background-size: cover;
  background-position: center;
}
</style>
