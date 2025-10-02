const KEY = 'minisite_posts_v1';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}
function save(posts) {
  localStorage.setItem(KEY, JSON.stringify(posts));
}
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function render() {
  const list = document.getElementById('list');
  const empty = document.getElementById('empty');
  const posts = load().sort((a,b)=>b.createdAt - a.createdAt);
  list.innerHTML = '';
  if (posts.length === 0) { empty.hidden = false; return; }
  empty.hidden = true;

  for (const p of posts) {
    const card = document.createElement('article');
    card.className = 'card';

    const title = document.createElement('h3');
    title.className = 'post-title';
    title.textContent = p.title;

    const meta = document.createElement('div');
    meta.className = 'post-meta';
    const d = new Date(p.createdAt);
    meta.textContent = `${p.author || '익명'} · ${d.toLocaleString()}`;

    const body = document.createElement('div');
    body.className = 'post-body';
    body.textContent = p.content;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const del = document.createElement('button');
    del.textContent = '삭제';
    del.addEventListener('click', ()=>{
      if (!confirm('이 글을 삭제할까요?')) return;
      const remain = load().filter(x => x.id !== p.id);
      save(remain);
      render();
    });

    actions.appendChild(del);
    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(body);
    card.appendChild(actions);
    list.appendChild(card);
  }
}

function addPost() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  const author = document.getElementById('author').value.trim();

  if (title.length < 1) return alert('제목을 입력하세요.');
  if (content.length < 1) return alert('내용을 입력하세요.');

  const posts = load();
  posts.push({ id: uid(), title, content, author, createdAt: Date.now() });
  save(posts);

  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  document.getElementById('author').value = '';
  render();
}

document.getElementById('saveBtn')?.addEventListener('click', addPost);
document.getElementById('clearBtn')?.addEventListener('click', ()=>{
  if (!confirm('저장된 모든 글을 삭제할까요? 이 작업은 되돌릴 수 없습니다.')) return;
  save([]);
  render();
});

render();
