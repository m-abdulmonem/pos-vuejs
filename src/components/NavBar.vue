<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="this.isNav == 'true'" id="nav">
    <a class="navbar-brand" href="#"><img src="../../public/img/logo.png" alt=""> ألصديق لأعلاف </a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" style="    padding-left: calc(1.5rem * 0.5);">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-if="user.id == 1">
          <a class="nav-link" href="https://el-saddiq-managment-feed.com/" target="_blank">
            <font-awesome-icon :icon="['fas', 'fa-dashboard']" /> لوحة التحكم
          </a>
        </li>
        <li class="nav-item btn-calculator" @click="openCalc">
          <a class="nav-link" href="#">
            <font-awesome-icon :icon="['fas', 'fa-calculator']" /> فتح الحاسبة
          </a>
        </li>
        <li class="nav-item dropdown">
          <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none notfi-icon" no-caret>
            <template #button-content>
              <font-awesome-icon :icon="['fas', 'fa-bell']" />
            </template>
            <b-dropdown-item href="#">Action</b-dropdown-item>
          </b-dropdown>
        </li>
        <li class="nav-item btn-calculator">
          <b-nav-item-dropdown right toggle-class="text-decoration-none notfi-icon">
            <template #button-content>
              <img src="../../public/img/logo.png" alt="" style="width: 30px;" /><span
                style="color:rgba(0, 0, 0, 0.55)">{{ user.name }}</span>
            </template>

            <b-dropdown-item href="#">الحساب</b-dropdown-item>
            <b-dropdown-item @click="singOut">
              <font-awesome-icon :icon="['fas', 'fa-sign-out']" /> تسجيل الخروج
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </li>
      </ul>
    </div>
  </nav>
  <!-- ./navbar -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'NavBar',
  data() {
    return {
      show: true
    }
  },
  props: ['isNav'],
  methods: {
    ...mapActions({
      singOutAction: 'auth/signOut'
    }),
    openCalc() {
      window.open('Calculator:///');
    },
    singOut() {
      this.singOutAction();
      this.$router.replace({
        name: 'login'
      });

    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body {
  direction: rtl !important;
  background: #f4f6f9 !important;
  color: #212529 !important;

  font-family: 'Cairo', sans-serif !important;
}



.navbar {
  background: #fff !important;
  transition: margin-left .3s ease-in-out;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 50px;

  font-family: 'Cairo', sans-serif !important;
}

.dropdown-toggle::after {
  border: none !important;
}

@media (min-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
    flex-wrap: wrap;
    flex-direction: column;
    align-content: end !important;
  }
}

img {
  width: 50px;
}
</style>
