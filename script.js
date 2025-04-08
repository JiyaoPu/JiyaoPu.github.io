// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 为导航链接添加平滑滚动效果
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 60, // 调整此值以适应导航栏高度
            behavior: 'smooth'
          });
        }
      });
    });
  });
  

document.addEventListener('DOMContentLoaded', () => {
const searchInput = document.getElementById('pubSearch');
const publications = document.querySelectorAll('.publication');

searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    publications.forEach(pub => {
    const title = pub.querySelector('.pub-title').textContent.toLowerCase();
    const authors = pub.querySelector('.pub-authors').textContent.toLowerCase();
    const abstract = pub.querySelector('.pub-abstract').textContent.toLowerCase();
    if (title.includes(filter) || authors.includes(filter) || abstract.includes(filter)) {
        pub.style.display = '';
    } else {
        pub.style.display = 'none';
    }
    });
});
});
  