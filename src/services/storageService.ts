export interface StorageService {
  save<T>(key: string, value: T): void
  load<T>(key: string): T | null
  remove(key: string): void
}

export class LocalStorageService implements StorageService {
  save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  load<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }
}
