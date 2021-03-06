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
        return;
      }
      
      self.control = control;
      self.originalCss = {
        position: self.element.css('position'),
        left: self.element.css('left')
      }
      
      self.element.after(control).css({
        position: 'absolute',
        left: -90000
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
        control.toggleClass('ui-radioButton-focus', event.type === 'focus');
        // Don't do this in IE, it's a little usability gaff
        // for keyboard navigation, but it's better overall.
        if (event.type === 'focus' && !$.browser.msie) {
          clearSelected(this.name);
        }
      });

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

  function clearSelected(name) {
    $(".ui-radioButton[data-radioSet='" + name + "']").removeClass(checkedClass);
  }
  function checkIt() {
    clearSelected($(this).data('radioSet'));
    $(this).addClass(checkedClass);
  }
}(jQuery));