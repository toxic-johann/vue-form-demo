<template>
  <input class="form-control" :type="item.type" :placeholder="item.placeholder">
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  
}
</script>

<style>
</style>
