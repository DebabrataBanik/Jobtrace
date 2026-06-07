import { rateLimit } from 'express-rate-limit'

export const authLimiter = rateLimit({
  windowMs: 10*60*1000,
  limit: 5,
  message: { message: 'Too many attempts, please try again later.' },
  legacyHeaders: false,
  standardHeaders: true
})

export const applicationLimiter = rateLimit({
  windowMs: 5*60*1000,
  limit: 100,
  message: { message: 'Will you go slower boy' }, 
  legacyHeaders: false,
  standardHeaders: true
})
