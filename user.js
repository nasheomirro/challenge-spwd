const template = document.querySelector("#user-template");
// the time it takes (in ms) to transition from one state to another
const TRANSITION_TIME = 200;

/** given a user object, use the template and populate it with the data */
function createUser(user) {
  const clone = template.content.cloneNode(true);

  // grab all the elements we want to modify
  const container = clone.querySelector(".user-container");
  const name = clone.querySelector(".user-name");
  const email = clone.querySelector(".user-email");
  const age = clone.querySelector(".user-age");
  const info = clone.querySelector(".user-info");
  const img = clone.querySelector(".user-image");
  const closeBtn = clone.querySelector(".btn-close");

  assignOrRemove(name, user.name);
  assignOrRemove(email, user.email);
  assignOrRemove(info, user.info);
  assignOrRemove(age, user.age && `${user.age} years old`);

  // set the needed variables for our styles
  container.setAttribute(
    "style",
    `
  --rotation: ${generateRandomRotation()};
  --transition-time: ${TRANSITION_TIME}ms;
  `
  );

  // imgUrl could be undefined, set a fallback for that scenario
  img.setAttribute("src", user.imgUrl || "/images/user-placeholder.png");

  // "initialize" our close button as well as add the logic for when we close it.
  configureCloseBtn(closeBtn, () => {
    container.classList.add("fade-out");
    setTimeout(() => container.remove(), TRANSITION_TIME);
  });

  return clone;
}

function configureCloseBtn(closeBtn, onclick) {
  // add the close icon to our btn
  const closeBtnImg = document.createElement("img");
  closeBtnImg.src = "/images/close.svg";
  closeBtn.ariaLabel = "remove user";
  closeBtn.appendChild(closeBtnImg);

  closeBtn.addEventListener("click", onclick);
}

/** generate a random degree that ranges from 4 to 10 (negative or positive)  */
function generateRandomRotation() {
  let n = Math.random() * 20 - 10;
  if (n < 0 && n > -4) n = -4;
  if (n > 0 && n < 4) n = 4;

  return `${n}deg`;
}

/**
 * assigns the value to the node's text content if it isn't falsy
 * @param {*} node the node to change text content
 * @param {*} value the value to change it to
 */
function assignOrRemove(node, value) {
  if (!value) {
    node.remove();
  } else {
    node.textContent = value;
  }
}
