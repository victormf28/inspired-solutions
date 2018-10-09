import * as moment from 'moment';
import Vue from 'vue';

moment.locale('es')

moment.updateLocale('es', {
  monthsShort: [
    "Ene", "Feb", "Mzo", "Abr", "May", "Jun",
    "Jul", "Ago", "Set", "Oct", "Nov", "Dic"
  ]
})

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(value).format('DD/MM/YY')
  }
})

Vue.filter('formatDateByMonth', (value) => {
  if (value) {
    return moment(value).format('DD MMM YY')
  }
})
Vue.filter('formatDateByDayMonth', (value) => {
  if (value) {
    return moment(value).format('DD MMMM')
  }
})
Vue.filter('formatDateByHours', (value) => {
  if (value) {
    return moment(value).format('DD/MM/YY hh:mm') + ' hrs'
  }
})

Vue.filter('capitalize', (value) => {
  if (!value && value !== 0) return ''
  value = value.toString().toLowerCase()
  return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('current', (price, symbol) => {
  let current = ''
  if (price === 0 || !price) return 0
  current = (symbol) ? `${symbol} ` : ``
  return `${current}${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
})

export default {}
