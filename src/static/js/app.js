var app = new Vue({
  el: "#app",
  data: {
    name_state: null,
    name: null,
    data: [],
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const _this = this;
      fetch("/items")
        .then((data) => data.json())
        .then((items) => {
          if (items.code) _this.data = items.data;
        });
    },
    onSubmit(event) {
      event.preventDefault();
      const _this = this;

      let name = _this.name;

      if (!name) _this.name_state = false;
      else {
        fetch("/items", {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => {
            _this.name = null;
            if (res.code) _this.getData();
          });
      }
    },
  },
});
