export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const formatName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

export const truncateText = (text, maxLength = 100) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
