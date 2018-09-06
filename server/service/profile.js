export const createProfile = (userData, userRepos) => {
  let reposData = parseReposData(userRepos)

  return {
    username: userData.login,
    name: userData.name,
    location: userData.location,
    bio: userData.bio,
    avatar_url: userData.avatar_url,
    titles: decreeTitles(userData, reposData),
    favorite_language: findPropertyOfMax(reposData.languages),
    public_repos: userData.public_repos,
    total_stars: reposData.total_stars,
    highest_starred: reposData.highest_starred,
    perfect_repos: reposData.perfect_repos,
    followers: userData.followers,
    following: userData.following
  }
}

const parseReposData = repos =>
  repos.reduce(
    (acc, current) => {
      acc.total_stars += current.stargazers_count
      acc.highest_starred = Math.max(
        acc.highest_starred,
        current.stargazers_count
      )
      acc.perfect_repos += current.open_issues_count ? 0 : 1
      acc.forks += current.fork
      acc.languages[current.language] = acc.languages[current.language]
        ? ++acc.languages[current.language]
        : 1
      return acc
    },
    {
      total_stars: 0,
      highest_starred: 0,
      perfect_repos: 0,
      forks: 0,
      languages: {}
    }
  )

const decreeTitles = (userData, reposData) => {
  let titles = []
  if (reposData.forks * 2 >= userData.public_repos) {
    titles.push('Forker')
  }
  if (Object.keys(reposData.languages).length === 1) {
    titles.push('One Trick Pony')
  } else if (Object.keys(reposData.languages).length >= 10) {
    titles.push('Jack of All Trades')
  }
  if (userData.following >= userData.followers * 2) {
    titles.push('Stalker')
  } else if (userData.followers >= userData.following * 2) {
    titles.push('Mr. Popular')
  }
  if (reposData.highest_starred * 2 >= reposData.total_stars) {
    titles.push('One Hit Wonder')
  }
  return titles
}

const findPropertyOfMax = obj =>
  Object.entries(obj).reduce(
    (max, current) => {
      return current[1] > max[1] ? current : max
    },
    ['None', 0]
  )[0]
