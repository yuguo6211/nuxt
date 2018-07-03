<template lang="pug">
  div.header.collapse.d-lg-flex.p-0
    div.container
      div.row.align-items-center
        div.col-lg.order-lg-first
          ul.nav.nav-tabs.border-0.flex-column.flex-lg-row(style="position: relative")
            li.nav-item
              nuxt-link.nav-link(v-bind:class="controller == 'home' ? 'active' : ''" to="/home")
                i.fe.fe-home 
                | 首页

</template>
<script>
  let model
  import axios from '~/plugins/axios'
  export default {
    data () {
      return {
        controller: '',
        subitem: ''
      }
    },
    watch: {
      '$route': function () {
        this.init()
      }
    },
    methods: {
      init: function () {
        model.controller = this.$route.path.split('/')[1]
        model.subitem = this.$route.path
      }, 
      //  发送退出登录请求
      loginout: function () {
        axios().get('/logout').then((msg) => {
          window.window.location = '/login'
        })
      }
    },
    mounted () {
      model = this
      model.init()
    }
  }
</script>
<style lang="sass" scoped>

</style>