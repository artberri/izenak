<template>
  <main role="main" class="section flex flex--v about">
    <div class="flex flex--v">
      <GoBack>Honi buruz</GoBack>
    </div>
    <div class="content">
      <p>
        <strong>Izenak.eus</strong> webgunea/aplikazioa <a href="http://www.berriart.com">berriart</a>ek
        garatu du eta bertan euskal pertsona-izenak aukeratzeko iragazkiak eskaintzen dira.
      </p>
      <p>
        Agertzen diren izen, itzulpen eta esanahi guztiak <a href="https://www.euskaltzaindia.eus/">Euskaltzaindia</a>ren
        webgunetik hartu dira 'web scraping' deituriko teknika erabiliz.
      </p>
      <p>
        Webgune honen kodigoa software librea da eta <a href="https://www.euskadi.eus/contenidos/informacion/software_lizentziak_2018/eu_def/adjuntos/gnu-gpl-v3.eu.html">GNU Lizentzia Publiko Orokorra (GNU GPL 3)</a>
        lizentziarekin kaleratu da. Kodigoa, <a href="https://github.com/artberri/izenak">Github</a>en aurki daiteke.
      </p>
      <p>
        Webgune honetara haurdun zaude(te)lako heldu izatekotan... Zorionak! :D
      </p>
    </div>
  </main>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GoBack from '../components/GoBack.vue';

@Component({
  components: {
    GoBack,
  },
})
export default class Izenak extends Vue {}
</script>

<style scoped>
.about {
  z-index: 13;
  background: var(--whiteColor);
  transform: translateX(0);
}

.content {
  flex-grow: 1;
  text-align: left;
  padding: 1em;
  font-size: 1.2em;
  overflow: auto;
}

.content p {
  margin-bottom: 20px;
}

.navigation-enter-active.about,
.navigation-leave-active.about {
  transition-property: transform;
}

.navigation-enter.about,
.navigation-leave-to.about {
  transform: translateX(100vw);
}
</style>
