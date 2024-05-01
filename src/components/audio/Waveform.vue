<script setup>
import WaveformPlaylist from "waveform-playlist";

const playlist = WaveformPlaylist.init({
    container: document.getElementById("playlist"),
    samplesPerPixel: 128,
    zoomLevels: [128, 256, 512],
    controls: {
        show: true
    }
});

playlist.load([
    {
        src: "@/assets/Drum Loop.wav"
    }
</script>

<template>
    <div id="playlist"></div>
</template>