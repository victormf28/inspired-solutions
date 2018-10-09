export default {
  methods: {
    onKeydownOnlyDigits(e, input) {
      if (this.isAllowedKey(e.which) && /[^0-9]/g.test(e.key)) {
        e.preventDefault();
      }
    },
    // Permite que se puedan utilizar las flechas, inicio, fin y suprimir
    isAllowedKey(keyWhich) {
      return keyWhich != 8 && keyWhich != 46 && keyWhich != 35 && keyWhich != 36 && keyWhich != 37 && keyWhich != 39 && keyWhich != 9;
    }
  }
}