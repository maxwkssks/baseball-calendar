import { db, doc, getDoc, setDoc } from "./firebase.js";

const calendar = document.getElementById("calendar");
const currentMonthText = document.getElementById("currentMonth");
const selectedDateText = document.getElementById("selectedDate");
const eventText = document.getElementById("eventText");
const eventList = document.getElementById("eventList");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentYear = 2025;
let currentMonth = 6;
let currentDate = "";
let eventData = {}; // { 날짜: [일정1, 일정2, ...] }

function updateMonthDisplay() {
  currentMonthText.textContent = `${currentYear}년 ${currentMonth}월`;
}

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

    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cell.addEventListener("click", () => selectDate(dateStr));

    date.setDate(date.getDate() + 1);
  }

  updateMonthDisplay();
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
}

async function selectDate(dateStr) {
  currentDate = dateStr;
  selectedDateText.textContent = `📅 ${dateStr}`;
  eventText.value = "";

  try {
    const ref = doc(db, "schedules", dateStr);
    const snap = await getDoc(ref);
    eventData[dateStr] = snap.exists() ? snap.data().events : [];
  } catch (e) {
    console.error("Firestore 읽기 오류:", e);
    eventData[dateStr] = [];
  }

  renderEventList();
}

async function saveEvent() {
  const text = eventText.value.trim();
  if (!currentDate || !text) return alert("날짜 선택 후 내용을 입력하세요.");

  if (!eventData[currentDate]) eventData[currentDate] = [];
  eventData[currentDate].push(text);

  try {
    await setDoc(doc(db, "schedules", currentDate), {
      events: eventData[currentDate]
    });
    eventText.value = "";
    renderEventList();
  } catch (e) {
    console.error("Firestore 저장 오류:", e);
    alert("❌ 저장에 실패했습니다.");
  }
}

async function deleteEvent(index) {
  if (!eventData[currentDate]) return;
  eventData[currentDate].splice(index, 1);

  try {
    await setDoc(doc(db, "schedules", currentDate), {
      events: eventData[currentDate]
    });
    renderEventList();
  } catch (e) {
    console.error("Firestore 삭제 오류:", e);
    alert("❌ 삭제에 실패했습니다.");
  }
}

function renderEventList() {
  eventList.innerHTML = "";

  if (!eventData[currentDate] || eventData[currentDate].length === 0) {
    eventList.textContent = "등록된 일정 없음";
    return;
  }

  eventData[currentDate].forEach((event, index) => {
    const div = document.createElement("div");
    div.textContent = `📝 ${event}`;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.addEventListener("click", () => deleteEvent(index));
    div.appendChild(btn);
    eventList.appendChild(div);
  });
}

// ✅ 이벤트 리스너 등록
saveBtn.addEventListener("click", saveEvent);
deleteBtn.addEventListener("click", () => {
  if (eventData[currentDate] && eventData[currentDate].length > 0) {
    deleteEvent(eventData[currentDate].length - 1);
  }
});
prevBtn.addEventListener("click", prevMonth);
nextBtn.addEventListener("click", nextMonth);

// ✅ 초기 달력 렌더링
generateCalendar(currentYear, currentMonth);
