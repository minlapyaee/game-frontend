let user = {};
let balance = 10000;
function updateBalance() {
    const balanceElement = document.getElementById("balance");
    const auditbalanceElement = document.querySelector("#audit-balance div");
    if(balanceElement) {
        balanceElement.innerHTML =
          balance + '<span class="balance-unit">Balance</span>';
    }
    if(auditbalanceElement) {
        auditbalanceElement.innerHTML = balance
    }
}

async function createUser() {
  const getUser = localStorage.getItem("user");
  if (!getUser) {
    const fullname =
      "User" + new Date().getMilliseconds() + "" + new Date().getSeconds();
    const response = await fetch("http://localhost:4000/user/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname }),
    });
    const res = await response.json();
    user = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    document.querySelector("header .fullname").innerHTML = user.fullname;
  } else {
    user = JSON.parse(getUser);
    balance = user.balance;
    document.querySelector("header .fullname").innerHTML = user.fullname;
    updateBalance();
  }
}
createUser();

// particle
particlesJS.load("particles-js", "assets/particlesjs-config.json", function () {
    console.log("callback - particles.js config loaded");
});
  // end particle