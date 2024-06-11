<template>
    <form class="container-lg" @submit.prevent="onSubmitPrevent">
      <InputFormItem
        label="Email"
        placeholder="example@kb.kr"
        type="text"
        v-model="email"
        :isWrong="isWarning.email"
        wrongMessage="이메일 형식이 올바르지 않습니다."
      />
      <InputFormItem
        label="Password"
        placeholder="********"
        type="password"
        v-model="password"
        :isWrong="isWarning.password"
        wrongMessage="비밀번호는 8자 이상 20자 이하입니다."
        :maxLength="20"
        :minLength="8"
      />
      <div class="w-full mt-8">
        <button class="btn btn-warning w-100" type="submit">
          로그인
        </button>
      </div>
    </form>
  </template>
  
  <script>
  import { ref } from 'vue';
  import InputFormItem from '../common/InputFormItem.vue';
  import { isEmail, isPassword } from '../../functions/validator.js';
  
  export default {
    name: 'SignInForm',
    components: {
      InputFormItem,
    },
    props: {
      onSubmit: {
        type: Function,
        required: true,
      },
      data: {
        type: Object,
        required: true,
        default: () => ({
          email: '',
          password: '',
        }),
      },
      setForm: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const email = ref(props.data.email);
      const password = ref(props.data.password);
  
      const isWarning = ref({
        email: false,
        password: false,
      });
  
      const resetWarning = {
        email: false,
        password: false,
        response: false,
      };
  
      const onSubmitPrevent = async (e) => {
        if (!isEmail(email.value)) {
          isWarning.value = { ...resetWarning, email: true };
          return;
        }
  
        if (!isPassword(password.value)) {
          isWarning.value = { ...resetWarning, password: true };
          return;
        }
  
        try {
          await props.onSubmit({ email: email.value, password: password.value });
        } catch (error) {
          console.error("Login failed:", error);
        }
      };
  
      return {
        email,
        password,
        isWarning,
        onSubmitPrevent,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if necessary */
  </style>
  