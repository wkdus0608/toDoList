const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categoryBtn = document.getElementById("categoryBtn");

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
    span.classList.add("deleteBtn");
    li.appendChild(span);

    let spanModify = document.createElement("span");
    spanModify.innerHTML = "\u270D";
    spanModify.classList.add("modifyBtn");
    li.appendChild(spanModify);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName == "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.classList.contains("deleteBtn")) {
    e.target.parentElement.remove();
    saveData();
  } else if (e.target.classList.contains("modifyBtn")) {
    // 수정할 li 요소 가져오기
    const li = e.target.parentElement;

    // 현재 li의 텍스트 내용 가져오기 (첫 번째 텍스트 노드)
    const text = li.childNodes[0].nodeValue.trim();

    // 현재 텍스트 내용 숨기기 (임시 제거)
    const originalText = li.childNodes[0].nodeValue;
    li.childNodes[0].nodeValue = "";

    // 수정용 input 요소 생성
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = text;
    editInput.className = "edit-input";

    // 확인 버튼 생성
    const confirmBtn = document.createElement("button");
    confirmBtn.innerHTML = "확인";
    confirmBtn.className = "confirm-btn";
    confirmBtn.style.padding = "4px 8px";
    confirmBtn.style.fontSize = "12px";
    confirmBtn.style.marginLeft = "5px";

    // input과 버튼을 li 요소의 시작 부분에 추가
    li.insertBefore(confirmBtn, li.firstChild);
    li.insertBefore(editInput, li.firstChild);

    // input에 포커스 설정
    editInput.focus();

    // 확인 버튼 클릭 이벤트
    confirmBtn.addEventListener("click", function () {
      // 수정된 텍스트 가져오기
      const newText = editInput.value.trim();

      if (newText !== "") {
        // input과 확인 버튼 제거
        editInput.remove();
        confirmBtn.remove();

        // 새 텍스트 설정
        li.childNodes[0].nodeValue = newText;
      } else {
        // 빈 텍스트인 경우 삭제
        e.target.parentElement.remove();
        saveData();
      }

      saveData();
    });

    // Enter 키 이벤트
    editInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        confirmBtn.click(); // 확인 버튼 클릭과 동일한 동작
      }
    });

    // Escape 키 이벤트 - 편집 취소
    editInput.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        // 원래 텍스트로 복원
        editInput.remove();
        confirmBtn.remove();
        li.childNodes[0].nodeValue = originalText;
      }
    });
  }
});


// 카테고리 추가하기
categoryBtn.addEventListener("click", function() {
  // 수정용 input 요소 생성
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.className = "category-input";

  // 확인 버튼 생성
  const ctgConfirmBtn = document.createElement("button");
  ctgConfirmBtn.innerHTML = "확인";
  ctgConfirmBtn.className = "ctgConfirm-btn";
  ctgConfirmBtn.style.padding = "4px 8px";
  ctgConfirmBtn.style.fontSize = "12px";
  ctgConfirmBtn.style.marginLeft = "5px";

  // input과 버튼을 li 요소의 시작 부분에 추가
  li.insertBefore(ctgConfirmBtn, li.firstChild);
  li.insertBefore(categoryInput, li.firstChild);

  // input에 포커스 설정
  categoryInput.focus();

  // 확인 버튼 클릭 이벤트
  ctgConfirmBtn.addEventListener("click", function () {
    // 수정된 텍스트 가져오기
    const newText = categoryInput.value.trim();

    if (newText !== "") {
      // input과 확인 버튼 제거
      categoryInput.remove();
      ctgConfirmBtn.remove();

      // 새 텍스트 설정
      li.childNodes[0].nodeValue = newText;
    } else {
      // 빈 텍스트인 경우 삭제
      e.target.parentElement.remove();
      saveData();
    }

    saveData();
  });

  // Enter 키 이벤트
  categoryInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      ctgConfirmBtn.click(); // 확인 버튼 클릭과 동일한 동작
    }
  });

  // Escape 키 이벤트 - 편집 취소
  categoryInput.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      // 원래 텍스트로 복원
      categoryInput.remove();
      ctgConfirmBtn.remove();
      li.childNodes[0].nodeValue = originalText;
    }
  });
}
  /**
   * 
   * 카테고리 이름을 입력하는 input 창이 팝업형태로 생성
   * 카테고리 밑에있는 list들은 그 카테고리의 하위항목이 됨.
   * 
   * 카테고리를 드래그해 위치를 변경하면, 변경된 카테고리 밑에 있는 리스트들은 자동으로 그 카테고리의 하위항목으로 변경됨.
   * 더이상 카테고리의 하위항목이 아니게 된 리스트는 그 카테고리에서 벗어난다.
   * 반대로, 리스트를 드래그했을때도 이 규칙은 동일하게 적용됨.
   * 
   * 
   * 
   */
)




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

  const targetItem = e.target.closest("li");
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
