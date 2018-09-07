/* eslint-disable no-undef */

$('form').submit(() => {
  const username = $('form input').val()

  // Fetch data for given user
  // (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  fetch(`${USER_URL}/${username}`)
    .then(response => {
      if (response.status === 404 || response.status === 400) {
        $('.user-results').removeClass('hide')
        $('.user-results').addClass('hide')
        $('.user-error').removeClass('hide')
      } else {
        $('.user-error').removeClass('hide')
        $('.user-error').addClass('hide')
        $('.user-results').removeClass('hide')
      }
      return response
    })
    .then(response => response.json()) // Returns parsed json data from response body as promise
    .then(profile => {
      postProfile(profile)
    })
    .catch(err => {
      console.log(`Error getting data for ${username}`)
      console.log(err)
    })

  return false // return false to prevent default form submission
})

const postProfile = profile => {
  for (let prop in profile) {
    $(`span.${prop}`).removeClass('hide')
    if (profile[prop] === null) {
      $(`span.${prop}`).addClass('hide')
    }

    $(`span.${prop}`).text(profile[prop])
  }

  $(`img.avatar-url`).attr('src', profile['avatar-url'])
}
