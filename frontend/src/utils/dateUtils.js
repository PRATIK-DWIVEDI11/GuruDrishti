// dateUtils.js
import { format, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
  if (!dateString) {
    return 'Unknown Date'; // Handle missing or empty date
  }

  try {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  } catch (error) {
    console.error('Invalid date format:', error);
    return 'Invalid Date'; // Handle invalid date formats gracefully
  }
};
