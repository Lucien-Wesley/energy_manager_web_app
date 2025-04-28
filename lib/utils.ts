import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to readable string
export function formatDate(date: Date, shortFormat: boolean = false): string {
  return shortFormat 
    ? format(date, 'MMM d')
    : format(date, 'MMM d, yyyy h:mm a');
}

// Format hour (0-23) to 12-hour format with AM/PM
export function formatHour(hour: number): string {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${h} ${ampm}`;
}