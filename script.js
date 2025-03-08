const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("공백은 입력할 수 없습니다");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.draggable = true;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// list 클릭하면 체크 or X

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName == "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
});

// 새로고침 시 저장
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");

  // 저장된 데이터를 불러온 후 모든 li 요소에 draggable 속성 추가
  const items = listContainer.querySelectorAll("li");
  items.forEach((item) => {
    item.draggable = true;
  });
}

// 페이지 로드 시 저장된 작업 표시
showTask();

// 리스트 순서 바꾸기

// 드래그 앤 드롭 기능 구현
let draggedItem = null;

// 드래그 시작 시 드래그되는 항목 저장
listContainer.addEventListener("dragstart", (e) => {
  if (e.target.tagName === "LI") {
    draggedItem = e.target;
    // 드래그 효과를 위한 스타일 추가
    setTimeout(() => {
      e.target.classList.add("dragging");
    }, 0);
  }
});

// 드래그 종료 시 스타일 제거
listContainer.addEventListener("dragend", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.remove("dragging");
    draggedItem = null;
    saveData(); // 순서 변경 후 저장
  }
});

// 드래그 중인 요소가 다른 요소 위에 있을 때
listContainer.addEventListener("dragover", (e) => {
  e.preventDefault(); // 기본 동작 방지
  if (!draggedItem) return;
  
  const targetItem = e.target.closest('li');
  if (!targetItem || targetItem === draggedItem) return;
  
  // 마우스 위치에 따라 위/아래에 드롭할지 결정
  const mouseY = e.clientY;
  const targetRect = targetItem.getBoundingClientRect();
  const targetMiddle = targetRect.top + targetRect.height / 2;
  
  if (mouseY < targetMiddle) {
    // 마우스가 대상 항목의 위쪽에 있으면 위에 삽입
    listContainer.insertBefore(draggedItem, targetItem);
  } else {
    // 마우스가 대상 항목의 아래쪽에 있으면 아래에 삽입
    listContainer.insertBefore(draggedItem, targetItem.nextSibling);
  }
});

// 드롭했을 때 처리
listContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  // dragover에서 이미 위치 조정이 끝났으므로 여기서는 저장만 수행
  saveData();
});


// 수정하기