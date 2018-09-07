/* eslint-disable no-undef */

$('form').submit(() => {
  const leftUsername = $('form input[name="username-left"]').val()
  const rightUsername = $('form input[name="username-right"]').val()

  fetch(`${USERS_URL}?username=${leftUsername}&username=${rightUsername}`)
    .then(response => response.json())
    .then(profiles => {
      postProfile(profiles[0], 'left')
      postProfile(profiles[1], 'right')
      ordainChampion(profiles)
      $('.duel-container').removeClass('hide')
    })
    .catch(err => console.log('Error dueling users: ', err))

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

const ordainChampion = profiles => {
  assignStatColors('total-stars', profiles)
  assignStatColors('most-starred', profiles)
  assignStatColors('public-repos', profiles)
  assignStatColors('perfect-repos', profiles)
  assignStatColors('followers', profiles)
  assignStatColors('following', profiles)
}

const assignStatColors = (stat, profiles) => {
  clearStatColors('total-stars')

  if (profiles[0][stat] > profiles[1][stat]) {
    $(`.left span.${stat}`).parent().addClass('green-stat')
    $(`.right span.${stat}`).parent().addClass('red-stat')
  } else if (profiles[1][stat] > profiles[0][stat]) {
    $(`.left span.${stat}`).parent().addClass('red-stat')
    $(`.right span.${stat}`).parent().addClass('green-stat')
  } else {
    $(`.left span.${stat}`).parent().addClass('yellow-stat')
    $(`.right span.${stat}`).parent().addClass('yellow-stat')
  }
}

const clearStatColors = stat => {
  $(`.left span.${stat}`).parent().removeClass('green-stat')
  $(`.left span.${stat}`).parent().removeClass('red-stat')
  $(`.left span.${stat}`).parent().removeClass('yellow-stat')
  $(`.right span.${stat}`).parent().removeClass('green-stat')
  $(`.right span.${stat}`).parent().removeClass('red-stat')
  $(`.right span.${stat}`).parent().removeClass('yellow-stat')
}

// TODO: handle nonexistent users
