/* eslint-disable no-script-url */
/* eslint-disable no-useless-escape */
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router";
import { message } from "antd";
export const onlyAlpha = (text) =>
  text
    .replace(/[0-9\/]+/g, "")
    .replace(/[-!$%^&*()_+|~=`{}[\]:";'<>?,.@#\/]/g, "")
    .replace("\\", "");
export const onlyNumeric = (text) =>
  text
    .replace(/[^0-9\/]+/g, "")
    .replace(/[-!$%^&*()_+|~=`{}[\]:";'<>?,.@#\/]/g, "")
    .replace("\\", "");

export const onlyAlphaNumeric = (text) => text.replace(/[^A-Za-z0-9]/g, "");

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const getDataSession = () => {
  const access_token = localStorage.getItem("access_token");
  try {
    //checking jwt
    jwtDecode(access_token, { header: true });
    const data = jwtDecode(access_token);
    if (Date.now() >= data.exp * 1000) {
      localStorage.removeItem("access_token");
    }
    if (data.user_id == null || data.role == null) {
      localStorage.removeItem("access_token");
      return undefined;
    }
    return data;
  } catch {
    localStorage.removeItem("access_token");
    return undefined;
  }
};
export const getDataAdminSession = () => {
  const admin_access_token = localStorage.getItem("admin_access_token");
  try {
    //checking jwt
    jwtDecode(admin_access_token, { header: false });
    const data = jwtDecode(admin_access_token);
    if (Date.now() >= data.exp * 1000) {
      localStorage.removeItem("admin_access_token");
    }
    if (data.username == null || data.role == null) {
      localStorage.removeItem("admin_access_token");
      return undefined;
    }
    return data;
  } catch (e){
    localStorage.removeItem("admin_access_token");
    return undefined;
  }
};


export const xssValid = (value) =>
  value.match(/(<[^>]*>)/g) != null ||
  value.toLowerCase().includes("javascript:") ||
  value.toLowerCase().includes("data:")
    ? Promise.reject("Teks tidak valid!")
    : Promise.resolve();

export const xssValidBool = (value) =>
  value.match(/(<[^>]*>)/g) != null ||
  value.toLowerCase().includes("javascript:") ||
  value.toLowerCase().includes("data:")
    ? false
    : true;

export const formatMoney = (num) => {
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};

export const capitalize = (str, allWord) => {
  const cap = (text) => `${text[0].toUpperCase()}${text.slice(1)}`;
  return allWord
    ? str
        .split(" ")
        .map((word) => cap(word))
        .join(" ")
    : cap(str);
};

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const scrollToBottomChat = () => {
  var chatWindow = document.getElementById("content-discus");
  var xH = chatWindow.scrollHeight;
  chatWindow.scrollTo(0, xH);
};

export const monthName = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const dayInWeek = [
  { name: "Se", fullName: "Senin" },
  { name: "Se", fullName: "Selasa" },
  { name: "Ra", fullName: "Rabu" },
  { name: "Ka", fullName: "Kamis" },
  { name: "Ju", fullName: "Jumat" },
  { name: "Sa", fullName: "Sabtu" },
  { name: "Mi", fullName: "Minggu" },
];

export const convertDate = (item) => {
  const newDate = new Date(item);
  const date = newDate.getDate();
  const monthsx = newDate.getMonth();
  const year = newDate.getFullYear();
  const month = monthName[monthsx];
  let h = newDate.getHours().toString();
  let m = newDate.getMinutes().toString();
  let s = newDate.getSeconds().toString();
  if (h.length < 2) {
    h = `0${h}`;
  }
  if (m.length < 2) {
    m = `0${m}`;
  }
  if (s.length < 2) {
    s = `0${s}`;
  }
  const dTime = h + ":" + m;
  return {
    date,
    month,
    year,
    dTime,
    full: `${date} ${month} ${year}`,
    ddmmyyyy: `${date}-${String(newDate.getMonth()).padStart(2, "0")}-${year}`,
    yyyymmdd: `${year}-${String(newDate.getMonth()).padStart(2, "0")}-${date}`,
  };
};

export function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    console.log("You can only upload JPG/PNG file!");
    message.error("Format Gambar Harus JPG/PNG");
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    console.log("Image must smaller than 5MB!");
    message.error("Gambar Tidak Boleh Melebihi 5MB");
  }
  return isJpgOrPng && isLt5M;
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}