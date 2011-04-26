/*! customRadio: a jQuery UI widget to pretty up radio inputs
    http://github.com/rixth/customRadio
*/

/*jshint browser: true, jquery: true, indent: 2, white: true, curly: true, forin: true, noarg: true, immed: true, newcap: true, noempty: true */

(function ($) {
  var checkedClass = 'ui-radioButton-checked',
      disabledClass = 'ui-radioButton-disabled';

  $.widget("ui.customRadio", {
    _create: function () {
      var self = this,
          input = self.element[0],
          control = $('<div class="ui-radioButton"></div>').attr('data-radioSet', input.name),
          disabled = false;
      
      if (input.type !== 'radio') {
        throw new TypeError("customRadio only works on radio elements");
      }
      
      self.control = control;
      self.originalCss = {
        position: self.element.css('position'),
        left: self.element.css('left')
      }
      
      self.element.after(control).css({
        // position: 'absolute',
        // left: -90000
      });

      control.click(function () {
        if (!disabled) {
          checkIt.call(this);
          $(input).attr('checked', true).change();
        }
      });

      $(input).bind('customradiodisabled customradioenabled', function (event) {
        disabled = (event.type === 'customradiodisabled');
        control.toggleClass(disabledClass, disabled);
      }).bind('focus blur', function (event) {
        control.toggleClass('ui-radioButton-focus', event.type === 'focus')
      })

      $(document).delegate("input[name='" + input.name + "']", 'change blur', function (event) {
        var target = event.target;
        if (target.checked && target === input) {
          checkIt.call(control);
        }
      });

      self._setOption('disabled', input.disabled);
      control.toggleClass(checkedClass, input.checked);
    },
    _setOption: function (name, value) {
      if (name === 'disabled') {
        this._trigger((value ? 'dis' : 'en') + 'abled');
      }
    },
    destroy: function () {
      var self = this;
      $.Widget.prototype.destroy.apply(self, arguments);
      self.control.remove();
      self.element.css(self.originalCss);
    }
  });

  function checkIt() {
    $(".ui-radioButton[data-radioSet='" + $(this).data('radioSet') + "']").removeClass(checkedClass);
    $(this).addClass(checkedClass);
  }
}(jQuery));