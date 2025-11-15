<script setup>
  import LabelBase from '@/components/base/LabelBase.vue';
  import InputBase from '@/components/base/InputBase.vue';
  import InputErrorBase from '@/components/base/InputErrorBase.vue';
  import MassegeBox from '@/components/base/MassegeBox.vue';
  import buttonBase from '@/components/base/buttonBase.vue';

  import { ref } from 'vue';

  import { useUserStore } from '@/stores/user';
  import { Form } from 'vee-validate';
  import * as yup from 'yup';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const userStore = useUserStore();
  const errorMessage = ref('');

  const schema = yup.object({
    login: yup.string().required('Логин обязательно').min(3, 'Логин должен быть не менее 3 символов'),
    password: yup.string().required('Пароль обязательно').min(6, 'Пароль должен быть не менее 6 символов'),
    confirmedPassword: yup.string().required('Повтор пароля обязательно').oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
  })

  const handleSubmit =  async (formData) => {
    errorMessage.value = '';

    try {
      const data = await userStore.register(formData.login, formData.password);

      if (data?.error) {
        throw new Error(data?.error)
      }

      userStore.user = data.user
      router.push('/')

    } catch (error) {
      errorMessage.value = error
    }
  }

</script>

<template>
  <div class="py-8">
    <h1 class="text-2xl font-bold text-center my-4">Регистрация</h1>
    <Form class="bg-white w-full max-w-sm mx-auto p-6 rounded-md shadow-md" :validation-schema="schema" @submit="handleSubmit">
      <div class="mb-4">
        <LabelBase for="login">Логин</LabelBase>
        <InputBase type="text" name="login" id="login"  />
        <InputErrorBase name="login" />
      </div>
      <div class="mb-4">
        <LabelBase for="password">Пароль</LabelBase>
        <InputBase type="password" name="password" id="password"  />
        <InputErrorBase name="password" />
      </div>
      <div class="mb-4">
        <LabelBase for="confirmedPassword">Повтор пароля</LabelBase>
        <InputBase type="password" name="confirmedPassword" id="confirmedPassword"  />
        <InputErrorBase name="confirmedPassword" />
      </div>
      <buttonBase type="submit" class="w-full" >Зарегистрироваться</buttonBase>
      <MassegeBox type="error">{{ errorMessage }}</MassegeBox>
    </Form>
  </div>
</template>
