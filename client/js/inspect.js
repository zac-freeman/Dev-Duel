/* eslint-disable no-undef */

// TODO: figure out why this doesnt work
// import { postProfile } from '../service/postProfile'

$('form').submit(() => {
  const username = $('form input').val()

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(profile => {
      postProfile(profile)
      $('.user-results').removeClass('hide') // Display '.user-results' element
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
      /*
        TODO
        If there is an error finding the user, instead toggle the display of the '.user-error' element
        and populate it's inner span '.error' element with an appropriate error message
      */
    })

  return false // return false to prevent default form submission
})

// TODO: seperate titles array elements with spaces
const postProfile = profile => {
  for (let prop in profile) {
    $(`span.${prop}`).removeClass('hide')
    if (profile[prop] === null) {
      $(`span.${prop}`).addClass('hide')
    }

    $(`span.${prop}`).text(profile[prop])
  }

  $(`img.avatar`).attr('src', profile['avatar'])
}
