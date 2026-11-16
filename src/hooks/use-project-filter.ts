"use client";

import { useState, useEffect } from 'react';

let currentFilter = 'All';
const listeners = new Set<(filter: string) => void>();

export function setProjectFilter(filter: string) {
  currentFilter = filter;
  listeners.forEach((listener) => listener(filter));
}

export function useProjectFilter() {
  const [filter, setFilter] = useState(currentFilter);

  useEffect(() => {
    const handler = (newFilter: string) => setFilter(newFilter);
    listeners.add(handler);
    return () => {
      listeners.delete(handler);
    };
  }, []);

  return {
    filter,
    setFilter: (newFilter: string) => setProjectFilter(newFilter),
    resetFilter: () => setProjectFilter('All'),
  };
}
