export default defineEventHandler(async (event) => {
  console.log('123')
  const body = readBody(event)
  console.log(body)
  return { ok: true }
})
