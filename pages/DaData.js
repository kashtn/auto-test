import { Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetting, setSearchValue, setData } from "../redux/actions";
import Link from "next/link";

const { Search } = Input;

export default function DaData({ serverResult }) {
  // const { data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [fromServer, setFromServer] = useState(serverResult);

  useEffect(() => {
    async function load() {
      let result = Math.ceil(Math.random() * 100);
      function check() {
        if (result <= 83 && result !== 17) {
          return result;
        } else {
          result = Math.ceil(Math.random() * 100);
          check();
        }
      }
      check();
      const response = await fetch(`https://swapi.dev/api/people/${result}/`);
      const data = await response.json();
      setFromServer(data);
    }
    if (!serverResult) {
      // dispatch(startGetting());
      load();
    } else {
      dispatch(setData(serverResult));
    }
  }, []);

  async function getData(num) {
    const response = await fetch(`https://swapi.dev/api/people/${num}/`);
    const data = await response.json();
    return data;
  }

  async function onSearch(value) {
    if (value <= 83) {
      // dispatch(startGetting(value)); //запрос через thunk
      dispatch(setSearchValue(value));
      dispatch(setData(await getData(value)));
      setFromServer(await getData(value));

      //если запрос удался , сохраняем его в базу

      // if (response.status === 200) {
      //   await fetch("/saveRequest", {
      //     method: "POST",
      //     mode: "no-cors",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(value),
      //   });
      // }
    } else {
      alert("Введите число меньше 84!");
    }
  }

  if (!fromServer) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="head">
          <h1>DaData</h1>
          <div>
            <Link href="/">
              <a>Back</a>
            </Link>
          </div>
          <Search
            placeholder="Введите число"
            maxLength="2"
            onSearch={onSearch}
            enterButton
            style={{ width: 200 }}
          />
        </div>
        <pre>{JSON.stringify(fromServer, null, 2)}</pre>
      </div>
    </>
  );
}

DaData.getInitialProps = async (context) => {
  // let url = "https://cleaner.dadata.ru/api/v1/clean/address";
  // var token = "7b33d5145beb9a304252ea3cc23b5cd6f5a1a137";
  // var secret = "5ca97217904d454a179b05ea7f72d9953901a7f3";
  // let query = "мск сухонска 11/-89";

  // let options = {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Token " + token,
  //     "X-Secret": secret,
  //   },
  //   body: JSON.stringify([query]),

  if (!context.req) {
    return {
      serverResult: null,
    };
  }
  let result = Math.ceil(Math.random() * 100);
  function check() {
    if (result <= 83 && result !== 17) {
      return result;
    } else {
      result = Math.ceil(Math.random() * 100);
      check();
    }
  }
  check();
  const response = await fetch(`https://swapi.dev/api/people/${result}/`);
  const serverResult = await response.json();
  return {
    serverResult,
  };
};
