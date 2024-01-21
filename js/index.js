const daysTag = document.querySelector(".days");
const notepad = document.getElementById('notepad');
const removeBtn = document.getElementById('removeBtn');
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();
const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const renderCalendar = () => {
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    } for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    } for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}; renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

window.onload = () => {
    const savedContent = localStorage.getItem('notepadContent');
    if (savedContent) {
        notepad.value = savedContent;
    }
};

notepad.addEventListener('input', () => {
    localStorage.setItem('notepadContent', notepad.value);
});

removeBtn.addEventListener('click', () => {
    if (notepad.value.trim() === '') {
        Swal.fire('Please Fill in Notepad');
    } else {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this note!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Dalate',
            cancelButtonText: 'Cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('notepadContent');
                notepad.value = '';
                Swal.fire("Deleted!", "Your note has been deleted.", "success", {
                    icon: 'success',
                });
            } else {
                Swal.fire('Your note is safe!');
            }
        });
    }
});