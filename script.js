const calendar = document.getElementById("calendar");
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

function selectDate(dateStr) {
  document.getElementById("selectedDate").textContent = `📅 ${dateStr}`;
  document.getElementById("eventText").value = eventData[dateStr] || "";
  document.getElementById("eventList").textContent = eventData[dateStr]
    ? `📝 일정: ${eventData[dateStr]}`
    : "등록된 일정 없음";
}

function saveEvent() {
  const dateStr = document.getElementById("selectedDate").textContent.replace("📅 ", "");
  const text = document.getElementById("eventText").value.trim();
  if (!dateStr || !text) return alert("날짜 선택 후 내용을 입력하세요.");
  eventData[dateStr] = text;
  alert("✅ 저장 완료!");
  selectDate(dateStr);
}

generateCalendar(2025, 6);
