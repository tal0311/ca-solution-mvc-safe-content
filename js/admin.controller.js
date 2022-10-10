"use strict";

function onInitAdmin() {
  createUsers();
  renderUsers();
  setUserMsg("Welcome to Admin space");
}

function renderUsers(renderBy = "table") {
  document.querySelector(".user-list").innerHTML =
    renderBy === "table" ? getTableHead() : "";
  const users = getUsersForDisplay();
  // setting dynamic paramers
  var selector = renderBy === "table" ? "tbody" : ".user-list";
  var mainEl = renderBy === "table" ? "tr" : "article";
  var subEl = renderBy === "table" ? "td" : "h4";
  var strHtmls = users
    .map((user) => {
      var time = geDateTime(user.lastLoginAt);
      return `
    <${mainEl} onclick="onRemove('${user.id}')">
    <${subEl}>${user.id}</${subEl}>
    <${subEl}>${user.username}</${subEl}>
    <${subEl}> ${time.monthDay} ${time.hours} </${subEl}>
    <${subEl}>${user.isAdmin ? "Admin" : "Not admin"}</${subEl}>
    </${mainEl}>
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
          <th title="Sort items" onclick="onSortBy('username')">User name</th>
          <th title="Sort items" onclick="onSortBy('lastLoginAt')">Last login time</th>
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

function onRemove(userId) {
  const loggedInUser = getLoggedInUser();
  if (userId === loggedInUser.id) {
    setUserMsg(`Can not remove admin user`);
    return;
  }
  const isRemove = confirm("Are you sure you want to remove this user?");
  if (isRemove) {
    const user = removeUser(userId);
    setUserMsg(`${user.username} has been removed`);
  }
}

function onSortBy(val) {
  setSortedBy(val);
  renderUsers();
}

function setUserMsg(msg) {
  document.querySelector(".user-msg").classList.toggle("open");
  if (!msg) return;
  document.querySelector(".msg-txt").innerText = msg || "";
  setTimeout(setUserMsg, 2000);
}
