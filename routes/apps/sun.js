import express from 'express'
import fs from 'fs/promises'
import { SignJWT, importPKCS8, decodeJwt } from "jose"
import fetch from 'node-fetch'
import dayjs from 'dayjs'

const pem = await fs.readFile('./.private/ed25519-private.pem', 'utf8')
const privateKey = await importPKCS8(pem, 'EdDSA')
let currentToken = null

async function getToken() {
  const now = Date.now()
  const nowS = now / 1000

  if(currentToken) {
    const { exp: tokenExp } = decodeJwt(currentToken)
    if(tokenExp > nowS) {
      return currentToken
    }
  }

  const iat = Math.floor(nowS) - 30
  const exp = iat + 86400
  const customHeader = {
    alg: 'EdDSA',
    kid: 'TDPPQG85PE'
  }
  const customPayload = {
    sub: '4JDXG6R8FH',
    iat,
    exp
  }
  const token = await new SignJWT(customPayload)
    .setProtectedHeader(customHeader)
    .sign(privateKey)
  currentToken = token
  return token
}

const router = express.Router()

router.get('/status', (req, res, next) => {
  const { latitude, longitude, date } = req.query
  if(!latitude || !longitude || !+latitude || !+longitude) {
    return res.status(400).send('Missing required parameters')
  } else if(!date) {
    req.query.date = dayjs().format('YYYYMMDD')
  } else if(date && date.length !== 8) {
    return res.status(400).send('Invalid date format')
  }
  next()
}, async (req, res) => {
  const { latitude, longitude, date } = req.query
  const token = await getToken()
  const url = `https://nu3yfqjbke.yun.qweatherapi.com/v7/astronomy/sun?location=${(+longitude).toFixed(2)},${(+latitude).toFixed(2)}&date=${date}`
  // console.log(latitude, longitude, date, url)
  const data = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then(res => res.json())
  res.json({
    success: true,
    data: data
  })
})

export default router