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

// record determines winner: record > 0 => left wins
//                           record < 0 => right wins
//                           record == 0 => tie
const ordainChampion = profiles => {
  let record = 0
  record += assignStatColors('total-stars', profiles)
  record += assignStatColors('most-starred', profiles)
  record += assignStatColors('public-repos', profiles)
  record += assignStatColors('perfect-repos', profiles)
  record += assignStatColors('followers', profiles)
  record += assignStatColors('following', profiles)

  displayChampion(record)
}

const assignStatColors = (stat, profiles) => {
  clearStatColors(stat)

  if (profiles[0][stat] > profiles[1][stat]) {
    $(`.left span.${stat}`).parent().addClass('green-stat')
    $(`.right span.${stat}`).parent().addClass('red-stat')
    return 1
  } else if (profiles[1][stat] > profiles[0][stat]) {
    $(`.left span.${stat}`).parent().addClass('red-stat')
    $(`.right span.${stat}`).parent().addClass('green-stat')
    return -1
  } else {
    $(`.left span.${stat}`).parent().addClass('yellow-stat')
    $(`.right span.${stat}`).parent().addClass('yellow-stat')
    return 0
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

const displayChampion = record => {
  clearChampion()

  if (record > 0) {
    $('.left span.status').removeClass('hide')
    $('.left').addClass('winner')
    $('.right').addClass('loser')
  } else if (record < 0) {
    $('.left span.status').removeClass('hide')
    $('.left').addClass('loser')
    $('.right').addClass('winner')
  } else {
    $('.left').addClass('coloser')
    $('.right').addClass('coloser')
  }
}

const clearChampion = () => {
  $('.left span.status').addClass('hide')
  $('.left').removeClass('winner')
  $('.left').removeClass('loser')
  $('.left').removeClass('coloser')
  $('.right span.status').addClass('hide')
  $('.right').removeClass('winner')
  $('.right').removeClass('loser')
  $('.right').removeClass('coloser')
}

// TODO: handle nonexistent users
