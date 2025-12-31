const API_BASE = "https://jsonplaceholder.typicode.com/posts";
const messageEl = document.getElementById("message");

const postIdEl = document.getElementById("postId");
const userIdEl = document.getElementById("userId");
const titleEl = document.getElementById("title");
const bodyEl = document.getElementById("body");

const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

let currentPostId = null;

/* =========================
共通メッセージ
========================= */
function showMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.className = "message " + (isError ? "error" : "success");
}

function clearMessage() {
  messageEl.textContent = "";
  messageEl.className = "message";
}

/* =========================
初期表示
========================= */
function getPostIdFromUrl() {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));
  return Number.isInteger(id) ? id : null;
}

async function fetchPost(id) {
  try {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    showMessage("データの取得に失敗しました", true);
    return null;
  }
}

function setFormData(post) {
  postIdEl.textContent = `投稿ID：${post.id}`;
  userIdEl.value = post.userId;
  titleEl.value = post.title;
  bodyEl.value = post.body;
}

/* =========================
更新
========================= */
async function updatePost() {
  clearMessage();

  const userId = userIdEl.value;
  const title = titleEl.value.trim();
  const body = bodyEl.value.trim();

  // バリデーション
  if (!userId) {
    showMessage("ユーザーは必須です", true);
    return;
  }
  if (!title) {
    showMessage("タイトルは必須です", true);
    return;
  }
  if (!body) {
    showMessage("本文は必須です", true);
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/${currentPostId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: currentPostId,
        userId,
        title,
        body,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    const result = await response.json();
    console.log("更新結果:", result);
    showMessage("更新に成功しました");

  } catch (error) {
    console.error("更新失敗:", error);
    showMessage("更新に失敗しました", true);
  }
}

/* =========================
削除
========================= */
async function deletePost() {
  clearMessage();

  try {
    const response = await fetch(`${API_BASE}/${currentPostId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    console.log("削除成功");
    showMessage("削除に成功しました");

    setTimeout(() => {
      location.href = "index.html";
    }, 1000);

  } catch (error) {
    console.error("削除失敗:", error);
    showMessage("削除に失敗しました", true);
  }
}

/* =========================
イベント
========================= */
updateBtn.addEventListener("click", updatePost);
deleteBtn.addEventListener("click", deletePost);

/* =========================
起動
========================= */
(async function init() {
  const id = getPostIdFromUrl();
  if (!id) {
    showMessage("不正なURLです", true);
    return;
  }

  currentPostId = id;
  const post = await fetchPost(id);
  if (post) {
    setFormData(post);
  }
})();