async function fetchAudit(){var e=await(await fetch("http://localhost:4000/user/fetch_leaderboard")).json();let a=document.querySelector(".user-list");console.log("res",e,a),e.data.forEach((e,t)=>{t=`<li>
            <span>${t+1}.</span> <div>${e.fullname}</div>
        </li>`;a.innerHTML+=t})}fetchAudit();