

const symbols = ["🍬", "🎃", "🔔", "🪦", "🦇", "🧛"];

const paylines = [
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],

  [0, 0, 1, 2, 6],
  [2, 2, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [2, 1, 1, 1, 2],
  [1, 0, 0, 0, 1],

  [1, 2, 2, 2, 1],
  [0, 1, 2, 2, 1],
  [2, 1, 0, 0, 1],
  [0, 0, 2, 2, 0],
  [2, 2, 0, 0, 2],

  [1, 0, 1, 2, 1],
  [1, 2, 1, 0, 1],
  [0, 2, 2, 1, 0],
  [2, 0, 0, 1, 2],
  [1, 1, 0, 2, 1],

  [2, 0, 1, 0, 2],
  [0, 2, 1, 2, 0],
  [1, 1, 2, 0, 1],
  [1, 2, 0, 1, 1],

  [2, 1, 2, 1, 0],
];

document.querySelector('.no-balance-model-parent .overlay').addEventListener('click', function() {
  gsap.to('.no-balance-model-parent', {
    opacity: 0,
    ease: "power4.inOut",
    onComplete: () => {
      document.querySelector(".no-balance-model-parent").style.display = "none";
      // document.querySelector(".deposit-model-parent").style.display = "block"
    },
  })
})
async function createAudit(info) {
  const response = await fetch("http://localhost:4000/user/create_audit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID: user._id, info, balance }),
  });
  const res = await response.json();
}
document
  .querySelector(".welcome-container")
  .addEventListener("click", function () {
    document.querySelector("#spookyAudio").play();
    gsap.to(".welcome-container", {
      height: 0,
      opacity: 0,
      ease: "power4.inOut",
      onComplete: () => {
        document.querySelector(".game-container").style.display = "block";
        gsap.to(".game-container", {
          opacity: 1,
          ease: "power4.inOut",
        });
      },
    });
  });

// game
let isSpinning = false;
document.getElementById("spin").addEventListener("click", spinReels);

function spinReels() {
  console.log("spinReeles");
  gsap.to(".win-container", {
    height: 0,
    opacity: 1,
  });
  if (!isSpinning) {
    isSpinning = true;
    document.querySelectorAll(`.reel div`).forEach((item) => {
      item.style.backgroundColor = "#444";
      item.style.animationPlayState = "paused";
    });
    const betPerLine = parseInt(document.getElementById("bet").value);
    const numPaylines = parseInt(document.getElementById("paylines").value);
    const totalBet = betPerLine * numPaylines;

    if (totalBet > balance) {
      document.querySelector(".no-balance-model-parent").style.display = "block";
      gsap.to('.no-balance-model-parent', {
        opacity: 1,
        ease: "power4.inOut",
        onComplete: () => isSpinning = false
      })
      return;
    }
    balance -= totalBet;
    createAudit(
      `You used ${betPerLine} Berperline and ${numPaylines} Payline.`
    );
    localStorage.setItem("user", JSON.stringify({ ...user, balance }));
    updateBalance();

    // Generate random symbols for each reel
    const reels = [...Array(5)].map(() =>
      [...Array(3)].map(
        () => symbols[Math.floor(Math.random() * symbols.length)]
      )
    );
    displayReels(reels);
    gsap.from(".reel div", {
      duration: 2,
      y: -200,
      onComplete: () => {
        const totalWin = checkWins(reels, numPaylines, betPerLine);
        balance += totalWin;
        localStorage.setItem("user", JSON.stringify({ ...user, balance }));
        updateBalance();
        isSpinning = false;
      },
    });
  }
}

function displayReels(reels) {
  reels.forEach((reel, index) => {
    const reelElement = document.getElementById(`reel${index + 1}`);
    reelElement.innerHTML = "";
    reel.forEach((symbol) => {
      const div = document.createElement("div");
      div.textContent = symbol;
      reelElement.appendChild(div);
    });
  });
  for (let i = 0; i < 2; i++) {
    reels.forEach((reel, index) => {
      const reelElement = document.getElementById(`reel${index + 1}`);
      reel.forEach((symbol) => {
        const div = document.createElement("div");
        div.textContent = symbol;
        reelElement.appendChild(div);
      });
    });
  }
}

function checkWins(reels, numPaylines, betPerLine) {
  let totalWin = 0;
  for (let i = 0; i < numPaylines; i++) {
    const payline = paylines[i];
    const firstSymbol = reels[0][payline[0]];
    const isWin = reels.every(
      (reel, index) => reel[payline[index]] === firstSymbol
    );
    if (isWin) {
      payline.forEach((number, index) => {
        const elements = document.querySelectorAll(`#reel${index + 1} div`);
        elements[number].style.animationPlayState = "running";
        gsap.to(".win-container", {
          height: "auto",
          opacity: 1,
        });
        const audio = document.getElementById("thunderAudio");
        audio.currentTime = 0;
        audio.play();
      });
      createAudit(`You won ${totalWin}.`);
      totalWin += betPerLine * 5;
    }
  }
  return totalWin;
}