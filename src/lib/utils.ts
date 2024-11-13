import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function splitPath(path: string): string[] {
  return path.split('/').filter(Boolean);
}

export function formatSegments(segments: string[]): string {
  return segments.map(segment => capitalize(segment)).join(' / ');
}

export type Breadcrumb = {
  segments: string[];
  current: string;
  fullPath: string;
}

export function formatPathname(path: string): Breadcrumb {
  if (path.length <= 1) {
    return {
      segments: [],
      current: 'Dashboard',
      fullPath: 'Dashboard'
    };
  }

  const segments = splitPath(path);
  const formattedSegments = segments.map(segment => capitalize(segment));

  return {
    segments: formattedSegments.slice(0, -1),
    current: formattedSegments[formattedSegments.length - 1],
    fullPath: formattedSegments.join(' / ')
  };
}

export function sub24Hours(date: Date): Date {
  return new Date(date.getTime() - 24 * 60 * 60 * 1000);
}