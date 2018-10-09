export default {
  create(key, value, e) {
      let a = "";
      if (e) {
          let b = new Date();
          b.setTime(b.getTime() + (e * 24 * 60 * 60 * 1000));
          a = `; expires=${b.toUTCString()}`;
      } else {
          a = "";
      }

      document.cookie = key + "=" + value + a + "; path=/";
  },

  read(b) {
      let e = b + "=";
      let a = document.cookie.split(";");
      let d = 0;

      while (d < a.length) {
          let f = a[d];
          while (f.charAt(0) === " ") { f = f.substring(1, f.length); }
          if (f.indexOf(e) === 0) { return f.substring(e.length, f.length); }
          d++;
      }
      return null;
  },

  del(a) {
      this.create(a, "", -1);
  }
}