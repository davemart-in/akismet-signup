"use strict";

AKSMT.Signup = function () {
  // ----------------------------------------------------------
  // VARIABLES
  // ----------------------------------------------------------

  // ----------------------------------------------------------
  // PRIVATE FUNCTIONS
  // ----------------------------------------------------------
  function init() {
    domUpdate();
    eventsInit();
  }

  /* DOM UPDATE ----------------------------------------------- */
  function domUpdate() {
    // Take current cached selected options and update the DOM
    var use = AKSMT.data.selected.use,
        plan = AKSMT.data.selected.plan,
        pay = AKSMT.data.selected.pay,
        current = AKSMT.data.pricing[use][pay][plan],
        suffix = (pay === 'yearly') ? '/yr' : '/mo';
    // Update duration
    $('#duration').val(current.duration);
    // Update plan
    $('#plan_qty').val(current.plan);
    // Update price
    $('.ab-signup_price').text(current.price);
    $('.ab-signup_suffix').text(suffix);
    // Update step (changes on free plan)
    $('#step').val(current.step);
    // Make sure button selections are up to date
    $('.ab-signup_sites button').removeClass('is-selected');
    $('.ab-signup_sites button[data-sites="'+ plan +'"]').addClass('is-selected');
    $('.ab-signup_pay button').removeClass('is-selected');
    $('.ab-signup_pay button[data-cycle="'+ pay +'"]').addClass('is-selected');
    if (use === 'commercial') {
      $('.ab-signup_pwyw button').removeClass('is-selected');
      $('.ab-signup_pwyw button[data-amt="thirtysix"]').addClass('is-selected');
    }
  }

  /* EVENTS --------------------------------------------------- */
  function eventsInit() {
    eventsInitUse();
    eventsInitSites();
    eventsInitPay();
    eventsInitPwyw();
    eventsInitSubmit();
  }

  function eventsInitUse() {
    var useButtons = $('.ab-signup_use button');
    useButtons.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
          cache = AKSMT.data.selected,
          selected = $this.data('type'),
          sites = $('.ab-signup_sites'),
          pwyw = $('.ab-signup_pwyw'),
          pay = $('.ab-signup_pay'),
          payment = $('.ab-signup_payment'),
          personal = $('.ab-signup_personal'),
          features = $('.ab-signup_features'),
          unlimited = $('.ab-signup_unlimited');
      // Update selected option
      useButtons.removeClass('is-selected');
      $this.addClass('is-selected');
      // Updates based on selection
      if (selected === 'commercial') {
        // Show sites selector
        sites.show();
        // Hide PWYW selector
        pwyw.hide();
        // Show pay selector
        pay.show();
        // Show payment fields
        payment.slideDown();
        // Hide personal section
        personal.slideUp();
        // Save to local cache
        cache.use = 'commercial';
        cache.plan = 'one';
        cache.pay = 'yearly';
      } else {
        // Hide sites selector
        sites.hide();
        // Show PWYW selector
        pwyw.show();
        // Hide pay selector
        pay.hide();
        // Hide unlimited feature copy
        unlimited.hide();
        // Show personal section
        personal.slideDown();
        // Save to local cache
        cache.use = 'personal';
        cache.plan = 'thirtysix';
        cache.pay = 'yearly';
      }
      // Update DOM
      domUpdate();
    });
  }

  function eventsInitSites() {
    var sitesButtons = $('.ab-signup_sites button');
    sitesButtons.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
          cache = AKSMT.data.selected,
          sites = $this.data('sites'),
          unlimited = $('.ab-signup_unlimited');
      // Update selected option
      sitesButtons.removeClass('is-selected');
      $this.addClass('is-selected');
      // If 10 show unlimited feature description
      if (sites === 'ten') {
        unlimited.show();
      } else {
        unlimited.hide();
      }
      // Save to local cache
      cache.plan = sites;
      // Update DOM
      domUpdate();
    });
  }

  function eventsInitPay() {
    var payButtons = $('.ab-signup_pay button');
    payButtons.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
          cache = AKSMT.data.selected,
          cycle = $this.data('cycle');
      // Update selected option
      payButtons.removeClass('is-selected');
      $this.addClass('is-selected');
      // Save to local cache
      cache.pay = cycle;
      // Update DOM
      domUpdate();
    });
  }

  function eventsInitPwyw() {
    var pwywButtons = $('.ab-signup_pwyw button');
    pwywButtons.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
          cache = AKSMT.data.selected,
          amt = $this.data('amt'),
          payment = $('.ab-signup_payment');
      // Update selected option
      pwywButtons.removeClass('is-selected');
      $this.addClass('is-selected');
      // Make changes to DOM if this is free plan
      if (amt === 'zero') {
        // Hide payment fields
        payment.slideUp();
      } else {
        // Show payment fields
        payment.slideDown();
      }
      // Save to local cache
      cache.plan = amt;
      // Update DOM
      domUpdate();
    });
  }

  function eventsInitSubmit() {

  }

  // ----------------------------------------------------------
  // PUBLIC FACING METHODS
  // ----------------------------------------------------------
  return {
    init: function() {
      init();
    }
  };
} ();

// Kick things off
AKSMT.Signup.init();