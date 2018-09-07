/* eslint-disable no-undef */

$('form').submit(() => {
  const leftUsername = $('form input[name="username-left"]').val()
  const rightUsername = $('form input[name="username-right"]').val()

  fetch(`${USERS_URL}?username=${leftUsername}&username=${rightUsername}`)
    .then(response => response.json())
    .then(profiles => {
      postProfile(profiles[0], 'left')
      postProfile(profiles[1], 'right')
      $('.duel-container').removeClass('hide')
    })

  return false
})

const postProfile = (profile, side) => {
  for (let prop in profile) {
    $(`.${side} span.${prop}`).removeClass('hide')
    if (profile[prop] === null) {
      $(`.${side} span.${prop}`).addClass('hide')
    }

    $(`.${side} span.${prop}`).text(profile[prop])
  }

  $(`.${side} img.avatar`).attr('src', profile['avatar'])
}

/*
  TODO
  Fetch 2 user's github data and display their profiles side by side
  If there is an error in finding user or both users, display appropriate error
  message stating which user(s) doesn't exist

  It is up to the student to choose how to determine a 'winner'
  and displaying their profile/stats comparison in a way that signifies who won.
 */
