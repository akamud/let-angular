'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function () {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function () {

    beforeEach(function () {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function () {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

    it('should sum up the rows vertically', function () {
      var enabledFields = element.all(by.css('input')).filter(function (el) {
        return el.isEnabled();
      });
      enabledFields.clear();

      var value = 1;
      enabledFields.map(function (el) {
        el.sendKeys(value.toString());
        value++;
      });

      var linhaTotal = element.all(by.tagName('tr')).last();
      expect(linhaTotal.all(by.tagName('input')).first().getAttribute('value')).toBe('16');
      expect(linhaTotal.all(by.tagName('input')).last().getAttribute('value')).toBe('20');
    });

    it('should sum up the rows horizontally', function () {
      var enabledFields = element.all(by.css('input')).filter(function (el) {
        return el.isEnabled();
      });
      enabledFields.clear();

      var value = 1;
      enabledFields.map(function (el) {
        el.sendKeys(value.toString());
        value++;
      });
      var results = ['3', '7', '11', '15'];

      element.all(by.tagName('tr')).each(function (el, index) {
        var cols = el.all(by.tagName('input'));
        cols.count().then(function(n){
          if (n == 3)
          {
            expect(cols.get(2).getAttribute('value')).toBe(results[index - 1]);
          }
        });
      });
    });

  });
});
