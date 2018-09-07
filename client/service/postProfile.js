/* eslint-disable no-undef */

// TODO: figure out why this doesnt work in this file
export const postProfile = profile => {
  for (let prop in profile) {
    $(`span.${prop}`).removeClass(' hide')
    if (profile[prop] === null) {
      $(`span.${prop}`).addClass(' hide')
    }

    $(`span.${prop}`).text(profile[prop])
  }

  $(`img.avatar`).attr('src', profile['avatar'])
}
