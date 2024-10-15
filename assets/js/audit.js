async function fetchAudit() {
    const response = await fetch("http://localhost:4000/user/fetch_audit?userID=" + user._id);
      const res = await response.json();
      const auditList = document.querySelector('.audit-list')
      res.data.forEach((item, index) => {
        const element = `<li>
            <span>${index + 1 }.</span> <div>${item.info}</div>
        </li>`
        auditList.innerHTML += element;
      });
}
fetchAudit();