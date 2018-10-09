export default function (data, currentPage, pageSize) {
  return data.filter((row, index) => {
    if ((currentPage - 1) * pageSize <= index &&
            index < currentPage * pageSize) {
      return row
    }
  })
}
