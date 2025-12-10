/**
 * Gets the current date for the application.
 * In development, you can set a fixed date by uncommenting and modifying the line below.
 * In production, this will always return the actual current date.
 * @returns {Date} - Current date (or fixed date in dev mode)
 */
export function getCurrentDate() {
  /// return new Date(2025, 11, 11);
   return new Date();
}

/**
 * Checks if a given day (1-24) in December is unlocked
 * A day is unlocked if:
 * 1. It's today or earlier (based on getCurrentDate())
 * 2. The date falls on a weekday (Monday-Friday)
 * @param {number} day - Day number (1-24)
 * @param {Date} now - Current date (defaults to getCurrentDate())
 * @returns {boolean} - True if the day is unlocked
 */
export function isUnlocked(day, now = getCurrentDate()) {
  const calendarYear = new Date().getFullYear();
  const dayDate      = new Date(calendarYear, 11, day); // Month 11 = December (0-indexed)
  
  const testDate   = new Date(calendarYear, now.getMonth(), now.getDate());
  const targetDate = new Date(calendarYear, 11, day);
  
  if (targetDate > testDate) {
    return false;
  }
  
  // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const dayOfWeek = dayDate.getDay();
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  
  return isWeekday;
}

/**
 * Gets the date object for a specific day in December
 * @param {number} day - Day number (1-24)
 * @returns {Date} - Date object for that day
 */
export function getDayDate(day) {
  const currentYear = getCurrentDate().getFullYear();
  return new Date(currentYear, 11, day);
}

/**
 * Formats a date to a readable string
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  });
}

