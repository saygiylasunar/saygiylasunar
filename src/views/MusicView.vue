<template>
  <div class="page-view music-view">
    <section class="page-hero compact-hero music-hero">
      <div class="container music-hero-grid">
        <div>
          <p class="eyebrow">{{ copy.eyebrow }}</p>
          <h1>{{ site.music.artistName }}</h1>
          <p class="music-lead">{{ copy.lead }}</p>
        </div>
        <aside class="music-identity" aria-label="Artist identity">
          <span>{{ copy.artistLabel }}</span>
          <strong>{{ site.music.artistName }}</strong>
          <p>{{ copy.identity }}</p>
        </aside>
      </div>
    </section>

    <section class="section music-platform-section">
      <div class="container">
        <div class="section-heading music-heading">
          <p class="eyebrow">{{ copy.listenEyebrow }}</p>
          <h2>{{ copy.listenTitle }}</h2>
          <p>{{ copy.listenText }}</p>
        </div>

        <div class="music-platform-grid">
          <a :href="site.music.spotify" target="_blank" rel="noopener noreferrer" class="music-platform-card">
            <span>01</span>
            <strong>Spotify</strong>
            <small>{{ copy.spotify }}</small>
            <b aria-hidden="true">↗</b>
          </a>
          <a :href="site.music.youtubeMusic" target="_blank" rel="noopener noreferrer" class="music-platform-card">
            <span>02</span>
            <strong>YouTube Music</strong>
            <small>{{ copy.youtube }}</small>
            <b aria-hidden="true">↗</b>
          </a>
          <a :href="site.music.appleMusic" target="_blank" rel="noopener noreferrer" class="music-platform-card">
            <span>03</span>
            <strong>Apple Music</strong>
            <small>{{ copy.apple }}</small>
            <b aria-hidden="true">↗</b>
          </a>
        </div>
      </div>
    </section>

    <section class="section section-tinted">
      <div class="container music-record-grid">
        <div>
          <p class="eyebrow">{{ copy.releasesEyebrow }}</p>
          <h2>{{ copy.releasesTitle }}</h2>
        </div>
        <div class="music-release-list">
          <article v-for="release in releases" :key="release.title">
            <span>{{ release.year }}</span>
            <strong>{{ release.title }}</strong>
            <small>{{ release.artist }}</small>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { site } from '../lib/content.js'
import { locale } from '../lib/locale.js'

const releases = [
  { title: 'Sindim İçine', artist: 'Saygıyla Sunar', year: '2024' },
  { title: 'Sır Taşım', artist: 'Saygıyla Sunar', year: '2024' },
  { title: 'Theme of Münzevi', artist: 'Saygıyla Sunar · The Münzevi · Münzevi Saygıyla Sunar', year: '2025' },
  { title: 'Uyanış', artist: 'Münzevi Saygıyla Sunar', year: '2026' },
]

const copy = computed(() => locale.value === 'tr'
  ? {
      eyebrow: 'Müzik / Sanatçı profili',
      lead: 'Saygıyla Sunar, Ersen Filiz’in müzik yayınlarında kullandığı sanatçı adıdır. Yayınlara doğrudan dinleme platformlarından ulaşabilirsiniz.',
      artistLabel: 'Sanatçı adı',
      identity: 'Bağımsız müzik, yaratıcı teknoloji ve görsel anlatı çalışmalarının müzik tarafındaki imzası.',
      listenEyebrow: 'Dinleme bağlantıları',
      listenTitle: 'Platformunu seç ve dinle.',
      listenText: 'Sayfada otomatik oynatıcı kullanılmaz; ses yalnızca seçtiğiniz platformda ve sizin kontrolünüzde başlar.',
      spotify: 'Doğrulanmış sanatçı profili',
      youtube: 'Saygıyla Sunar sonuçlarını aç',
      apple: 'Saygıyla Sunar sonuçlarını aç',
      releasesEyebrow: 'Yayınlar',
      releasesTitle: 'Seçili müzik kayıtları',
    }
  : {
      eyebrow: 'Music / Artist profile',
      lead: 'Saygıyla Sunar is the artist name used by Ersen Filiz for music releases. Listen through the streaming platform of your choice.',
      artistLabel: 'Artist name',
      identity: 'The musical signature of independent music, creative technology and visual storytelling work.',
      listenEyebrow: 'Streaming links',
      listenTitle: 'Choose a platform and listen.',
      listenText: 'No autoplaying player is embedded on this page; audio starts only on the platform you choose and remains under your control.',
      spotify: 'Verified artist profile',
      youtube: 'Open Saygıyla Sunar results',
      apple: 'Open Saygıyla Sunar results',
      releasesEyebrow: 'Releases',
      releasesTitle: 'Selected music releases',
    })
</script>
