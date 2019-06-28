const formRulesMixin = {
  data: () => ({
    valid: false,
    nameRule: [
      v => !!v || 'El nombre es requerido.',
      v => (v && v.length >= 5) || 'El nombre debe de tener mas de 5 caracteres.',
      v => (v && v.length <= 50) || 'El nombre debe de tener menos de 50 caracteres.'
    ],
    emailRule: [
      v => !!v || 'El e-mail es requerido.',
      v => /.+@.+/.test(v) || 'El e-mail debe de ser valido.'
    ],
    // emailConfirmationRules: [
    //   (v) => !!v || 'Confirmation E-mail is required',
    //   (v) => v === this.email || 'E-mail must match'
    // ],
    requiredRule: [
      value => !!value || 'El campo es requerido.'
    ],
    pwdRule: [
      value => !!value || 'El campo es requerido.',
      value => (value && value.length >= 5) || 'El campo debe de tener más de 5 caracteres.'
    ],
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length >= 5) || 'El titulo debe de tener mas de 5 caracteres.',
      v => (v && v.length <= 80) || 'El titulo debe de tener menos de 80 caracteres.'
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
      v => (v && v.length >= 5) || 'La descripción debe de tener mas de 5 caracteres.',
      v => (v && v.length <= 1000) || 'La descripción debe de tener menos de 1000 caracteres.'
    ],
    fragmentRules: [
      v => !!v || 'Description is required',
      v => (v && v.length >= 5) || 'El fragmento debe de tener mas de 5 caracteres.',
      v => (v && v.length <= 80) || 'La descripción debe de tener menos de 80 caracteres.'
    ]
  })
}

export default formRulesMixin
