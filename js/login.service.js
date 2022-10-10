"use strict";
const KEY = "usersDB";
const LOGGEDIN_USER = "loggedInUser";
var gLoggedInUser = null;
var gUsers = null;
var gSortBy = {
  val: "",
  des: 1
};

function getLoggedInUser() {
  return _loadUsers(LOGGEDIN_USER);
}
function getUsersForDisplay() {
  let users = gUsers;
  _sortUers(users, gSortBy);

  return users;
}

function _sortUers(users, sortBy) {
  if (!sortBy.val) return;
  switch (sortBy.val) {
    case "lastLoginAt":
      users.sort((a, b) => (b[sortBy.val] - a[sortBy.val]) * sortBy.des);
      break;
    default:
      users.sort(
        (a, b) => a[sortBy.val].localeCompare(b[sortBy.val]) * sortBy.des
      );
      break;
  }
}

function doLogin(inputs) {
  const user = gUsers.find(
    (user) =>
      user.username === inputs.username && user.password === inputs.password
  );
  console.log(user);

  if (user) {
    user.lastLoginAt = Date.now();
    gLoggedInUser = user;
  }
  _saveUsers(LOGGEDIN_USER, gLoggedInUser);
  _saveUsers(KEY, gUsers);
  return user;
}

function doLogout() {
  localStorage.removeItem(LOGGEDIN_USER);
  gLoggedInUser = null;
  console.log("logout", localStorage.LOGGEDIN_USER);
}

function removeUser(userId) {
  const idx = gUsers.findIndex((user) => user.id === userId);
  const user = gUsers.splice(idx, 1);
  _saveUsers(KEY, gUsers);
  return user;
}

function setSortedBy(val) {
  gSortBy = {
    val,
    des: gSortBy.des === 1 ? -1 : 1
  };
}

function createUsers() {
  const users = _loadUsers(KEY) || [];
  if (!users || !users.length) {
    users.push(
      _createUser("admin", "1", true),
      _createUser("user2", "2"),
      _createUser("user1", "3")
    );
  }
  gUsers = users;
  console.log("crateing users");

  _saveUsers(KEY, gUsers);
}

function _saveUsers(key, value) {
  saveToStorage(key, value);
}

function _loadUsers(key) {
  return loadFromStorage(key);
}

function _createUser(username, password, isAdmin = false) {
  return {
    id: _makeId(),
    username,
    password,
    isAdmin,
    lastLoginAt: Date.now()
  };
}

function _makeId(length = 5) {
  var txt = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return txt;
}
