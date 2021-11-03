const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_RUL = 'https://api.hnpwa.com/v0/item/@id.json';
const store = {
  currentPage: 1,
}

function getData(url) {
  ajax.open('GET', url, false); // async = false 동기처리
  ajax.send();

  return JSON.parse(ajax.response);
}

// 글 목록
function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push('<ul>');

  for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
      <li>
        <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} [${newsFeed[i].comments_count}]
        </a>
      </li>
    `);
  }

  newsList.push('</ul>');
  newsList.push(`
    <div>
      <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
      <a href="#/page/${newsFeed.length > store.currentPage * 10 ? store.currentPage + 1 : store.currentPage}">다음 페이지</a>
    </div>
  `);

  container.innerHTML = newsList.join('');
}

const container = document.getElementById('root');
const ul = document.createElement('ul');

// 글 상세
function newsDetail() {
  const id = location.hash.substr(7);

  const newsContent = getData(CONTENT_RUL.replace('@id', id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#/page/${store.currentPage}">목록으로</div>
    </div>
  `;
}

// 라우터
function router() {
  const routePath = location.hash;

  if(routePath === '') { // location.hash 에 #만 있을 경우 빈 값을 반환 함
    newsFeed();
  } else if(routePath.indexOf('/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);

router();