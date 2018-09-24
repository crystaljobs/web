let nextObjectId = 1

const objectId = (obj) => {
  if (obj === null) return null
  if (obj.__obj_id === null) obj.__obj_id = nextObjectId++
  return obj.__obj_id
}

export { objectId }
