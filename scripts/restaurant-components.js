/**
 * Compiles restaurant data from firestore into a suitable object.
 * @param {Object} doc 
 * @returns parsable restaurant object
 */
const compileRestaurantData = (doc) => {
  RESTAURANT_ID = doc.id;

  let id = doc.id;
  let name = doc.data().name;
  let description = doc.data().description;
  let avgRating = doc.data().average_rating;
  let avgCost = doc.data().average_cost;
  let address = doc.data().address;
  let postal_code = doc.data().postal_code;
  let city = doc.data().city;
  let province = doc.data().province;
  let phone_number = doc.data().phone_number;
  let url = doc.data().website_url;

  let isDineInAvailable = doc.data().isDineInAvailable;
  let isTakeoutAvailable = doc.data().isTakeoutAvailable;
  let isDeliveryAvailable = doc.data().isDeliveryAvailable;

  let isMaskRequired = doc.data().isMaskRequired;
  let isReducedSeatings = doc.data().isReducedSeatings;
  let isDistancedTables = doc.data().isDistancedTables;
  let isSanitizingAvailable = doc.data().isSanitizingAvailable;

  let avgThumbs = doc.data().average_thumbs;
  avgThumbs = avgThumbs * 100;

  let image = doc.data().image;

  // Replace restaurant placeholder image once actual image has been downloaded
  let pathReference = firebase.storage().ref(image);
  pathReference.getDownloadURL().then(function (url) {
      $(`#${id}-restImage`).attr("src", url);
  })

  return {
      id,
      name,
      description,
      avgRating,
      avgCost,
      address,
      postal_code,
      city,
      province,
      phone_number,
      url,
      isDineInAvailable,
      isTakeoutAvailable,
      isDeliveryAvailable,
      isMaskRequired,
      isReducedSeatings,
      isDistancedTables,
      isSanitizingAvailable,
      avgThumbs
  };
}

/**
 * Displays the lists of safety protocols of a restaurant if it exists
 * @param   {Array} safetyProtocolList The boolean array of safety protocols
 * @return  {HTMLElement}              The HTML element of the lists of safety protocols (or return empty string)
 */
const displaySafetyProtocolsAsList = (safetyProtocolList) => {
    let {
      isMaskRequired,
      isReducedSeatings,
      isDistancedTables,
      isSanitizingAvailable
    } = safetyProtocolList;
    // let safetyProtocols = $("<div class='restaurant__feature-group'></div>");
    let safetyProtocols = $("<div></div>");
  
    if (!Object.values(safetyProtocolList).includes(true)) {
      return "";
    }
  
    if (isMaskRequired) {
      safetyProtocols.append(`
        <div class="restaurant__feature--safety" style="color: #3AAFA9">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
          </svg>
          <p class="card-text">Mask Required</p>
        </div>
      `);
    }
  
    if (isReducedSeatings) {
      safetyProtocols.append(`
        <div class="restaurant__feature--safety" style="color: #3AAFA9">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
          </svg>
          <p class="card-text">Reduced Seatings</p>
        </div>
      `);
    }
  
    if (isDistancedTables) {
      safetyProtocols.append(`
        <div class="restaurant__feature--safety" style="color: #3AAFA9">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
          </svg>
          <p class="card-text">Distanced Tables</p>
        </div>
      `);
    }
  
    if (isSanitizingAvailable) {
      safetyProtocols.append(`
        <div class="restaurant__feature--safety" style="color: #3AAFA9">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
          </svg>
          <p class="card-text">Sanitzing Stations Available</p>
        </div>
      `);
    }
    
    // return safetyProtocols[0].outerHTML;
    return safetyProtocols[0].innerHTML;  
}

/**
 * Displays the lists of features of a restaurant if it exists.
 * @param   {Array} featureList The boolean array of features
 * @return  {HTMLElement}       The HTML element of the lists of features (or return empty string)
 */
const displayFeaturesAsList = (featureList) => {
    let {
      isDineInAvailable,
      isTakeoutAvailable,
      isDeliveryAvailable
    } = featureList;
    // let features = $("<div class='restaurant__feature-group'></div>");
    let features = $("<div></div>");
  
    if (!Object.values(featureList).includes(true)) {
      return "";
    }
  
    if (isDineInAvailable) {
      features.append(`
              <div class="restaurant__feature--other">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                  </svg>
                  <p class="card-text">Dine-in Available</p>
              </div>
          `);
    }
  
    if (isTakeoutAvailable) {
      features.append(`
              <div class="restaurant__feature--other">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                  </svg>
                  <p class="card-text">Takeout Available</p>
              </div>
          `);
    }
  
    if (isDeliveryAvailable) {
      features.append(`
              <div class="restaurant__feature--other">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                  </svg>
                  <p class="card-text">Delivery Available</p>
              </div>
          `);
    }
  
    return features[0].innerHTML;
}

/**
 * Adds restaurant phone number as an action if phone is available, else make it disabled
 * @param {String} phoneNumber restaurant's phone number
 */
const displayPhoneAction = (phoneNumber) => {
  if (!phoneNumber) {
      return `
          <div class="restaurant__action isDisabled">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-telephone" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <p class="card-text action__text">Call</p>
          </div>
      `;
  } else {
      return `
          <a class="restaurant__action" href="tel:${phoneNumber}">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-telephone" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              </svg>
              <p class="card-text action__text">Call</p>
          </a>
      `;
  }
}

