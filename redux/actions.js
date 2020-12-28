import { SET_DATA, SET_SEARCH_VALUE } from "./actionTypes";

export function startGetting(query) {
  return async function (dispatch) {
    let cors = "http://localhost:8080/";
    let url = "https://cleaner.dadata.ru/api/v1/clean/address";
    var token = "7b33d5145beb9a304252ea3cc23b5cd6f5a1a137";
    var secret = "5ca97217904d454a179b05ea7f72d9953901a7f3";
    let query1 = "мск сухонска 11/-89";
    !query && dispatch(setSearchValue(query1));

    let options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
        "X-Secret": secret,
      },
      body: JSON.stringify([query ? query : query1]),
    };

    fetch(cors + url, options)
      .then((response) => response.json())
      .then((result) => dispatch(setData(result)))
      .catch((error) => console.log("error", error));
  };
}

export function setData(data) {
  return {
    type: SET_DATA,
    payload: data,
  };
}

export function setSearchValue(value) {
  return {
    type: SET_SEARCH_VALUE,
    payload: value,
  };
}
