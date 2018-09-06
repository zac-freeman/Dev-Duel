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

    Promise.all([
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
    ])
      .then(([user, repos]) => [user.data, repos.data])
      .then(([userData, userRepos]) => createProfile(userData, userRepos))
      .then(profile => res.json(profile))
      .catch(err => {
        console.log('Error handling Get user request: ', err)
        res.json({
          message: `User with username "${username}" does not exist`
        })
      })
  })

  /** GET /api/users?username - Get users */
  router.get('/users/', validate(validation.users), (req, res) => {
    /*
      TODO
      Fetch data for users specified in query
      parse/map data to appropriate structure and return as json

      If req.query.usernames is defined but not an array, that means the client only specified one user
      For convenience to the users of our API, if the client only specified one user, we will fetch that user like we do in /user/:userId
    */

    // The following is an example response using the express res.json() function
    // This doesn't model the required response object and is only used for validating the endpoint exist
    return res.json([
      { username: 'example-user-1' },
      { username: 'example-user-2' }
    ])
  })

  return router
}
