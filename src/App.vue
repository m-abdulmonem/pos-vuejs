<template>
  <router-view />

</template>

<style lang="scss">
#app {
  direction: rtl !important;

  font-family: 'Cairo', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212529 !important;
  background: #f4f6f9 !important;
  direction: rtl !important;
}

body {
  direction: rtl !important;
  background: #f4f6f9 !important;
  color: #212529 !important;
  font-family: 'Cairo', sans-serif !important;
}

@media (min-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
    justify-content: left;
  }
}


nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
