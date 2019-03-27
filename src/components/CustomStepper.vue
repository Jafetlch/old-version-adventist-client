<template>
  <v-stepper v-model="stepper" vertical>
    <v-stepper-step :complete="stepper > 1" step="1">
      Crear {{ title }}
      <small>...</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <slot name="step-one"></slot>
    </v-stepper-content>

    <template v-show="showSecondStepper">
      <v-stepper-step :complete="stepper > 2" step="2">
        Verificar {{ title }}
      </v-stepper-step>
      <v-stepper-content step="2">
        <slot name="step-two"></slot>
      </v-stepper-content>
    </template>
  </v-stepper>
</template>

<script>
export default {
  name: 'CustomStepper',
  props: {
    title: {
      type: String,
      default: ''
    },
    stepper: {
      type: Number,
      default: 1
    },
    showSecondStepper: {
      type: Boolean,
      default: false
    }
  }
}
</script>
