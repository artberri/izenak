<template>
  <div class="app flex flex--v">
    <header class="header nav flex">
      <div class="title font--yanone"><router-link :to="{ name: 'home'}">Izenak</router-link></div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <router-view />
    <footer class="footer">
      Footer
    </footer>
  </div>
</template>

<style>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.title {
  font-size: 2em;

  & a {
    text-decoration: none;
    color: var(--mainColor);
  }
}

.header {
  padding: 1em 2em;
}

.footer {
  padding: 1em 2em;
}
</style>
