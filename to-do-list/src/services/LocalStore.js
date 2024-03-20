/* eslint-disable */
class LocalStore {
  constructor(storageKey) {
    this.storageKey = storageKey
    this.initStore()
  }

  initStore() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]))
    }
  }

  create(item) {
    const data = this.readAll()
    item.id = data.length > 0 ? Math.max(...data.map((i) => i.id)) + 1 : 1
    data.push(item)
    localStorage.setItem(this.storageKey, JSON.stringify(data))
    return item
  }

  readAll() {
    return JSON.parse(localStorage.getItem(this.storageKey)) || []
  }

  read(id) {
    const data = this.readAll()
    return data.find((item) => item.id === id)
  }

  update(id, updatedProperties) {
    const data = this.readAll()
    const itemIndex = data.findIndex((item) => item.id === id)
    if (itemIndex === -1) return null
    const updatedItem = { ...data[itemIndex], ...updatedProperties }
    data[itemIndex] = updatedItem
    localStorage.setItem(this.storageKey, JSON.stringify(data))
    return updatedItem
  }


  delete(id) {
    let data = this.readAll()
    data = data.filter((item) => item.id !== id)
    localStorage.setItem(this.storageKey, JSON.stringify(data))
  }
}

export default LocalStore
