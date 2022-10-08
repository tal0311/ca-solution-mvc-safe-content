"use strict";
const KEY = "usersDB";
var gLoggedInUser = null;

function getLoggedInUser() {
  return gLoggedInUser;
}

function createUsers() {
  const users = loadFromStorage(KEY) || [];
  if (!users || !users.length) {
    users.push(
      _createUser("admin", 1),
      _createUser("user2", 2),
      _createUser("user1", 3)
    );
  }
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
