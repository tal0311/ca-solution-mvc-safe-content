"use strict";

function loginInit() {
  console.log("%c Login Init", "color:lightgreen");
  createUsers();
  renderLogin();
}

function renderLogin() {
  const loggedInUser = getLoggedInUser();
  const elLogin = document.querySelector(".login");
  console.log(loggedInUser);

  const elSecret = document.querySelector(".secret-content");
  if (!loggedInUser) {
    renderLoginForm(elLogin, elSecret);
    setUserMsg("Enter username and password");
    return;
  }
  renderSafeContent(loggedInUser, elLogin, elSecret);
  setUserMsg(`You are loggeed in as ${loggedInUser.username}`);
}

function renderLoginForm(elLogin, elSecret) {
  elLogin.classList.remove("hide");
  elSecret.classList.add("hide");
}
function renderSafeContent(user, elLogin, elSecret) {
  if (!user.isAdmin) {
    document.querySelector(".admin-section").classList.add("hide");
  }
  document.querySelector(".welcome-user").innerText = `Hello ${user.username}`;
  elSecret.classList.remove("hide");
  elLogin.classList.add("hide");
}

function onLogin(ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const inputObject = Object.fromEntries(formData);
  const { username, passWord } = inputObject;
  if (!passWord && !username) {
    setUserMsg("Password or username are not correct");
    return;
  }
  doLogin(inputObject);
  renderLogin();
}

function onLogout() {
  console.log("log controlet");

  doLogout();
  renderLogin();
}

function setUserMsg(msg) {
  document.querySelector(".user-msg").classList.toggle("open");
  if (!msg) return;
  document.querySelector(".msg-txt").innerText = msg || "";
  setTimeout(setUserMsg, 2000);
}
