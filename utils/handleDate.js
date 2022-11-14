export function getAllMonth() {
  const linksMonth = []
  for (let i = 1; i <= new Date().getMonth() + 1; i++) {
    if (i < 10) {
      i = '0' + i
    }
    linksMonth.push({ value: i.toString() })
  }
  return linksMonth
}
