const placeholder = document.getElementById("resultPlaceholder");

/* =========================
定数・状態管理
========================= */
const PAGE_SIZE = 10;
let currentPage = 1;
let allResults = [];

/* =========================
メッセージ表示
========================= */

function showMessage(text) {
  document.querySelectorAll(".message").forEach(el => el.remove());
  const lists = document.querySelector(".lists");
  if (!lists) return;

  lists.insertAdjacentHTML(
    "beforebegin",
    `<div class="message">${text}</div>`
  );
}

/* =========================
一覧描画（ページ対応）
========================= */
function renderPage() {
  const lists = document.querySelector(".lists");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const pageInfo = document.querySelector(".page-info");

  if (!lists) return;

  lists.innerHTML = "";

  // 検索結果0件の場合
  if (allResults.length === 0) {
    showMessage("該当するデータがありません");
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    pageInfo.textContent = "";
    return;
  }

  const totalPages = Math.ceil(allResults.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = allResults.slice(start, end);

  for (const item of pageItems) {
    const li = document.createElement("li");
    li.className = "lists-item";

  // クリック時に詳細ページへ遷移
    li.addEventListener("click", () => {
      window.location.href = `detail.html?id=${item.id}`;
    });

    const inner = document.createElement("div");
    inner.className = "list-inner";

    const pUserId = document.createElement("p");
    pUserId.textContent = `ユーザーID：${item.userId}`;

    const pTitle = document.createElement("p");
    pTitle.textContent = `タイトル：${item.title}`;

    inner.append(pUserId, pTitle);
    li.appendChild(inner);
    lists.appendChild(li);
  }

  // ページ情報
  pageInfo.textContent = `${currentPage} / ${totalPages}`;

  // 前・次ボタン制御
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

/* =========================
検索結果受け取り
========================= */
function displayResult(result) {
    if (placeholder) {
    placeholder.style.display = "none";
  }
  allResults = Array.isArray(result) ? result : [];
  currentPage = 1; // 新検索でリセット
  renderPage();
}

/* =========================
API検索
========================= */
async function searchPostsWithLike({ userId, id, title, body }) {
  try {
    const baseUrl = "https://jsonplaceholder.typicode.com/posts";
    const params = new URLSearchParams();

    if (userId) params.set("userId", userId);
    if (id) params.set("id", id);
    if (title) params.set("title_like", title);
    if (body) params.set("body_like", body);

    const url = `${baseUrl}?${params.toString()}`;
    console.log("検索URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("API通信エラー:", error);
    throw error;
  }
}

/* =========================
フォーム送信
========================= */
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  document.querySelectorAll(".message").forEach(el => el.remove());

  const errors = [];

  const userId = document.querySelector(".userId").value;
  const id = document.querySelector(".id").value.trim();
  const title = document.querySelector(".title").value.trim();
  const body = document.querySelector(".body").value.trim();

  if (id !== "" && !Number.isInteger(Number(id))) {
    errors.push("投稿IDは整数で入力してください");
  }

  if (title !== "" && title.length > 10) {
    errors.push("タイトルは10文字以内で入力してください");
  }

  if (body !== "" && body.length > 50) {
    errors.push("本文は50文字以内で入力してください");
  }

  if (errors.length > 0) {
    showMessage(errors.join("<br>"));
    return;
  }

  try {

    const params = {
      userId: userId !== "0" ? userId : undefined,
      id: id || undefined,
      title: title || undefined,
      body: body || undefined,
    };

    const result = await searchPostsWithLike(params);
    displayResult(result);

  } catch {
    showMessage("通信エラーが発生しました。再度お試しください。");
  }
});

/* =========================
ページ切り替え
========================= */
document.querySelector(".prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});

document.querySelector(".next").addEventListener("click", () => {
  const totalPages = Math.ceil(allResults.length / PAGE_SIZE);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
});