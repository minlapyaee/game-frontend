async function fetchAudit(){var t=await(await fetch("http://localhost:4000/user/fetch_leaderboard")).json();let e=document.querySelector(".user-list");t.data.forEach((t,a)=>{a=`<li>
            <span>${a+1}.</span> <div>${t.fullname}</div>
        </li>`;e.innerHTML+=a})}fetchAudit();