interface AnonymousUser {
  id: string;
  name: string;
}

const STORAGE_KEY = 'anonymous_user';

import { v4 as uuidv4 } from 'uuid';

function generateId(): string {
  return uuidv4();
}

function generateName(): string {
  const adjectives = ['Quick', 'Smart', 'Cool', 'Fast', 'Bright', 'Sharp', 'Swift'];
  const nouns = ['Visitor', 'Guest', 'User', 'Explorer', 'Browser', 'Seeker'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  
  return `${adjective}${noun}${number}`;
}

export function getAnonymousUser(): AnonymousUser {
  if (typeof window === 'undefined') return { id: '', name: '' };
  
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  const newUser: AnonymousUser = {
    id: generateId(),
    name: generateName()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  return newUser;
}

export function clearAnonymousUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}