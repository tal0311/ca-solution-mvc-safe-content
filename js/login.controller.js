"use strict";

function loginInit() {
  console.log("%c Login Init", "color:lightgreen");
  createUsers();
  renderLogin();
}

function renderLogin() {
  const loggedInUser = getLoggedInUser();
  console.log(loggedInUser);

  const elLogin = document.querySelector(".login");
  const elSecret = document.querySelector(".secret-content");
  if (!loggedInUser) {
    renderLoggedIdUser(elLogin, elSecret);
  }
}

function renderLoggedIdUser(elLogin, elSecret) {
  elLogin.classList.remove("hide");
  elSecret.classList.add("hide");
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
}

function setUserMsg(msg) {
  document.querySelector(".user-msg").classList.toggle("open");
  if (!msg) return;
  document.querySelector(".msg-txt").innerText = msg || "";
  setTimeout(setUserMsg, 2000);
}
