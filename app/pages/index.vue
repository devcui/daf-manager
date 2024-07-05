<template>
  <div class="h-screen bg-black-gray flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 bg-img" />
    <div class="bg-white bg-opacity-80 border border-black rounded-lg p-5 max-w-md w-full h-auto z-10 relative">
      <div class="rotating-img absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <img
          v-show="!unref(error)"
          src="@/public/chilun.png"
          alt="Rotating Image"
          class="w-24 animate-spin-slow"
          style="margin-top: -270px"
        >
        <img
          v-show="!!unref(error)"
          src="@/public/chilun.png"
          alt="Rotating Image"
          class="w-24 animate-spin-slow"
          style="margin-top: -335px"
        >
      </div>
      <div class="my-10 text-center z-10 relative">
        <UForm
          :schema="schema"
          :state="state"
          @submit="onSubmit"
        >
          <div class="flex items-center mb-4">
            <UFormGroup
              label="账号/QQ号"
              name="account"
              eager-validation
              class="flex-1"
            >
              <UInput
                v-model="state.account"
                placeholder="请输入账号/QQ号"
                @keydown.enter="onAccountEnter"
              />
            </UFormGroup>
            <UButton
              class="ml-2"
              @click="onAccountEnter"
            >
              获取角色
            </UButton>
          </div>
          <UFormGroup
            label="角色"
            name="role"
            eager-validation
            required
          >
            <USelect
              v-model="state.role"
              :options="state.roles"
              option-attribute="name"
            />
          </UFormGroup>
          <UButton type="submit">
            下一步
          </UButton>
        </UForm>
      </div>
      <UAlert
        v-show="!!unref(error)"
        icon="i-heroicons-command-line"
        color="red"
        variant="solid"
        title="错误!"
        :description="unref(error)"
      />
    </div>
    <button
      ref="playButton"
      style="display: none;"
      @click="playAudio"
    >
      Play
    </button>
    <audio
      ref="audio"
      autoplay
      loop
    >
      <source
        src="@/public/music.mp3"
        type="audio/mpeg"
      >
    </audio>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { Page, Role } from '~/types'

definePageMeta({
  auth: 'guest'
})

const error = ref()

// router
const router = useRouter()

// ref
const audio = ref<HTMLAudioElement | null>(null)
const playButton = ref<HTMLButtonElement | null>(null)

// form
const schema = z.object({
  account: z.string()
})
const state = reactive({
  account: undefined,
  role: undefined,
  roles: []
})

// account enter
const onAccountEnter = async () => {
  if (!state.account) {
    error.value = '请输入账号/QQ号'
    return
  }
  const { data } = await useFetch<Page<Role>>(`/api/characInfo?pageNum=1&pageSize=100&accountName=${state.account}`, {
    method: 'get',
    auth: false
  })
  const records = data.value.records
  state.roles = records.map((record) => {
    return { name: record.characName, value: record.characNo }
  })
  if (state.roles && state.roles.length > 0) state.role = state.roles[0].value
}

const onSubmit = () => {
  if (!state.role || !state.account) {
    error.value = '请输入账号/QQ号和角色'
    return
  }
  router.push(`/flush/${state.role}`)
}

// audio
const playAudio = () => {
  audio.value.play().catch((error) => {
    console.log('Error playing audio:', error)
  })
}

const simulateClick = () => {
  playButton.value.click()
}
const handleInteraction = () => {
  simulateClick()
  document.removeEventListener('click', handleInteraction)
  document.removeEventListener('keydown', handleInteraction)
}

const addInteractionListener = () => {
  document.addEventListener('click', handleInteraction)
  document.addEventListener('keydown', handleInteraction)
}

onMounted(() => {
  simulateClick()
  addInteractionListener()
})
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.bg-black-gray {
  background-color: #2e2e2e;
}
.bg-img {
  background-image: url('@/public/background.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.animate-spin-slow {
  animation: spin-slow 15s linear infinite;
}

.pointer-events-none {
  pointer-events: none;
}
</style>
