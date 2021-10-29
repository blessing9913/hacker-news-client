const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_RUL = 'https://api.hnpwa.com/v0/item/@id.json';

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

  for(let i = 0; i < newsFeed.length; i++) {
    newsList.push(`
      <li>
        <a href="#${newsFeed[i].id}">
          ${newsFeed[i].title} [${newsFeed[i].comments_count}]
        </a>
      </li>
    `);
  }

  newsList.push('</ul>');

  container.innerHTML = newsList.join('');
}

const container = document.getElementById('root');
const ul = document.createElement('ul');

// 글 상세
function newsDetail() {
  const id = location.hash.substr(1);

  const newsContent = getData(CONTENT_RUL.replace('@id', id));

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#">목록으로</div>
    </div>
  `;
}

// 라우터
function router() {
  const routePath = location.hash;

  if(routePath === '') { // location.hash 에 #만 있을 경우 빈 값을 반환 함
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener('hashchange', router);

router();