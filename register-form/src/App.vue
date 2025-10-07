<script setup>
  import { onMounted, ref } from 'vue'
  import { Form, Field, ErrorMessage } from 'vee-validate'
  import { schema } from './validationSchema.js'
  import { db } from './firebase.js'
  import { collection, getDocs, addDoc } from 'firebase/firestore'

  const comments = ref('')
  const terms = ref(false)
  const success = ref(false)
  const cities = ref([])
  const citiesLoading = ref(true)
  const formLoading = ref(false)
  const errorMessage = ref('')

  const passwordFieldType = ref('password')
  const confirmPasswordFieldType = ref('password')

  function togglePasswordVisibility() {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
  }

  function toggleConfirmPasswordVisibility() {
    confirmPasswordFieldType.value = confirmPasswordFieldType.value === 'password' ? 'text' : 'password'
  }

  async function register(values) {
    formLoading.value = true
    errorMessage.value = ''
    success.value = false

    try {
      // Проверяем уникальность email
      const usersCollection = collection(db, 'users')
      const usersSnapshot = await getDocs(usersCollection)
      const existingUser = usersSnapshot.docs.find((doc) => doc.data().email === values.email)
      if (existingUser) {
        errorMessage.value = 'Пользователь с таким e-mail уже существует'
        return
      }

      // Собираем объект с только заполненными полями
      const newUser = {}
      if (values.firstname) newUser.firstname = values.firstname
      if (values.lastname) newUser.lastname = values.lastname
      if (values.country) newUser.country = values.country
      if (values.city) newUser.city = values.city
      if (values.phone) newUser.phone = values.phone
      if (values.email) newUser.email = values.email
      if (values.password) newUser.password = values.password
      if (values.confirmPassword) newUser.confirmPassword = values.confirmPassword
      if (comments.value) newUser.comments = comments.value
      if (terms.value) newUser.terms = terms.value

      // Добавляем в Firebase
      await addDoc(usersCollection, newUser)
      success.value = true
    } catch (error) {
      console.error('Error registering user:', error)
      errorMessage.value = 'Ошибка регистрации: ' + error.message
    } finally {
      formLoading.value = false
    }
  }

  function resetForm() {
    success.value = false
    errorMessage.value = ''
    comments.value = ''
    terms.value = false
  }

  const fetchCities = async () => {
    citiesLoading.value = true
    errorMessage.value = ''
    try {
      const citiesCollection = collection(db, 'cities')
      const citiesSnapshot = await getDocs(citiesCollection)
      const firebaseCities = citiesSnapshot.docs.map(doc => doc.data())
      if (firebaseCities.length > 0) {
        cities.value = firebaseCities
      } else {
        cities.value = []
      }
    } catch (error) {
      console.error('Error fetching cities from Firebase:', error)
      errorMessage.value = 'Ошибка загрузки городов: ' + error.message
      cities.value = []
    } finally {
      citiesLoading.value = false
    }
  }

  onMounted(() => {
    fetchCities()
  })
</script>

