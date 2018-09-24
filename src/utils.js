let nextObjectId = 1

const objectId = (obj) => {
  if (obj === null) return null

  if (obj.objectId === undefined) {
    obj.objectId = nextObjectId++
    return obj.objectId
  }

  return obj.objectId
}

export { objectId }
