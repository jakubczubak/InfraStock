const logout_btn = document.getElementById('logout');
const logout_popup = document.getElementById('logout_popup');
const logout_btn_confirm = document.getElementById('logout_btn_confirm');
const logout_btn_cancel = document.getElementById('logout_btn_cancel');

logout_btn.addEventListener('click', function () {
    logout_popup.classList.add('active');
});

logout_btn_cancel.addEventListener('click',function () {
    logout_popup.classList.remove('active');
});
logout_btn_confirm.addEventListener('click', function () {
    window.location.href="/logout";
});