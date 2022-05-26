import BalanceModel from '../models/Balance'

export const getUserBalance = async (userId) => {
  let balance = await BalanceModel.findOne({ userId })

  if (!balance) {
    balance = await BalanceModel.create({ userId })
  }

  return balance
}