<template>
    <div class="info-window">
      <div class="info-window-title">Driver location:</div>
      <div class="info-window-text">{{locationName}}</div>
      <div class="info-window-title">Driver name:</div>
      <div class="info-window-text">{{driverName}}</div>
    </div>
</template>

<script>
export default {
  name: 'MapInfoWindow',
  props: {
    locationName: {
      type: String,
      required: true
    },
    driverName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-window {
    &-title {
      color: #1F80BB;
      font-weight: 500;
      margin-bottom: 3px;
    }
    &-text {
      color: #ED7C38;
    }
  }
</style>