/**
 * Adds restaurant address as an action if address is available, else make it disabled
 * @param {String} address      The address of the restaurant
 * @param {String} postal_code  The postal code of the restaurant
 * @param {String} city         The city restaurant is located in
 * @param {String} province     The province restaurant is located in
 */
const displayGoogleMapAction = (address, postal_code, city, province) => {
  let formattedAddress = "";

  if (address) {
      formattedAddress += (address + "+");
  }

  if (city) {
      formattedAddress += (city + "+");
  }

  if (province) {
      formattedAddress += (", " + province);
  }

  if (postal_code) {
      formattedAddress += (postal_code + ", Canada");
  }

  if (!formattedAddress) {
      return `
          <div class="restaurant__action isDisabled">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-map" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98l4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
              </svg>
              <p class="card-text action__text">Directions</p>
          </div>
      `;
  } else {
      return `
          <a class="restaurant__action" href="https://www.google.com/maps?q=${formattedAddress}">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-map" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98l4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
              </svg>
              <p class="card-text action__text">Directions</p>
          </a>
      `;
  }
}

/**
 * Adds restaurant URL as an action if URL is available, else make it disabled
 * @param {String} url 
 */
const displayWebsite = (url) => {
  if (!url) {
    return `
        <a class="restaurant__action restaurant__website isDisabled">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-globe2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539a8.372 8.372 0 0 1-1.198-.49 7.01 7.01 0 0 1 2.276-1.52 6.7 6.7 0 0 0-.597.932 8.854 8.854 0 0 0-.48 1.079zM3.509 7.5H1.017A6.964 6.964 0 0 1 2.38 3.825c.47.258.995.482 1.565.667A13.4 13.4 0 0 0 3.508 7.5zm1.4-2.741c.808.187 1.681.301 2.591.332V7.5H4.51c.035-.987.176-1.914.399-2.741zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5H7.5v2.409c-.91.03-1.783.145-2.591.332a12.343 12.343 0 0 1-.4-2.741zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696A12.63 12.63 0 0 1 7.5 11.91v3.014c-.67-.204-1.335-.82-1.887-1.855a7.776 7.776 0 0 1-.395-.872zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964a9.083 9.083 0 0 0-1.565.667A6.963 6.963 0 0 1 1.018 8.5h2.49a13.36 13.36 0 0 0 .437 3.008zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909c.81.03 1.577.13 2.282.287-.12.312-.252.604-.395.872-.552 1.035-1.218 1.65-1.887 1.855V11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5h-2.49a13.361 13.361 0 0 0-.437-3.008 9.123 9.123 0 0 0 1.565-.667A6.963 6.963 0 0 1 14.982 7.5zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343c-.705.157-1.473.257-2.282.287V1.077c.67.204 1.335.82 1.887 1.855.143.268.276.56.395.872z"/>
            </svg>
            <p class="card-text action__text">Website</p>
        </a>
    `;
  } else {
    return `
        <a class="restaurant__action restaurant__website" href="${url}">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-globe2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539a8.372 8.372 0 0 1-1.198-.49 7.01 7.01 0 0 1 2.276-1.52 6.7 6.7 0 0 0-.597.932 8.854 8.854 0 0 0-.48 1.079zM3.509 7.5H1.017A6.964 6.964 0 0 1 2.38 3.825c.47.258.995.482 1.565.667A13.4 13.4 0 0 0 3.508 7.5zm1.4-2.741c.808.187 1.681.301 2.591.332V7.5H4.51c.035-.987.176-1.914.399-2.741zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5H7.5v2.409c-.91.03-1.783.145-2.591.332a12.343 12.343 0 0 1-.4-2.741zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696A12.63 12.63 0 0 1 7.5 11.91v3.014c-.67-.204-1.335-.82-1.887-1.855a7.776 7.776 0 0 1-.395-.872zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964a9.083 9.083 0 0 0-1.565.667A6.963 6.963 0 0 1 1.018 8.5h2.49a13.36 13.36 0 0 0 .437 3.008zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909c.81.03 1.577.13 2.282.287-.12.312-.252.604-.395.872-.552 1.035-1.218 1.65-1.887 1.855V11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5h-2.49a13.361 13.361 0 0 0-.437-3.008 9.123 9.123 0 0 0 1.565-.667A6.963 6.963 0 0 1 14.982 7.5zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343c-.705.157-1.473.257-2.282.287V1.077c.67.204 1.335.82 1.887 1.855.143.268.276.56.395.872z"/>
            </svg>
            <p class="card-text action__text">Website</p>
        </a>
    `;
  }
}

/**
 * Display thumbs up or down depending of if the restaurant is Covid-Friendly or not
 * @param {Number} avgThumbs the average covid-friendly rating
 */
const displayThumbsMain = (avgThumbs) => {
  if (avgThumbs >= 50){
      return (`
          <div class="restaurant__covid-rating" data-toggle="tooltip" data-placement="top" title="Majority of users think this restaurant is COVID-friendly!">
              <i class="fa fa-thumbs-up selectedThumbs"></i>
              ${avgThumbs}%
          </div>
      `);
  } else {
      return (`
          <div class="restaurant__covid-rating" data-toggle="tooltip" data-placement="top" title="Majority of users think this restaurant is not COVID-friendly!">
              <i class="fa fa-thumbs-down selectedThumbs"></i>
              ${avgThumbs}%
          </div>
      `);
  }
}