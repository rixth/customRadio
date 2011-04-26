/*! customRadio: a jQuery UI widget to pretty up radio inputs
    http://github.com/rixth/customRadio
*/

/*jshint browser: true, jquery: true, indent: 2, white: true, curly: true, forin: true, noarg: true, immed: true, newcap: true, noempty: true */

(function ($) {      
  $.widget("ui.customRadio", {
    _create: function () {
      var self = this;
      self.element.hide();
    },
    _setOption: function (name, value) {
      if (name === 'disabled') {
        this._trigger((value ? 'dis' : 'en') + 'abled');
      }
    },
    destroy: function () {
      $.Widget.prototype.destroy.apply(this, arguments);
      this.element.show();
    }
  });
}(jQuery));