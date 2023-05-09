const cache: Map<string, string> = new Map();

const accessEnv = (key: string, defaultValue?: string): string | undefined => {
  if (!(key in process.env)) {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} not found in process.env`);
  }

  if (cache.has(key)) {
    return cache.get(key);
  }

  cache.set(key, process.env[key] || '');
  return cache.get(key);
}

export default accessEnv;
