<script setup lang="ts">
import Peer from 'peerjs'
import { onMounted, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const callVideoRef = useTemplateRef('call-ref')
const receiveVideoRef = useTemplateRef('receive-ref')
const route = useRoute()
const router = useRouter()
const currMediaStream = ref()

onMounted(() => {
  const peerKey = sessionStorage.getItem('peerKey') ?? ''
  const peer = new Peer(peerKey, {
    host: 'face2face-peer-server.onrender.com',
    secure: true,
  })
  peer.on('open', function (id) {
    console.log('My peer ID is: ' + id)
    if (!route.params.id) {
      router.replace(`/meeting/${id}`)
    }
    sessionStorage.setItem('peerKey', id)
  })
  peer.on('call', function (call) {
    // Answer the call, providing our mediaStream
    call.answer(currMediaStream.value)
    call.on('stream', function (stream) {
      // `stream` is the MediaStream of the remote peer.
      // Here you'd add it to an HTML video/canvas element.
      if (receiveVideoRef?.value) receiveVideoRef.value.srcObject = stream
    })
  })
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then((stream) => {
      if (callVideoRef?.value) callVideoRef.value.srcObject = stream
      currMediaStream.value = stream
      if (route.params.id !== sessionStorage.getItem('peerKey')) {
        const call = peer.call(route.params.id as string, stream)
        call.on('stream', function (stream) {
          // `stream` is the MediaStream of the remote peer.
          // Here you'd add it to an HTML video/canvas element.
          if (receiveVideoRef?.value) receiveVideoRef.value.srcObject = stream
        })
      }
    })
})
</script>

<template>
  <main class="w-screen">
    <section class="w-screen h-screen relative">
      <video class="w-full h-full" autoplay ref="call-ref" muted></video>
      <section class="absolute bottom-[20px] left-0 right-0 flex justify-center">
        <section>asdasd</section>
        <video
          class="absolute right-0 bottom-0 w-[400px] h-[400px]"
          autoplay
          ref="receive-ref"
        ></video>
      </section>
    </section>
  </main>
</template>

<style>
@import 'tailwindcss';
</style>
