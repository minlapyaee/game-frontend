let user={},balance=1e4;function updateBalance(){var e=document.getElementById("balance"),a=document.querySelector("#audit-balance div");e&&(e.innerHTML=balance+'<span class="balance-unit">Balance</span>'),a&&(a.innerHTML=balance)}async function createUser(){var e=localStorage.getItem("user");e?(user=JSON.parse(e),balance=user.balance,document.querySelector("header .fullname").innerHTML=user.fullname,updateBalance()):(e="User"+(new Date).getMilliseconds()+(new Date).getSeconds(),e=await(await fetch("http://localhost:4000/user/create_user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fullname:e})})).json(),user=e.data,localStorage.setItem("user",JSON.stringify(user)),document.querySelector("header .fullname").innerHTML=user.fullname)}createUser(),particlesJS.load("particles-js","assets/particlesjs-config.json",function(){console.log("callback - particles.js config loaded")});