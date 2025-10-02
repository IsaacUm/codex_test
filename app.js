document.getElementById('year').textContent = new Date().getFullYear();

// 모바일 메뉴 토글
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

// 스무스 스크롤 (내비 링크)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const el = document.querySelector(href);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      menu.classList.remove('open');
    }
  });
});

// 간단한 폼 검증/피드백
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name')||'').trim();
    const email = String(data.get('email')||'').trim();
    const msg = String(data.get('msg')||'').trim();

    if(name.length < 2){ return showMsg('이름은 2글자 이상 입력해주세요.'); }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ return showMsg('올바른 이메일 형식을 입력해주세요.'); }
    if(msg.length < 5){ return showMsg('메시지는 5글자 이상 입력해주세요.'); }

    showMsg('문의가 정상적으로 접수되었습니다. 감사합니다!');
    form.reset();
  });
}

function showMsg(text){
  if (!note) return;
  note.textContent = text;
  note.style.color = '#d6f5ff';
}
