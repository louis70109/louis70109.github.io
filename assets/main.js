const button = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#site-nav');

button?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
});

// Search
(function () {
  const input = document.getElementById('search-input');
  if (!input) return;

  const status = document.getElementById('search-status');
  const list = document.getElementById('search-results');
  let corpus = null;

  function setStatus(msg) {
    if (status) status.textContent = msg;
  }

  function clearResults() {
    while (list.firstChild) list.removeChild(list.firstChild);
  }

  function formatDate(raw) {
    if (!raw) return '';
    const d = new Date(raw);
    if (isNaN(d)) return raw;
    return d.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  function renderResults(items) {
    clearResults();
    if (items.length === 0) {
      setStatus('找不到符合的文章。');
      return;
    }
    setStatus('找到 ' + items.length + ' 筆結果。');
    const fragment = document.createDocumentFragment();
    items.slice(0, 20).forEach(function (item) {
      const li = document.createElement('li');
      li.className = 'search-result';

      const meta = document.createElement('p');
      meta.className = 'search-result-meta';
      if (item.date) {
        const time = document.createElement('time');
        time.setAttribute('datetime', item.date);
        time.textContent = formatDate(item.date);
        meta.appendChild(time);
      }
      if (item.category) {
        if (item.date) {
          const sep = document.createElement('span');
          sep.setAttribute('aria-hidden', 'true');
          sep.textContent = ' / ';
          meta.appendChild(sep);
        }
        const cat = document.createElement('span');
        cat.textContent = item.category;
        meta.appendChild(cat);
      }

      const heading = document.createElement('h2');
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.title || '(untitled)';
      heading.appendChild(link);

      const excerpt = document.createElement('p');
      excerpt.className = 'search-result-excerpt';
      const raw = (item.text || '').trim().replace(/\s+/g, ' ');
      excerpt.textContent = raw.length > 120 ? raw.slice(0, 120) + '...' : raw;

      li.appendChild(meta);
      li.appendChild(heading);
      if (excerpt.textContent) li.appendChild(excerpt);
      fragment.appendChild(li);
    });
    list.appendChild(fragment);
  }

  function search(query) {
    const keywords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (keywords.length === 0) {
      clearResults();
      setStatus('');
      return;
    }
    if (!corpus) {
      setStatus('Loading...');
      return;
    }
    const results = corpus.filter(function (item) {
      const haystack = [
        item.title || '',
        item.category || '',
        Array.isArray(item.tags) ? item.tags.join(' ') : (item.tags || ''),
        item.text || '',
      ].join(' ').toLowerCase();
      return keywords.every(function (kw) { return haystack.includes(kw); });
    });
    renderResults(results);
  }

  function load(cb) {
    if (corpus) { cb(); return; }
    setStatus('載入搜尋索引...');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/search.json');
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          corpus = JSON.parse(xhr.responseText);
        } catch (e) {
          setStatus('搜尋索引格式錯誤。');
          return;
        }
        cb();
      } else {
        setStatus('無法載入搜尋索引。');
      }
    };
    xhr.onerror = function () { setStatus('網路錯誤，無法載入搜尋索引。'); };
    xhr.send();
  }

  let debounceTimer;
  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      const q = input.value;
      load(function () { search(q); });
    }, 220);
  });

  // Support URL param ?q=
  const params = new URLSearchParams(window.location.search);
  const initialQ = params.get('q');
  if (initialQ) {
    input.value = initialQ;
    load(function () { search(initialQ); });
  } else {
    setStatus('');
  }
}());
