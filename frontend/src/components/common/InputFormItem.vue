<template>
    <div class="mb-3">
      <label :for="id" class="form-label">{{ label }}</label>
<input
  :type="type"
  :placeholder="placeholder"
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
  :class="['form-control', { 'is-invalid': isWrong }]"
  :id="id"
/>

      <div v-if="isWrong" class="invalid-feedback">
        {{ wrongMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    name: 'InputFormItem',
    props: {
      label: String,
      type: String,
      placeholder: String,
      modelValue: String,
      isWrong: Boolean,
      wrongMessage: String,
    },
    setup(props, { emit }) {
      const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);
      return { id };
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if necessary */
  </style>
  