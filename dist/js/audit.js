async function fetchAudit(){var t=await(await fetch("http://localhost:4000/user/fetch_audit?userID="+user._id)).json();console.log("data",t);let i=document.querySelector(".audit-list");t.data.forEach((t,a)=>{a=`<li>
            <span>${a+1}.</span> <div>${t.info}</div>
        </li>`;i.innerHTML+=a})}fetchAudit();