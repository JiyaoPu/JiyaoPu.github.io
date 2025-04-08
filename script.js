


document.addEventListener("DOMContentLoaded", () => {
/*   gsap.registerPlugin(DrawSVGPlugin);
 */
  // 导航平滑滚动
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60,
          behavior: "smooth",
        });
      }
    });
  });

  // Publications 搜索过滤
  const searchInput = document.getElementById("pubSearch");
  if (searchInput) {
    const publications = document.querySelectorAll(".publication");
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      publications.forEach((pub) => {
        const title =
          pub.querySelector(".pub-title")?.textContent.toLowerCase() || "";
        const authors =
          pub.querySelector(".pub-authors")?.textContent.toLowerCase() || "";
        const abstract =
          pub.querySelector(".pub-abstract")?.textContent.toLowerCase() || "";
        pub.style.display =
          title.includes(filter) ||
          authors.includes(filter) ||
          abstract.includes(filter)
            ? ""
            : "none";
      });
    });
  }

  // Bongo Cat 动画部分
  const ID = "bongo-cat";
  const s = (selector) => `#${ID} ${selector}`;
  const notes = document.querySelectorAll(".note");

  notes.forEach((note) => {
    if (note.parentElement) {
      note.parentElement.appendChild(note.cloneNode(true));
      note.parentElement.appendChild(note.cloneNode(true));
    }
  });

  const music = { note: s(".music .note") };
  const cat = {
    pawRight: {
      up: s(".paw-right .up"),
      down: s(".paw-right .down"),
    },
    pawLeft: {
      up: s(".paw-left .up"),
      down: s(".paw-left .down"),
    },
  };

  const style = getComputedStyle(document.documentElement);
  const green = style.getPropertyValue("--green");
  const pink = style.getPropertyValue("--pink");
  const blue = style.getPropertyValue("--blue");
  const orange = style.getPropertyValue("--orange");
  const cyan = style.getPropertyValue("--cyan");

  gsap.set(music.note, { scale: 0, autoAlpha: 1 });

  const animatePawState = (selector) =>
    gsap.fromTo(
      selector,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.01,
        repeatDelay: 0.19,
        yoyo: true,
        repeat: -1,
      }
    );

  const tl = gsap.timeline();
  tl.add(animatePawState(cat.pawLeft.up), "start")
    .add(animatePawState(cat.pawRight.down), "start")
    .add(animatePawState(cat.pawLeft.down), "start+=0.19")
    .add(animatePawState(cat.pawRight.up), "start+=0.19")
    .timeScale(1.6);

  gsap.from(".terminal-code line", {
    drawSVG: "0%",
    duration: 0.1,
    stagger: 0.1,
    ease: "none",
    repeat: -1,
  });

  const noteElFn = gsap.utils.pipe(gsap.utils.toArray, gsap.utils.shuffle);
  const noteEls = noteElFn(music.note);

  const numNotes = noteEls.length / 3;
  const notesG1 = noteEls.splice(0, numNotes);
  const notesG2 = noteEls.splice(0, numNotes);
  const notesG3 = noteEls;

  const colorizer = gsap.utils.random(
    [green, pink, blue, orange, cyan, "#a3a4ec", "#67b5c0", "#fd7c6e"],
    true
  );
  const rotator = gsap.utils.random(-50, 50, 1, true);
  const dir = (amt) => `${gsap.utils.random(["-", "+"])}=${amt}`;

  const animateNotes = (els) => {
    els.forEach((el) => {
      gsap.set(el, {
        stroke: colorizer(),
        rotation: rotator(),
        x: gsap.utils.random(-25, 25, 1),
      });
    });

    return gsap.fromTo(
      els,
      { autoAlpha: 1, y: 0, scale: 0 },
      {
        duration: 2,
        autoAlpha: 0,
        scale: 1,
        ease: "none",
        stagger: { from: "random", each: 0.5 },
        rotation: dir(gsap.utils.random(20, 30, 1)),
        x: dir(gsap.utils.random(40, 60, 1)),
        y: gsap.utils.random(-200, -220, 1),
        onComplete: () => animateNotes(els),
      }
    );
  };

  tl.add(animateNotes(notesG1))
    .add(animateNotes(notesG2), ">0.05")
    .add(animateNotes(notesG3), ">0.25");

  // ----------------------------
  // 添加 logo-button 播放/暂停背景音乐的功能

  // 定义全局开关函数，使其在 logo-button 点击时切换音乐播放状态
  function toggleMusic() {
    const audio = document.getElementById("bgMusic");
    if (audio) {
      audio.volume = 0.1;  // 设置音量为 30%
    }

    if (audio) {
      if (audio.paused == true) {
        console.log("paused:", audio.paused);
        audio.play();
      } else {
        console.log("muted:", audio.muted);

        audio.pause();
      }
    }
  }

  const logoButton = document.querySelector(".logo-button");
  if (logoButton) {
    logoButton.addEventListener("click", toggleMusic);
  }
});
