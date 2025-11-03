import { db } from "./firebase.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

let activeDate = null;
const modal = document.getElementById("modal");

function key(date) {
  return date.toISOString().split("T")[0];
}

window.renderCalendar = async function () {
  const month = parseInt(document.getElementById("month").value) - 1;
  const year = parseInt(document.getElementById("year").value);
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);

  let html = "<table><tr>";
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
  for (let d of days) html += `<th>${d}</th>`;
  html += "</tr><tr>";

  let skip = (first.getDay() + 6) % 7;
  for (let i = 0; i < skip; i++) html += "<td></td>";

  for (let d = 1; d <= last.getDate(); d++) {
    let date = new Date(year, month, d);
    let k = key(date);

    const ref = doc(db, "calendar", k);
    let snap = await getDoc(ref);
    let entries = snap.exists() ? snap.data().entries : [];

    html += `<td class="day" onclick="openModal('${k}')">
      <div><b>${d}</b></div>
      ${entries
        .map(
          (e) =>
            `<div class='entry'>${e.name} → ${e.start}-${e.end}</div>`
        )
        .join("")}
    </td>`;

    if ((skip + d) % 7 === 0) html += "</tr><tr>";
  }

  html += "</tr></table>";
  document.getElementById("calendar").innerHTML = html;
};

window.openModal = async function (k) {
  activeDate = k;
  document.getElementById("selectedDate").innerText = k;

  let snap = await getDoc(doc(db, "calendar", k));
  let entries = snap.exists() ? snap.data().entries : [];

  document.getElementById("recordList").innerHTML = entries
    .map((e) => `${e.name} → ${e.start}-${e.end}`)
    .join("<br>");

  modal.style.display = "flex";
};

window.closeModal = function () {
  modal.style.display = "none";
};

window.saveEntry = async function () {
  let name = document.getElementById("nameInput").value;
  let start = document.getElementById("startInput").value;
  let end = document.getElementById("endInput").value;

  if (!name || !start || !end) {
    alert("Попълни всички полета!");
    return;
  }

  let ref = doc(db, "calendar", activeDate);
  let snap = await getDoc(ref);

  let entries = snap.exists() ? snap.data().entries : [];
  entries.push({ name, start, end });

  await setDoc(ref, { entries });

  closeModal();
  renderCalendar();
};
