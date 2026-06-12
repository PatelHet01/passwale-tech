const AdminSettings = require('../models/AdminSettings.model')
const User = require('../models/User.model')

class PricingService {
  static async calculateTicketPrice({ basePrice, category, userId, organizerId, quantity = 1 }) {
    const settings = await AdminSettings.getInstance()
    
    let subtotal = basePrice * quantity
    let discount = 0
    let discountBreakdown = { rate: 0, platformPays: 0, organizerPays: 0 }
    
    // Card benefits calculation
    if (userId) {
      const user = await User.findById(userId).select('passwaleCard')
      if (user && user.passwaleCard && user.passwaleCard.tier !== 'free') {
        const tier = user.passwaleCard.tier // 'plus', 'pro', 'black'
        
        if (category && category.passwaleCardBenefits && category.passwaleCardBenefits.enabled) {
          const benefitConfig = category.passwaleCardBenefits[tier]
          if (benefitConfig && benefitConfig.discount) {
            const rate = benefitConfig.discount
            discount = subtotal * (rate / 100)
            const platformPays = discount * ((settings.cardSubsidy?.platformPercent || 60) / 100)
            const organizerPays = discount * ((settings.cardSubsidy?.organizerPercent || 40) / 100)
            discountBreakdown = { rate, platformPays, organizerPays }
          }
        }
      }
    }
    
    const afterDiscount = subtotal - discount
    const platformFeeRate = settings.platformFee || 3.69
    const platformFeeAmount = afterDiscount * (platformFeeRate / 100)
    const total = afterDiscount + platformFeeAmount
    
    // Commission calculation for organizers
    let commissionRate = 0
    let commission = 0
    let organizerNet = afterDiscount
    
    if (organizerId) {
      const organizer = await User.findById(organizerId).select('organizerProfile')
      if (organizer && organizer.organizerProfile) {
        commissionRate = organizer.organizerProfile.commissionOverride
        
        if (commissionRate === null || commissionRate === undefined) {
          commissionRate = PricingService.getTierCommission(organizer.organizerProfile.totalGMV || 0, settings)
        }
        
        commission = afterDiscount * (commissionRate / 100)
        organizerNet = afterDiscount - commission - (discountBreakdown.organizerPays || 0)
      }
    }
    
    return {
      subtotal,
      discount,
      discountBreakdown,
      platformFeeAmount,
      total,
      commissionRate,
      commission,
      organizerNet
    }
  }
  
  static getTierCommission(gmv, settings) {
    if (!settings || !settings.commissionTiers || settings.commissionTiers.length === 0) {
      return 15 // Fallback commission of 15%
    }
    
    // Find matching tier
    for (const tier of settings.commissionTiers) {
      const min = tier.minGMV || 0
      const max = tier.maxGMV === null || tier.maxGMV === undefined ? Infinity : tier.maxGMV
      if (gmv >= min && gmv <= max) {
        return tier.rate
      }
    }
    
    return 15
  }
}

module.exports = PricingService
