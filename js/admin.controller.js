"use strict";

function onInitAdmin() {
  createUsers();
  renderUsers();
}

function renderUsers(renderBy = "table") {
  document.querySelector(".user-list").innerHTML =
    renderBy === "table" ? getTableHead() : "";
  const users = getUsersForDisplay();
  // setting dynamic paramers
  var selector = renderBy === "table" ? "tbody" : ".user-list";
  var primeryEl = renderBy === "table" ? "tr" : "article";
  var secondryEl = renderBy === "table" ? "td" : "h4";
  var strHtmls = users
    .map((user) => {
      var time = geDateTime(user.lastLoginAt);
      return `
    <${primeryEl}>
    <${secondryEl}>${user.id}</${secondryEl}>
    <${secondryEl}>${user.username}</${secondryEl}>
    <${secondryEl}> ${time.monthDay} ${time.hours} </${secondryEl}>
    <${secondryEl}>${user.isAdmin ? "Admin" : "Not admin"}</${secondryEl}>
    </${primeryEl}>
    `;
    })
    .join("");
  document.querySelector(selector).innerHTML = strHtmls;
}

function getTableHead() {
  return `
   <table border="1">
        <thead>
          <th>ID</th>
          <th onclick="onSortBy('username')">User name</th>
          <th onclick="onSortBy('lastLoginAt')">Last login time</th>
          <th>User Type</th>
        </thead>
        <tbody></tbody>
      </table>
   `;
}

function geDateTime(timeStemp) {
  let time = new Date(timeStemp);

  return {
    monthDay: time.toString().split(" ").slice(1, 3),
    hours: time.toString().split(" ")[4]
  };
}

function onChangeDisplay(val) {
  renderUsers(val);
}

function onSortBy(val) {
  console.log("val", val);

  setSortedBy(val);
  renderUsers();
}