<template>
  <div v-if="citiesLoading || formLoading" class="overlay">Идет загрузка данных...</div>
  <div class="container">
      <h1 class="title">Регистрация</h1>
      <Form :validation-schema="schema" class="registration-form" @submit="register">
        <div class="form-group">
          <label class="form-label" for="firstname">Имя *</label>
          <Field class="form-control" name="firstname" type="text" id="firstname" required />
          <ErrorMessage class="message--error" name="firstname" />
        </div>
        <div class="form-group">
          <label class="form-label" for="lastname">Фамилия *</label>
          <Field class="form-control" name="lastname" type="text" id="lastname" required />
          <ErrorMessage class="message--error" name="lastname" />
        </div>
        <div class="form-group">
          <label class="form-label" for="country">Страна/Регион *</label>
          <Field class="form-control" name="country" type="text" id="country" required />
          <ErrorMessage class="message--error" name="country" />
        </div>
        <div class="form-group">
          <label class="form-label" for="city">Город *</label>
          <div class="custom-select">
            <Field  as="select" class="form-control" id="city" name="city" required>
              <option value="" disabled selected>Выберите город</option>
              <option v-for="city in cities" :key="city.value" :value="city.value">{{ city.value }}</option>
            </Field>
            <ErrorMessage class="message--error" name="city" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="phone">Телефон *</label>
          <Field class="form-control" type="tel" name="phone" id="phone" required />
          <ErrorMessage class="message--error" name="phone" />
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Email *</label>
          <Field class="form-control" type="email" name="email" id="email" required />
          <ErrorMessage class="message--error" name="email" />
        </div>
        <div class="form-group form-group--password">
          <label class="form-label" for="password">Пароль *</label>
          <Field class="form-control" :type="passwordFieldType" name="password" id="password" required />
          <ErrorMessage class="message--error" name="password" />
          <button class="btn-icon btn-icon--password" type="button" @click="togglePasswordVisibility">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M12 4.5C6.5 4.5 2 9 2 12s4.5 7.5 10 7.5S22 14.5 22 12s-4.5-7.5-10-7.5zm0 13c-3.1 0-5.5-2.4-5.5-5.5S8.9 7.5 12 7.5s5.5 2.4 5.5 5.5S15.1 17.5 12 17.5z"
              />
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2z" />
            </svg>
          </button>
        </div>
        <div class="form-group form-group--password">
          <label class="form-label" for="confirm-password">Подтвердите пароль *</label>
          <Field
            class="form-control"
            :type="confirmPasswordFieldType"
            name="confirmPassword"
            id="confirm-password"
            required
          />
          <ErrorMessage class="message--error" name="confirmPassword" />
          <button class="btn-icon btn-icon--password" type="button" @click="toggleConfirmPasswordVisibility">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M12 4.5C6.5 4.5 2 9 2 12s4.5 7.5 10 7.5S22 14.5 22 12s-4.5-7.5-10-7.5zm0 13c-3.1 0-5.5-2.4-5.5-5.5S8.9 7.5 12 7.5s5.5 2.4 5.5 5.5S15.1 17.5 12 17.5z"
              />
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2z" />
            </svg>
          </button>
        </div>
        <div class="form-group form-group--full-width">
          <label class="form-label" for="comments">Дополнительная информация</label>
          <Field as="textarea" v-model="comments" class="form-control" id="comments" name="comments"></Field>
        </div>
        <div class="form-group form-group--full-width">
          <label class="form-label form-label--checkbox" for="terms">
            <Field as="input" type="checkbox" v-model="terms" id="terms" name="terms" />
            Я согласен c условиями пользования и политикой конфиденциальности
          </label>
          <ErrorMessage class="message--error" name="terms" />
        </div>
        <button class="btn" type="submit" :disabled="formLoading">Зарегистрироваться</button>
        <button class="btn" type="button" @click="resetForm">Очистить форму</button>
      </Form>
      <div v-if="errorMessage" class="message message--error">{{ errorMessage }}</div>
      <div v-if="success" class="message message--success">Регистрация прошла успешно!</div>
    </div>
</template>

<style scoped>
  * {
  box-sizing: border-box;
}

body {
  font-family: 'Open Sans', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
  font-size: 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem;
  background-color: #fff;
}

.title {
  font-weight: 300;
  margin: 0 0 4rem;
}

.registration-form {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.form-group {
  flex-basis: calc(50% - 2rem);
  margin-bottom: 1rem;
  position: relative;
}

@media (max-width: 850px) {
  .form-group {
    flex-basis: 100%;
  }
}

.form-group--password {
  position: relative;
}

.form-group--full-width {
  flex-basis: 100%;
}

.form-label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.form-control {
  width: 100%;
  font-size: 1rem;
  padding: 1rem;
  background-color: #f6f6f6;
  border: 1px solid #f6f6f6;
  border-radius: 8px;
}

.custom-select {
  position: relative;
}

.custom-select::after {
  content: '';
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7 10l5 5 5-5z"/></svg>')
    no-repeat center;
  background-size: 30px;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.custom-select select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

textarea.form-control {
  height: 150px;
  resize: none;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
}

.btn-icon--password {
  position: absolute;
  right: 1rem;
  top: calc(1.2rem + 50%);
  transform: translateY(-50%);
}

.btn-icon--password svg {
  width: 30px;
  height: 30px;
}

.btn-icon--password:hover {
  opacity: 0.7;
}

.btn {
  background-color: #f6f6f6;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn:hover {
  opacity: 0.8;
}

.btn[type='submit'] {
  background-color: #8a33fd;
  color: white;
}

.form-label--checkbox {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}
.form-label--checkbox input {
  margin-right: 1rem;
}
.form-label--checkbox input[type='checkbox'] {
  width: 20px;
  height: 20px;
}
.form-label--checkbox input[type='checkbox']:checked {
  background-color: #8a33fd;
}

.form-label--checkbox input[type='checkbox']:checked:before {
  content: '';
  display: block;
  width: 20px;
  height: 20px;
  background-color: #8a33fd;
}

.message {
  margin: 0;
  font-size: 0.75rem;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: -1rem;
}

.message--success {
  color: #368039;
  position: static;
  font-size: 20px;
}

.message--error {
  color: #f44336;
}

</style>
