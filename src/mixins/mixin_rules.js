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
    ]
  })
}

export default formRulesMixin
