export default {
  log() {
    window['log'] = (...args) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log.apply(console, args)
      }
    }
  }
}
