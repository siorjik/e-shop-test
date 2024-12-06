type ObjectType = { [k: string]: string | number | boolean | ObjectType[] }

export default async<T>(
  { url, method, body }:
  { url: string, method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH', body?: ObjectType | undefined, }
): Promise<T> => {
  try {
    const resp = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      method,
      cache: 'no-store',
      body: JSON.stringify(body)
    })

    const res = await resp.json()
    
    if (res.error || res.statusCode === 401) throw res

    return res
  } catch (error) {
    throw error
  }
}
