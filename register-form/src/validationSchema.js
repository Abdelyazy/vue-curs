import * as yup from 'yup'

export const schema = yup.object({
  firstname: yup.string().required('Имя обязательно для заполнения'),
  lastname: yup.string().required('Фамилия обязательно для заполнения'),
  country: yup.string().required('Страна/регион обязательно для заполнения'),
  city: yup.string().required('Город обязательно для заполнения'),
  phone: yup.string().matches(/^(\+7|8)[0-9]{10}$/, 'Неверный формат телефона').required('Телефон обязательно для заполнения'),
  email: yup.string().email().required('Email обязательно для заполнения'),
  password: yup.string().min(6).required('Пароль обязательно для заполнения'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароль не совпадают').required('Подтвердите пароль обязательно для заполнения'),
  terms: yup.boolean().oneOf([true], 'Согласие обязательно')
})
