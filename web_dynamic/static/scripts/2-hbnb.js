const $ = window.$;

$(document).ready(function () {
  const amendict = {};

  $('div.amenities li input').change(
    function () {
      if ($(this).is(':checked')) {
        amendict[($(this).attr('data-id'))] = $(this).attr('data-name');
      } else {
        delete amendict[($(this).attr('data-id'))];
      }
      if (Object.values(amendict).length > 0) {
        $('.amenities h4').text(Object.values(amendict).join(', '));
      } else {
        $('.amenities h4').html('&nbsp');
      }
    });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, stat) {
  if (stat === 'success') {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }
});
