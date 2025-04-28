<script setup>
const props = defineProps({
  heading: String,
  subHeading: String,
  alignment: String,
  hasAction: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="section-heading pt-5 my-4" :class="alignment">
    <div class="d-flex align-items-end justify-content-between mb-2">
      <div>
        <h2 v-html="heading"></h2>
        <p><em v-html="subHeading"></em></p>
      </div>
      
      <!-- Action slot for links or buttons -->
      <div v-if="$slots.action || hasAction" class="section-action">
        <slot name="action"></slot>
      </div>
    </div>
    
    <!-- Optional content slot -->
    <slot></slot>
  </div>
</template>