import Joi from 'joi'

export default {
  query: {
    username: Joi.array()
      .single()
      .required()
      .items(
        Joi.string()
          .regex(/^[a-zA-Z0-9][a-zA-Z0-9-]*$/)
          .required()
          .min(1)
          .max(39)
      )
  }
}
