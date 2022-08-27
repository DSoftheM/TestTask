'use strict';

const overlay = document.querySelector('.overlay');
const overlayBg = document.querySelector('.overlay__background');
const overlayClose = document.querySelector('.overlay__close');
const signUp = document.querySelector('.button');
const form = document.querySelector('.form-overlay');

const closeOverlay = () => overlay.classList.remove('overlay_open');
const openOverlay = () => overlay.classList.add('overlay_open');

const Status = {
    success: 'success',
    failed: 'failed',
};

signUp.addEventListener('click', () => {
    openOverlay();
});
overlayClose.addEventListener('click', () => {
    closeOverlay();
});
overlayBg.addEventListener('click', (event) => {
    closeOverlay();
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = document.querySelector('.form-overlay');
    const data = new FormData(form);
    for (const field of data.entries()) {
        if (field[1] === '') {
            displayResponseMsg(Status.failed, 'Заполните все поля');
            return;
        }
    }
    await sendData(data, 'https://jsonplaceholder.typicode.com/posts');
});

const sendData = async (data, path) => {
    const response = await fetch(path, {
        method: 'POST',
        body: data
    });
    if (response.ok) {
        const result = await response.json();
        console.log(result);
        displayResponseMsg(Status.success);
    } else {
        displayResponseMsg(Status.failed, response.status);
    }
};

function displayResponseMsg(status, code) {
    const overlayStatus = document.querySelector('.overlay__status');
    overlayStatus.classList.remove(...Object.values(Status));
    overlayStatus.classList.add(status);
    switch (status) {
        case Status.success:
            overlayStatus.textContent = 'Successful!';
            break;
        case Status.failed:
            overlayStatus.textContent = `Failed! Error: ${code}`;
            break;
        default:
            overlayStatus.textContent = 'Something went wrong...';
            break;
    }
    clearStatus(3000);
}

function clearStatus(time) {
    const overlayStatus = document.querySelector('.overlay__status');
    setTimeout(() => {
        overlayStatus.classList.remove(...Object.values(Status));
        overlayStatus.textContent = '';
    }, time);
}

