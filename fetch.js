let gallery = document.getElementsByClassName('grid-container')[0];
let loaderImg = document.getElementsByClassName('lds-spinner')[0];
let loaderForm = document.getElementsByClassName('lds-spinner')[1];
let updateButton = document.getElementById('update');
let form = document.getElementsByClassName('temp-message')[0];

updateButton.addEventListener('click', () => {
    getData();
})

async function getData() {
    let response = null;

    gallery.innerHTML = '';
    loaderImg.style.display = 'block';

    try {
        response = await fetch('http://slavaver.space/images');

        if (response.status == 200) {
            let data = await response.json();
            loaderImg.style.display = 'none';

            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    let galleryItem = document.createElement('div');
                    let galleryImg = document.createElement('img');
                    let galleryText = document.createElement('span');

                    galleryText.innerHTML = data[i].description;

                    galleryImg.src = data[i].url;
                    galleryImg.alt = data[i].alt;

                    galleryItem.classList.add('grid-item')

                    galleryItem.appendChild(galleryImg);
                    galleryItem.appendChild(galleryText);

                    gallery.appendChild(galleryItem);
                }
            } else {
                // gallery.appendChild(message);
                settings.name = 'Error';
                settings.message = 'No images found';
                createToast(settings, 'red', gallery);
            }
        } else {
            settings.name = res.status;
            settings.message = res.message;

            createToast(settings, 'red', gallery);
        }
    } catch (err) {
        loaderImg.style.display = 'none';

        settings.name = "Connection error";
        settings.message = err;

        createToast(settings, 'red', gallery);
    }
}

let settings = {
    name: "",
    message: ""
}

function createToast(settings, color, block) {
    const toast = document.createElement('div');
    const toastName = document.createElement('p');
    const toastBtn = document.createElement('button');
    const toastMessage = document.createElement('p');

    toast.classList.add('toast');
    toastName.classList.add('toast__name')
    toastBtn.classList.add('toast__close-btn');
    toastMessage.classList.add('toast__message');

    toastBtn.setAttribute('aria-label', 'Close toast')

    toastBtn.innerHTML = '&times;';
    toastName.innerHTML = settings.name;
    toastMessage.innerHTML = settings.message;

    toastBtn.onclick = function (event) {
        event.target.parentNode.parentNode.classList.add('toast__hidden');
    }

    toast.appendChild(toastBtn);
    toast.appendChild(toastName);
    toast.appendChild(toastMessage);

    block.appendChild(toast);
    toast.children[1].style.color = color;
    toast.children[2].style.color = color;
}

// -----

let tempForm = document.getElementById("temp");
let tempClass = tempForm.querySelector("input[name='class']");
let tempTemp = tempForm.querySelector("input[name='temp']");
let tempFormSubmit = tempForm.getElementsByTagName("button")[0];

tempForm.onsubmit = async (event) => {

    event.preventDefault();
    form.innerHTML = '';
    loaderForm.style.display = 'block';

    let data = {
        class: tempClass.value,
        temp: Number(tempTemp.value)
    };

    tempClass.setAttribute("disabled", "disabled");
    tempTemp.setAttribute("disabled", "disabled");

    let response = await fetch('http://slavaver.space/temp', {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(data)
    });

    let res = await response.json();

    settings.name = res.status;
    settings.message = res.message;


    if (response.status == 200) {
        loaderForm.style.display = 'none';
        tempClass.removeAttribute("disabled", "disabled");
        tempTemp.removeAttribute("disabled", "disabled");

        createToast(settings, 'green', form);
        tempClass.value = '';
        tempTemp.value = '';
    } else {
        loaderForm.style.display = 'none';
        tempClass.removeAttribute("disabled", "disabled");
        tempTemp.removeAttribute("disabled", "disabled");

        createToast(settings, 'red', form);
    }
}

