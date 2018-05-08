<template>
  <div id="globalLoading" v-if="loadingShow">
    <div class="cont">
      <div class="loading">
        <img src="../images/loading.svg" style="width:1rem;height:1rem;" />
      </div>
    </div>

  </div>
</template>

<script>
    import $ from 'jquery'
    import {mapState} from 'vuex'

  export default {
    name: 'GlobalLoading',
    components: {},
    computed: {
        ...mapState(['options', 'optionType', 'showPicker']),
      loadingShow () {
        return this.$store.state.globalLoading
      }
    }
  }
</script>
