const formatDate = (date) => {
  const passedDate = new Date(date);
  let year = passedDate.getFullYear();
  let month = (1 + passedDate.getMonth()).toString().padStart(2, "0");
  let day = passedDate.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
};

export default formatDate;
