<template lang="pug">
  .simple-spinner
</template>

<style lang="sass">
  $size: 50px

  .simple-spinner
    width: $size
    height: $size
    border: 6px solid black
    border-right-color: transparent
    border-radius: 100%
    animation: simple-spinner 0.8s infinite linear

  @keyframes simple-spinner
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>
