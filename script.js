import { db, doc, getDoc, setDoc } from "./firebase.js";

const calendar = document.getElementById("calendar");
let currentYear = 2025;
let currentMonth = 6;
let currentDate = "";
let eventData = {};

function updateMonthDisplay() {
  document.getElementById("currentMonth").textContent = `${currentYear}년 ${currentMonth}월`;
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
    const dateStr = `${year}-${month.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;
    cell.onclick = () => selectDate(dateStr);
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
  document.getElementById("selectedDate").textContent = `📅 ${dateStr}`;
  document.getElementById("eventText").value = "";

  const ref = doc(db, "schedules", dateStr);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    eventData[dateStr] = snap.data().events;
  } else {
    eventData[dateStr] = [];
  }

  renderEventList();
}

async function saveEvent() {
  const text = document.getElementById("eventText").value.trim();
  if (!currentDate || !text) return alert("날짜 선택 후 내용을 입력하세요.");

  if (!eventData[currentDate]) eventData[currentDate] = [];
  eventData[currentDate].push(text);

  const ref = doc(db, "schedules", currentDate);
  await setDoc(ref, { events: eventData[currentDate] });

  document.getElementById("eventText").value = "";
  renderEventList();
}

async function deleteEvent(index) {
  if (!eventData[currentDate]) return;
  eventData[currentDate].splice(index, 1);

  const ref = doc(db, "schedules", currentDate);
  if (eventData[currentDate].length === 0) {
    await setDoc(ref, { events: [] });
  } else {
    await setDoc(ref, { events: eventData[currentDate] });
  }

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
    div.textContent = `📝 ${event}`;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteEvent(index);
    div.appendChild(btn);
    list.appendChild(div);
  });
}

generateCalendar(currentYear, currentMonth);
