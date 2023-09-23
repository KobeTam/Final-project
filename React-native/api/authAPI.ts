import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export async function localLoginAPI(email: string, password: string) {
  // const res = await fetch(`${process.env.REACT_NATIVE_APP_API_SERVER}/login`, {
  const res = await fetch(API_URL + `/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const result = await res.json();
  console.log("localLoginAPI result: ", result);

  if (res.status === 200) {
    console.log("result.token: ", result.token);
    await AsyncStorage.setItem("token", JSON.stringify(result.token));

    const storedTokenString = await AsyncStorage.getItem("token");
    const storedToken = storedTokenString
      ? JSON.parse(storedTokenString)
      : null;
    console.log(storedToken);
    return result.token;
  } else {
    return "";
  }
}

export async function registerAPI(
  email: string,
  password: string,
  nickname: string
) {
  const res = await fetch(API_URL + `/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      nickname
    })
  });

  const result = await res.json();
  if (res.status === 200) {
    console.log("result.token: ", result.token);

    AsyncStorage.setItem("token", result.token);
    return true;
  } else {
    return false;
  }
}
