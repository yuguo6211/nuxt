<template lang="pug">
  div.home-box
    div.row.row-cards
      div.col-12
        h4.text-center 车间总览
      div.col-6.col-sm-4.col-lg-3
        div.card
          div.card-body.p-3.text-center
            div.text-right
              i.fe.fe-chevron-down.white
            div.h1.m-0 {{overviewInfo.total_order_amount || 0}}
            div.text-muted.mb-4 订单数
            div.progress.progress-sm.null-data
      div.col-6.col-sm-4.col-lg-3
        div.card
          div.card-body.p-3.text-center
            div.text-right
              i.fe.fe-chevron-down.white
            div.h1.m-0 {{overviewInfo.produce_order_amount || 0}}
            div.text-muted.mb-4 生产单数(已投产)
            div.progress.progress-sm.null-data
      div.col-6.col-sm-4.col-lg-3
        div.card
          div.card-body.p-3.text-center
            div.text-right
              i.fe.fe-chevron-down.white
            div.h1.m-0 {{overviewInfo.complete_order_amount || 0}}
            div.text-muted.mb-4 加工完成数
            div.progress.progress-sm.null-data
      div.col-6.col-sm-4.col-lg-3
        div.card
          div.card-body.p-3.text-center
            div.text-right
              i.fe.fe-chevron-down.white
            div.h1.m-0 {{isNaN(overviewInfo.pass_rate) ? 0 : overviewInfo.pass_rate}}%
            div.text-muted.mb-4 完成率
            div.progress.progress-sm
              div.progress-bar.bg-red(v-bind:style="'width: ' + (overviewInfo.pass_rate / 100) + '%'")
    div.card
      div.table-responsive
        table.table.card-table.table-striped.table-vcenter
          thead
            tr
              th 序号
              th 工段
              th 今日计划数
              th 已完成数
              th 未完成数
              th.text-center 完成率
              th.text-center 合格率
          tbody
            tr(v-for="(item, index) in overviews")
              td {{index+1}}
              td {{item.name}}
              td {{(item.daily_works || {}).plan_orders || '暂无'}}
              td {{(item.daily_works || {}).finished_orders || '暂无'}}
              td 
                span.un-box
                  | {{((item.daily_works || {}).plan_orders || 0) - ((item.daily_works || {}).finished_orders || 0)}} 
                  span.fe.fe-info(title="未完成详情")
                    router-link(:to="{path: 'product/order?id=' + item.id}")
              td.text-center
                div.mx-auto.chart-circle.chart-circle-xs(v-bind:data-value="item.completion/100" data-thickness="3" data-color="blue")
                  div.chart-circle-value {{parseInt((((item.daily_works || {}).finished_orders || 0) / ((item.daily_works || {}).plan_orders || 0)) * 100)}}%
              td.text-center
                div.mx-auto.chart-circle.chart-circle-xs.sub-chart-cicle(v-bind:data-value="item.passpercent/100" data-thickness="3" data-color="blue")
                  div.chart-circle-value {{parseInt(((((item.daily_works || {}).finished_orders || 0) - ((item.daily_works || {}).rework_orders || 0)) /  ((item.daily_works || {}).finished_orders || 0))*100)}}%
        p(style="text-align: center" v-show="(overviews.length == 0) && (loadingState == false)") 暂无数据
        div(v-if="loadingState")
          vueloading   
</template>
<script>
  let model
  let _ = require('underscore')
  import axios from '~/plugins/axios'
  export default {
    head () {
      return {
        title: '首页'
      }
    },
    layout: 'layout',
    data () {
      return {
        loadingState: true,
        overviewInfo: {},  //  总览信息
        overviews: [],  //  总览列表
        searchObj: {}  //  搜索对象
      }
    },
    methods: {
      init: function () {
        model.loadingState = false
      }
    },
    mounted () {
      model = this
      model.init()
    }
  }
</script>
<style lang="scss" scoped>
  .null-data {
    background-color: #fff;
    box-shadow: none;
  }
  .un-box {
    span{
      position: relative;
      left: 6px;
      top: 3px;
      font-size: 20px;
      color: #f1c40f;
      cursor: pointer;
      a{
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 20px;
        height: 20px;
      }
    }
  }
</style>