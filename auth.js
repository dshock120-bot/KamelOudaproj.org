// إعداد Appwrite
const client = new Appwrite.Client();

client
.setEndpoint("https://fra.cloud.appwrite.io/v1")
.setProject("6afdd0d200116344a36e");

const account = new Appwrite.Account(client);

// التحقق من تسجيل الدخول
async function isLoggedIn() {
try {
const user = await account.get();

    return user.email.toLowerCase() === "teacher@gmail.com";

} catch (error) {
    return false;
}

}

// الحصول على المستخدم الحالي
async function getCurrentUser() {
try {
return await account.get();
} catch (error) {
return null;
}
}

// تسجيل الخروج
async function logout() {
try {
await account.deleteSession({
sessionId: "current"
});
} catch (error) {
console.error(error);
}

location.href = "login.html";

}

// حماية صفحة الإضافة
document.addEventListener("DOMContentLoaded", async function() {

const page = location.pathname.toLowerCase();
const currentPage = page.split("/").pop();

if (currentPage === "add.html") {

    const loggedIn = await isLoggedIn();

    if (!loggedIn) {
        location.replace("login.html");
        return;
    }
}

const addButton = document.getElementById("addButton");

if (addButton) {

    const loggedIn = await isLoggedIn();

    if (loggedIn) {
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
