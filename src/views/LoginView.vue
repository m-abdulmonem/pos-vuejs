<template>
  <NavBar :isNav="false" />
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt v-tilt="{ scale: 1.1 }">
          <img src="img/logo.png" alt="IMG">
        </div>

        <form class="login100-form validate-form" @submit.prevent="submit">

          <span class="login100-form-title">
            تسجيل دخول عضو
          </span>
          <h6 class="danger-color mb-4" v-if="errorMessage != null">{{ errorMessage }}</h6>
          <div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            <input class="input100" type="text" name="email" placeholder="اسم المستخدم" autocomplete="username"
              v-model="form.auth">
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-user" aria-hidden="true"></i>
            </span>
          </div>

          <div class="wrap-input100 validate-input" data-validate="Password is required">
            <input class="input100" type="password" name="pass" placeholder="كلمة  المرور"
              autocomplete="current-password" v-model="form.password">
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn">
              تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
// import axios from 'axios'
import { mapActions } from 'vuex';
export default {
  name: 'LoginView',
  components: {
    NavBar
  },

  data() {
    return {
      errorMessage: null,
      form: {
        auth: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions({
      singIn: "auth/singIn"
    }),
    async submit() {
      
      if (this.form.auth !== null && this.form.password !== null) {
        this.singIn(this.form)
      } else {
        this.errorMessage = "اسم المستخدم وكلمة المرور مطلوبان";
      }

    }
  }
}

</script>

<style scoped>
@import '/public/css/animate.css';

@import '/public/css/app.css';
</style>
