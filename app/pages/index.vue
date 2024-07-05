<template>
  <div class="h-screen bg-black-gray flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 bg-img" />
    <div class="white-box">
      <div style="margin-top: 50px;margin-bottom: 50">
        这里我就TM的先空着妈的
      </div>
    </div>
    <div class="rotating-img">
      <img
        src="@/public/chilun.png"
        alt="Rotating Image"
      >
    </div>
    <audio
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
definePageMeta({
  auth: 'guest'
})
</script>

<style scoped>
@keyframes rotate {
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
.h-screen {
  height: 100vh;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-img {
  background-image: url('@/public/background.webp');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
}
.white-box {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #000;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  height: 200px;
  z-index: 2;
  position: relative;
}
.rotating-img {
  position: absolute;
  top: calc(50% - 100px);
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.rotating-img img {
  width: 100px;
  animation: rotate 15s linear infinite;
}
</style>
