var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";
var thumbnails = [];
var displayedIndex = 0;

function setDetails(imgUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imgUrl);


  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";

  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function go_Left(thumbnail) {
  var next_index = (thumbnails.indexOf(thumbnail) - 1);
  if (next_index < 0)
    next_index += (thumbnails.length - 2);
  else
    next_index %= (thumbnails.length - 2);

  setDetailsFromThumb(thumbnails[next_index]);
  displayedIndex = next_index;
}

function go_Right(thumbnail) {
  var next_index = (thumbnails.indexOf(thumbnail) + 1) % (thumbnails.length - 2);
  setDetailsFromThumb(thumbnails[next_index]);
  displayedIndex = next_index;
}

function addThumbClickHandler(thumb) {
  "use strict";

  thumb.addEventListener("click", function(event) {
    event.preventDefault();

    if (thumb.getAttribute("data-value") == "left")
      go_Left(thumbnails[displayedIndex]);
    else if (thumb.getAttribute("data-value") == "right")
      go_Right(thumbnails[displayedIndex]);

    else {
      setDetailsFromThumb(thumb);
      displayedIndex = thumbnails.indexOf(thumb);
    }
  });
}



function getThumbnailsArray() {
  "use strict";
  var thumbnails_obj = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails_obj);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();
