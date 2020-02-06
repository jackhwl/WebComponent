<template>
  <div id="app">珠峰培训</div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$api.vote.voteAdd();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
