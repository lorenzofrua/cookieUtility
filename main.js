window.DocumentCookie = {
  get: function (cookieName) {
    const name = cookieName + "="
    const decodedCookie = decodeURIComponent(document.cookie)

    return (
      decodedCookie
        .split(";")
        .find(cookie => cookie.trim().startsWith(name))
        ?.substring(name.length) || null
    )
  },
  set: function (cookieName, cookieValue, expirationDays = 365) {
    if (expirationDays <= 0) return this.delete(cookieName)

    const date = new Date()
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000)
    const expires = "expires=" + date.toUTCString()

    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/"

    return {
      name: cookieName,
      value: cookieValue,
      expiration: date
    }
  },
  delete: function (cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    return {
      name: cookieName,
      value: null,
      expiration: null
    }
  }
}
