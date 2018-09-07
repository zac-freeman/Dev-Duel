/* eslint-disable no-undef */

$('form').submit(() => {
  const leftUsername = $('form input[name="username-left"]').val()
  const rightUsername = $('form input[name="username-right"]').val()

  // fetch(`${USER_URL}?username=${usernames[0]}&username=${usernames[1]}`)
  //   .then(response => response.json())
  //   .then(profiles => {
  //     profiles.map(profile => postProfile(profile))
  //     $('.duel-container').removeClass('hide')
  //   })
})

/*
  TODO
  Fetch 2 user's github data and display their profiles side by side
  If there is an error in finding user or both users, display appropriate error
  message stating which user(s) doesn't exist

  It is up to the student to choose how to determine a 'winner'
  and displaying their profile/stats comparison in a way that signifies who won.
 */
