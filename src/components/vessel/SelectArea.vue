<template>
  <div class="select-area">
    <div v-for="(item, listIndex) in this.$store.state.options" :key="item.name">
      <p>{{item.name}}</p>
      <div v-for="(option, index) in item.list" :key="option.name">
        <BaseElement :keyPaths="[listIndex, index]" :item="option"/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'SelectArea',
}
</script>

<style>
.select-area {
  width: 40%;
  margin: 5%;
  display: inline-block;
  vertical-align: top;
}
</style>


