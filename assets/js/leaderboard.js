async function fetchAudit() {
    const response = await fetch("http://localhost:4000/user/fetch_leaderboard");
      const res = await response.json();
      const userList = document.querySelector('.user-list')
      console.log("res", res, userList);
      res.data.forEach((item, index) => {
        const element = `<li>
            <span>${index + 1 }.</span> <div>${item.fullname}</div>
        </li>`
        userList.innerHTML += element;
      });
}
fetchAudit();