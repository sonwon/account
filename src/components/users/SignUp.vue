<template>
  <div class="signUp-outer">
    <form class="container-lg" @submit.prevent="onSubmitPrevent">
      <InputFormItem
        label="이메일 (아이디)"
        placeholder="example@kb.kr"
        type="text"
        v-model="email"
        :isWrong="isWarning.email"
        wrongMessage="잘못된 이메일 형식입니다."
      />
      <InputFormItem
        label="이름"
        placeholder="KB 국민은행 취업시켜줘라"
        type="text"
        v-model="username"
      />
      <InputFormItem
        label="비밀번호"
        placeholder="********"
        type="password"
        v-model="password"
        :isWrong="isWarning.password"
        wrongMessage="비밀번호는 10자 이상 특수문자를 포함해야 합니다."
        :maxLength="20"
        :minLength="10"
      />
      <InputFormItem
        label="비밀번호 확인"
        placeholder="********"
        type="password"
        v-model="passwordConfirm"
        :isWrong="isWarning.passwordConfirm"
        wrongMessage="비밀번호가 일치하지 않습니다."
        :maxLength="20"
        :minLength="8"
      />
      <div class="w-100 mt-3">
        <button class="w-100 btn btn-warning" type="submit">
          회원가입
        </button>
      </div>
    </form>
  </div>
</template>
  
  <script>
  import { ref } from 'vue';
  import InputFormItem from '../common/InputFormItem.vue';
  import { isEmail, isPassword } from '../../functions/validator.js';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  export default {
    name: 'SignUpForm',
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
        username: '',
        generation: '',
        password: '',
        passwordConfirm: '',
      }),
    },
      setForm: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const email = ref(props.data.email);
      const username = ref(props.data.username);
      const generation = ref(props.data.generation);
      const password = ref(props.data.password);
      const passwordConfirm = ref(props.data.passwordConfirm);
      const router = useRouter();
  
      const isWarning = ref({
        email: false,
        password: false,
        passwordConfirm: false,
      });
  
      const resetWarning = {
        email: false,
        password: false,
        passwordConfirm: false,
      };
  
      const onSubmitPrevent = async () => {
      if (!isEmail(email.value)) {
        isWarning.value = { ...resetWarning, email: true };
        return;
      }

      if (!isPassword(password.value)) {
        isWarning.value = { ...resetWarning, password: true };
        return;
      }

      if (password.value !== passwordConfirm.value) {
        isWarning.value = { ...resetWarning, passwordConfirm: true };
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/users', {
          email: email.value,
          username: username.value,
          password: password.value,
          balance: 0,
          
        });
        console.log('User created:', response.data);
        // Redirect or handle successful sign-up here
        alert("가입 성공!");
        router.push('/');
      } catch (error) {
        console.error('Error creating user:', error);
        // Handle error (e.g., show an error message)
      }
    };
      return {
        email,
        username,
        password,
        passwordConfirm,
        isWarning,
        onSubmitPrevent,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if necessary */
  .signUp-outer{
    width : 800px;
  }
  </style>
  