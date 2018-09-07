import { Router } from 'express'
import axios from 'axios'
import validate from 'express-validation'
import { createProfile } from '../service/profile'
import token from '../../token'

import validation from './validation'

export default () => {
  let router = Router()

  router.get('/rate', (req, res) => {
    axios
      .get(`http://api.github.com/rate_limit`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => res.json(data))
  })

  /** GET /health-check - Check service health */
  router.get('/health-check', (req, res) => res.send('OK'))

  /** GET /api/user/:username - Get user */
  router.get('/user/:username', validate(validation.user), (req, res) => {
    const username = req.params.username

    Promise.all(getUserAndRepos(username))
      .catch(err => {
        console.log(err)
        res
          .status(404)
          .json({ message: `User with username "${username}" does not exist.` })
      })
      .then(([user, repos]) => [user.data, repos.data])
      .then(([userData, userRepos]) => createProfile(userData, userRepos))
      .then(profile => res.json(profile))
      .catch(err => console.log('Error handling Get user request: ', err))
  })

  /** GET /api/users?username - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    let usernames = req.query.username

    Promise.all(
      usernames.map(username => Promise.all(getUserAndRepos(username)))
    )
      .catch(err => {
        console.log(err)
        res.status(404).json({
          message: `One or more users with usernames ${usernames.map(u => `"${u}"`)} do not exist.`
        })
      })
      .then(usersAndRepos =>
        usersAndRepos.map(([user, repos]) => [user.data, repos.data])
      )
      .then(usersAndRepos =>
        usersAndRepos.map(([user, repos]) => createProfile(user, repos))
      )
      .then(profiles => res.json(profiles))
  })

  return router
}

const getUserAndRepos = username => [
  axios.get(`http://api.github.com/users/${username}`, {
    headers: {
      Authorization: token
    }
  }),
  axios.get(`http://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: token
    }
  })
]
