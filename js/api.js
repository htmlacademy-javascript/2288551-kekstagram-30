const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const BaseUrlRoute = {
  GET_DATA: '/data',
  SEND_DATA: '/7',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [HttpMethod.GET]: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  [HttpMethod.SEND]: 'Не удалось отправить форму. Попробуйте ещё раз',
};

// const load = (route, errorText, method = HttpMethod.GET, body = null) =>
//   fetch(`${BASE_URL}${route}`, {method, body})
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error();
//       }
//       return response.json();
//     })
//     .catch(() => {
//       throw new Error(errorText);
//     });

// const getData = async () => load(BaseUrlRoute.GET_DATA, ErrorText.GET);

// const sendData = async (body) => load(BaseUrlRoute.SEND_DATA, ErrorText.SEND, HttpMethod.POST, body);

// export { getData, sendData };

async function request(url, method = HttpMethod.GET, body = null) {
  const response = await fetch(url, { method, body });
  if(! response.ok){
    throw new Error(ErrorText[method]);
  }

  return response.json();
}

async function loadPictures() {
  return request(BASE_URL + BaseUrlRoute.GET_DATA);
}
async function sendPicture(pictureData) {
  return request(
    BASE_URL + BaseUrlRoute.SEND_DATA,
    HttpMethod.POST,
    pictureData
  );
}

export { loadPictures, sendPicture };
