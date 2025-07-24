export function slugify(date, title) {
  return date.replace(/-/g, '/') + '/' + title.toLowerCase().replace(/\s|\//g, '-')
}
