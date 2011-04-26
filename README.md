# jquery.customRadio

A simple jQuery UI widget to pretty up radio elements. There is a full suite of unit tests available in test/, written with Jasmine. You can see an example and run the tests on the [plugin's website](http://rixth.github.com/customRadio/).

Since it works by manipulating and reading the events right off your native radio inputs, it fully respects tabbing and keyboard navigation/selection of items. This also means you can call the standard jQuery val methods, bind to the change event, etc right on the native element.

It also respects the disabled attribute and works with labels.

All the display is powered by CSS, check out src/jquery.customRadio.css for ideas, and then customize to your heart's content.

## HTML structure required

    <input type="radio" name="gender" value="male"> Male<br>
    <input type="radio" name="gender" value="female"> Female<br>
    <input type="radio" name="gender" value="undisclosed"> Undisclosed<br>
    
And then...

    $('input[type=radio]').customRadio();


## Methods

* destroy: remove the pretty widget, unbind events and show the original radio
* disable: disable the widget, just like you would disable a radio button
* enable: allow interaction with the widget after disabling it

## Events

You should bind to the change event on the native input element.