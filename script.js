const calendar = document.getElementById("calendar");
// ✅ 배열 기반으로 일정 저장
const eventData = {};

function generateCalendar(year, month) {
  calendar.innerHTML = "";
  const date = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  let row = calendar.insertRow();

  for (let i = 0; i < date.getDay(); i++) row.insertCell();

  for (let d = 1; d <= daysInMonth; d++) {
    if (date.getDay() === 0 && d !== 1) row = calendar.insertRow();
    const cell = row.insertCell();
    const span = document.createElement("span");
    span.textContent = d;
    cell.appendChild(span);
    const dateStr = `${year}-${month.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;
    cell.onclick = () => selectDate(dateStr);
    date.setDate(date.getDate() + 1);
  }
}

let currentDate = "";

function selectDate(dateStr) {
  currentDate = dateStr;
  document.getElementById("selectedDate").textContent = `📅 ${dateStr}`;
  document.getElementById("eventText").value = "";
  renderEventList();
}

function saveEvent() {
  const text = document.getElementById("eventText").value.trim();
  if (!currentDate || !text) return alert("날짜 선택 후 내용을 입력하세요.");
  
  if (!eventData[currentDate]) eventData[currentDate] = [];
  eventData[currentDate].push(text); // ✅ 배열에 추가
  document.getElementById("eventText").value = "";
  renderEventList();
}

function deleteEvent(index) {
  if (!eventData[currentDate]) return;
  eventData[currentDate].splice(index, 1); // 배열에서 삭제
  if (eventData[currentDate].length === 0) delete eventData[currentDate]; // 다 지워지면 항목 제거
  renderEventList();
}

function renderEventList() {
  const list = document.getElementById("eventList");
  list.innerHTML = "";

  if (!eventData[currentDate] || eventData[currentDate].length === 0) {
    list.textContent = "등록된 일정 없음";
    return;
  }

  eventData[currentDate].forEach((event, index) => {
    const div = document.createElement("div");
    div.textContent = `📝 ${event} `;
    
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.marginLeft = "10px";
    btn.onclick = () => deleteEvent(index);
    
    div.appendChild(btn);
    list.appendChild(div);
  });
}

generateCalendar(2025, 6);
