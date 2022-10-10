"use strict";
const KEY = "usersDB";
const LOGGEDIN_USER = "loggedInUser";
var gLoggedInUser = null;
var gUsers = null;
function getLoggedInUser() {
  return _loadUsers(LOGGEDIN_USER);
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
  return user;
}

function doLogout() {
  localStorage.removeItem(LOGGEDIN_USER);
  gLoggedInUser = null;
  console.log("logout", localStorage.LOGGEDIN_USER);
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
