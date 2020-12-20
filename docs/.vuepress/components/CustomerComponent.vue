<template>
  <div class="customer-component" style="background: #2b3a42;">
    1
  </div>
</template>
<script>
export default {
  name: 'CustomerComponent',
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.list = [
      { id: 1, text: 'JavaScript', done: false },
      { id: 2, text: 'HTML', done: false },
      { id: 3, text: 'CSS', done: true },
      { id: 4, text: 'Vue.js', done: true },
      { id: 5, text: 'VuePress', done: true },
    ]
  },
}
</script>