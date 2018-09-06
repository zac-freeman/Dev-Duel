export const createProfile = (userData, userRepos) => {
  let reposData = userRepos.reduce(
    (acc, current) => {
      acc.total_stars += current.stargazers_count
      return acc
    },
    {
      total_stars: 0,
      highest_starred: 0,
      perfect_repos: 0,
      language_uses: {}
    }
  )

  return {
    username: userData.login,
    name: userData.name,
    location: userData.location,
    bio: userData.bio,
    avatar_url: userData.avatar_url,
    titles: '[todo, ...]',
    favorite_language: 'todo',
    public_repos: userData.public_repos,
    total_stars: reposData.total_stars,
    highest_starred: 'todo',
    perfect_repos: 'todo',
    followers: userData.followers,
    following: userData.following
  }
}
