// الإيميلات المسموح لها بإضافة المشاريع
const allowedEmails = [
"admin@gmail.com",
"teacher@gmail.com",
"student@gmail.com"
];

// التحقق من الإيميل
function isAllowed(email) {
return allowedEmails.includes(
email.trim().toLowerCase()
);
}

// تسجيل الدخول
function loginWithEmail(email) {
email = email.trim().toLowerCase();

if (isAllowed(email)) {
    localStorage.setItem("authorizedEmail", email);
    return true;
}

return false;

}

// التحقق من المستخدم الحالي
function isLoggedIn() {
const email = localStorage.getItem("authorizedEmail");

return !!email && isAllowed(email);

}

// تسجيل الخروج
function logout() {
localStorage.removeItem("authorizedEmail");
location.href = "login.html";
}

// ربط زر الإضافة
document.addEventListener("DOMContentLoaded", function() {

const page = location.pathname.toLowerCase();
const currentPage = page.split("/").pop();

// منع الدخول لصفحة الإضافة بدون تسجيل الدخول
if (currentPage === "add.html" && !isLoggedIn()) {
    location.replace("login.html");
    return;
}

const addButton = document.getElementById("addButton");

if (addButton) {
    if (isLoggedIn()) {
        addButton.textContent = "إضافة مشروع";
        addButton.onclick = function() {
            location.href = "add.html";
        };
    } else {
        addButton.textContent = "تسجيل الدخول للإضافة";
        addButton.onclick = function() {
            location.href = "login.html";
        };
    }
}

});