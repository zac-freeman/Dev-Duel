/* eslint-disable no-undef */

// TODO: seperate titles array elements with spaces
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
