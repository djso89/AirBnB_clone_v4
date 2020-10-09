const $ = window.$;
$(function () {
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

  $.getJSON('http://0.0.0.0:5001/api/v1/places_search', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (const place of Object.values(data)) {
        $('section.places').append('<article>' + '<div class="title">' + `<h2>${place.name}</h2>` + `<div class='price_by_night'>$${place.price_by_night}</div>` + '</div>' + '<div class=\'information\'>' + `<div class='max_guest'>${place.max_guest} Guests</div>` + `<div class='number_rooms'>${place.number_rooms} Bedrooms</div>` + `<div class='number_bathrooms'>${place.number_bathrooms} Bathrooms</div>` + '</div>' + `<div class='description'>${place.description}</div>` + '</article>');
      }
    }
  });
});
