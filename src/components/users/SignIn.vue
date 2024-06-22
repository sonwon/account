<template>
  <div class="signIn-outer">
    <SignInForm :onSubmit="handleSubmit" :data="formData" :setForm="setForm" />
    <!-- SignUp Component로 리다이렉트 시키는  -->
    <p id="signup-link-guide-text">계정이 없으신가요? <router-link id="sign-up-link" to="/sign-up">회원가입</router-link></p>
  </div>
</template>

<script>
import SignInForm from './SignInForm.vue';
import { useUserStore } from '@/components/pinia/UserStore';
import { mapActions } from 'pinia';

export default {
  name: 'SignIn',
  components: {
    SignInForm,
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(useUserStore, ['setStoreUserName', 'setStoreUserId', 'setStoreIsLogin']),
    setForm({ name, value }) {
      this.formData[name] = value;
    },
    async handleSubmit({ email, password }) {
      try {
        const response = await fetch(`http://localhost:3000/users?email=${email}`);
        const data = await response.json();
        if (data.length > 0 && data[0].password === password) {
          const token = btoa(email);
          localStorage.setItem('token', token, 0);
          localStorage.setItem('userId', data[0].id, 0);
          localStorage.setItem('userName', data[0].username, 0)
          this.setStoreUserName(data[0].username);
          this.setStoreUserId(data[0].id);
          this.setStoreIsLogin("로그아웃");
          this.$router.push({ name: 'accountStatistics' });
        } else {
          console.log('Invalid login credentials');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
  },
};
</script>
<style>
.signIn-outer{
  width : 800px;
}

#signup-link-guide-text {
  text-align: center;
  margin-top: 20px;
}
#sign-up-link {
  color: rgb(175, 175, 175);
  text-decoration: underline;
}
</style>