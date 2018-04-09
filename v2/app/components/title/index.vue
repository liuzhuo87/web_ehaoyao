<template>
  <div id="topNav">
    <div class="back">
      <div @click="back" v-if="showBack">
        <span class="icon-unfolded"></span>
      </div>
    </div>
    <h2 class="topText">{{text}}</h2>
    <div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopNav',
    props: ['text', 'showBack', 'inquiry'],
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>
