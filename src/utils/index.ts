import { BlockUrlPrefix } from './constants';

export function getBlockUrlStorageKey(domain: string) {
  return `${BlockUrlPrefix}:${domain}`
}

