export const respond = (msg, cb) => {
  try {
    const d = JSON.parse(msg)
    cb(d)
  } catch (e) {
    console.warn(e)
  }
}
