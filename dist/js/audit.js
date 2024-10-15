async function fetchAudit(){var t=await(await fetch("http://localhost:4000/user/fetch_audit?userID="+user._id)).json();let a=document.querySelector(".audit-list");t.data.forEach((t,i)=>{i=`<li>
            <span>${i+1}.</span> <div>${t.info}</div>
        </li>`;a.innerHTML+=i})}fetchAudit();