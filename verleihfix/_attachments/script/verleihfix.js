(function() {
  var AppComponent = ng
    .Component({
      selector: 'verleihfix'
    })
    .View({
      templateUrl: 'verleihfix.html',
      styleUrls: ['style/verleihfix.css'],
      directives: [ng.NgFor]
    })
    .Class({
      constructor: function() {
        this.items = [];
        this.items.push({vendor: "Zoom", product: "H1"});
        this.items.push({vendor: "Zoom", product: "H2"});
        this.items.push({vendor: "Zoom", product: "H3"});
        this.items.push({vendor: "Zoom", product: "H4"});
        this.items.push({vendor: "Zoom", product: "H5"});
        this.items.push({vendor: "Zoom", product: "H6"});
        this.items.push({vendor: "Zoom", product: "H7"});
        this.items.push({vendor: "Zoom", product: "H8"});
        this.items.push({vendor: "Zoom", product: "H9"});
        this.items.push({vendor: "Zoom", product: "H10"});
      },
      rent: function() {
        this.items.forEach(function(item) {
          if (item.selected) console.log(item.product);
        });
      },
      toggleSelected: function(item) {
        item.selected = !item.selected;
      }
    });
  document.addEventListener('DOMContentLoaded', function() {
    ng.bootstrap(AppComponent);
  });
})();
