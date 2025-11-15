import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// Imports custom matchers for better assertions (e.g., toBeInTheDocument)
import * as matchers from '@testing-library/jest-dom/matchers'; 

expect.extend(matchers);

// Runs cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});