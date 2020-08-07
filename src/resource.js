import { fetchFriends, fetchProfile } from "./apiRequests"

function wrapPromise(promise) {
  let status = 'pending'
  let result
  const suspender = promise.then(
    r => {
      result = r
      status = 'success'
    },
    e => {
      result = e
      status = 'error'
    }
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else if (status === 'success') {
        return result
      }
    }
  }
}

export function useResource(token) {
  return {
    friends: wrapPromise(fetchFriends(token)),
    profile: wrapPromise(fetchProfile(token))
  }
}