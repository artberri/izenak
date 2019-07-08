<template>
  <div>
    <div @click="openMenu"><Icon class="menu-icon" icon="icon-menu" /></div>
    <transition name="fade">
      <div class="menu" v-if="menuOpened">
        <div @click="closeMenu"><Icon icon="icon-cross" class="close" /></div>
          <nav class="expand">
            <ul class="flex flex--v flex--center expand menu-container">
              <li @click="closeMenu"><router-link
                :to="{ name: 'home'}">Hasiera</router-link></li>
              <li @click="closeMenu"><router-link
                :to="{ name: 'neskak'}">Nesken izenak</router-link></li>
              <li @click="closeMenu"><router-link
                :to="{ name: 'mutilak'}">Mutilen izenak</router-link></li>
              <li @click="closeMenu"><router-link
                :to="{ name: 'guztiak'}">Izen guztiak</router-link></li>
              <li @click="closeMenu"><router-link
                :to="{ name: 'about'}">Honi buruz</router-link></li>
            </ul>
          </nav>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from './Icon.vue';

@Component({
  components: {
    Icon,
  },
})
export default class Menu extends Vue {
  public menuOpened: boolean = false;

  public openMenu(): void {
    this.menuOpened = true;
  }

  public closeMenu(): void {
    this.menuOpened = false;
  }
}
</script>

<style scoped>
.menu-icon {
  font-size: 32px;
}

.menu-container {
  height: 100%;
  width: 100%;
}

.menu-container li {
  text-transform: uppercase;
  font-size: 2em;
  margin-top: 1em;
}

.menu-container li:first-child {
  margin: 0;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px 30px;
  font-size: 24px;
}

.menu {
  position: fixed;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--whiteColor);
}
</style>
