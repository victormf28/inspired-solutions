import Vue from 'vue'
import Element from './element.conf.js'
import Filters from './../common/filters'
import IconSvg from './../components/global/IconSvg.vue'

export default {
  loadIcons () {
    Vue.component('IconSvg', IconSvg)
  },
  loadFilters () {
    Filters
  },
  loadElement () {
    Element
  }
}
