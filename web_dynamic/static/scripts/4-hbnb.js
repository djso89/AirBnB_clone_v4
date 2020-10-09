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

  $.get('http://localhost:5001/api/v1/status/', function (data, stat) {
    if (stat === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (const place of data) {
        $('section.places').append('<article>' + '<div class="title">' + `<h2>${place.name}</h2>` + `<div class='price_by_night'>$${place.price_by_night}</div>` + '</div>' + '<div class=\'information\'>' + `<div class='max_guest'>${place.max_guest} Guests</div>` + `<div class='number_rooms'>${place.number_rooms} Bedrooms</div>` + `<div class='number_bathrooms'>${place.number_bathrooms} Bathrooms</div>` + '</div>' + `<div class='description'>${place.description}</div>` + '</article>');
      }
    }
  });

  $('button').click(function () {
    console.log('clicked');
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.keys(amendict)
      }),
      success: function (data) {
        $('article').remove();
        for (const place of Object.values(data)) {
          console.log(place);
          $('section.places').append('<article>' + '<div class="title">' + `<h2>${place.name}</h2>` + `<div class='price_by_night'>$${place.price_by_night}</div>` + '</div>' + '<div class=\'information\'>' + `<div class='max_guest'>${place.max_guest} Guests</div>` + `<div class='number_rooms'>${place.number_rooms} Bedrooms</div>` + `<div class='number_bathrooms'>${place.number_bathrooms} Bathrooms</div>` + '</div>' + `<div class='description'>${place.description}</div>` + '</article>');
        }
      }
    });
  });
});
