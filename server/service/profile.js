export const createProfile = (userData, userRepos) => {
  let reposData = userRepos.reduce(
    (acc, current) => {
      acc.total_stars += current.stargazers_count
      acc.highest_starred = Math.max(
        acc.highest_starred,
        current.stargazers_count
      )
      acc.perfect_repos += current.open_issues_count ? 0 : 1
      acc.languages[current.language] = acc.languages[current.language]
        ? ++acc.languages[current.language]
        : 1
      return acc
    },
    {
      total_stars: 0,
      highest_starred: 0,
      perfect_repos: 0,
      languages: {}
    }
  )

  return {
    username: userData.login,
    name: userData.name,
    location: userData.location,
    bio: userData.bio,
    avatar_url: userData.avatar_url,
    titles: '[todo, ...]',
    favorite_language: findPropertyOfMax(reposData.languages),
    public_repos: userData.public_repos,
    total_stars: reposData.total_stars,
    highest_starred: reposData.highest_starred,
    perfect_repos: reposData.perfect_repos,
    followers: userData.followers,
    following: userData.following
  }
}

const findPropertyOfMax = obj =>
  Object.entries(obj).reduce(
    (max, current) => {
      return current[1] > max[1] ? current : max
    },
    ['None', 0]
  )[0]
