export const timeFormat = (timeStamp: number) => {
  if(!timeStamp)  return '';
  let date = new Date(timeStamp);
  return date.toJSON().substring(0,10).replaceAll('-', '.');
}