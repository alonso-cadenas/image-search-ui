/**
 * Returns a string containing only words, digits, and whitespace.
 * @param value the unsanitized string
 */
export const sanitize = (value: string) => {
  return value?.replace(/[^\w\s]/gi, '') || '';
};
