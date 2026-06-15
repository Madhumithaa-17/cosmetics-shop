
export const USD_TO_INR = 83

export const formatINR = (usdAmount) => {
  const inrAmount = Number(usdAmount) * USD_TO_INR
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(inrAmount)
}
