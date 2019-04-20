const formRulesMixin = {
  data: () => ({
    valid: false,
    nameRule: [
      v => !!v || 'El nombre es requerido.',
      v => (v && v.length >= 5) || 'El nombre debe de tener mas de 5 caracteres.',
      v => (v && v.length <= 50) || 'El nombre debe de tener mmenos de 5 caracteres.'
    ],
    emailRule: [
      v => !!v || 'El e-mail es requerido.',
      v => /.+@.+/.test(v) || 'El e-mail debe de ser valido.'
    ],
    requiredRule: [
      value => !!value || 'Es requerido.'
    ],
    titleRules: [
      v => !!v || 'Title is required',
      v => (v && v.length >= 5) || 'Title must be more than 5 characters',
      v => (v && v.length <= 50) || 'Title must be less than 50 characters'
    ],
    descriptionRules: [
      v => !!v || 'Description is required',
      v => (v && v.length >= 5) || 'Description must be more than 5 characters',
      v => (v && v.length <= 1000) || 'Description must be less than 50 characters'
    ],
    fragmentRules: [
      v => !!v || 'Description is required',
      v => (v && v.length >= 5) || 'Description must be more than 5 characters',
      v => (v && v.length <= 80) || 'Description must be less than 50 characters'
    ]
  })
}

export default formRulesMixin
