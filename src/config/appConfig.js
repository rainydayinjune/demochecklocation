require('dotenv/config')

module.exports = {
    tokenExpire: 60 * 60 * 24 * 7,
    secretKey: process.env.SECRET_KEY,

    partnerId: process.env.PARTNER_ID,
    partnerKey: process.env.PARTNER_KEY,
    cardPartnerApi: process.env.CARD_PARTNER_API
}