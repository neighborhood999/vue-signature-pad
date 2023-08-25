---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';

const members = [
  {
    avatar: 'https://www.github.com/neighborhood999.png',
    name: 'Jie Peng',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/neighborhood999' },
    ]
  },
  {
    avatar: 'https://www.github.com/pratik227.png',
    name: 'Pratik Patel',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/pratik227' },
      { icon: 'twitter', link: 'https://twitter.com/PratikPatel_227' },
      { icon: {svg:'<svg viewBox="0 0 1043.63 592.71" class="au av"><g data-name="Layer 2"><g data-name="Layer 1"><path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path></g></g></svg>'}, link: 'https://medium.com/@pratikpatel_60309' }
    ],
    sponsor:'https://github.com/sponsors/pratik227'
  },
  {
    avatar: 'https://www.github.com/IlCallo.png',
    name: 'Paolo Caleffi',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/IlCallo' },
      { icon: 'twitter', link: 'https://twitter.com/pcalloc' },
    ]
  },
  {
    avatar: 'https://www.github.com/KrisHedges.png',
    name: 'Kris Hedges',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/KrisHedges' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Contributors</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="members" />
</VPTeamPage>
