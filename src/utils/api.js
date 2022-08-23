import axios from "axios";
import { toHeaderCase } from "js-convert-case";
import {
  setErrCatch,
  setErrMessage,
  setErrSeverity,
} from "../../redux/crawlerConfig";
import { store } from "../../redux/store";
import * as url from "./urls";

let controller;

const ErrorViewer = (error) => {
  const errorList = [];
  if (error.response) {
    errorList.push(
      `Error :  ${error.response.status}  (${error.response.statusText})`
    );
    Object.keys(error.response.data).map((each) =>
      errorList.push(toHeaderCase(each) + ": " + error.response.data[each])
    );
    // alert(errorList.join("\n"));
    // console.log(error.response.headers);
    var message = errorList.join("\n");
    store.dispatch(setErrSeverity("error"));
    store.dispatch(setErrMessage(message));
    store.dispatch(setErrCatch(true));
  }
  // else if (error.request) {
  //   console.log(error.request);
  // } else {
  //   console.log("Error", error.message);
  // }
  // console.log(error.config);
};

export async function deleteAuthHeader() {
  delete axios.defaults.headers["Authorization"];
  delete axios.defaults.headers.common["Authorization"];
}
export async function setDefaultToken(accessToken) {
  return (axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`);
}

export async function getUserInfo(id) {
  return await axios.get(url.userInfoUrl(id)).catch((error) => {
    ErrorViewer(error);
  });
}

export async function getTaskHistory(id) {
  if (controller != undefined) {
    controller.abort();
  }
  controller = new AbortController();
  return await axios.get(url.taskHistoryUrl(id), {
    signal: controller.signal,
  });
}

export async function getPlatformHistory(id, type, platform) {
  if (controller != undefined) {
    controller.abort();
  }
  controller = new AbortController();
  return await axios.get(url.platformHistoryUrl(id, type, platform), {
    signal: controller.signal,
  });
}

export async function postTask(requestBody) {
  return await axios
    .post(url.postTaskUrl(), requestBody)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function postTBTask(requestBody) {
  return await axios
    .post(url.postTaskbasedUrl(), requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function postLegacy(requestBody) {
  return await axios
    .post(url.postLegacyUrl(), requestBody, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getData(task_id) {
  return await axios
    .get(url.getDataUrl(task_id))
    .then((res) => {
      return res.data.result;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function CreateSchedule(requestBody) {
  return await axios
    .post(url.ScheduleUrl(), requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function getSchedule() {
  return await axios.get(url.ScheduleUrl()).catch((error) => {
    ErrorViewer(error);
  });
}

export async function getMappedSchedule(id) {
  return await axios.get(url.MappingTableUrl(id)).catch((error) => {
    ErrorViewer(error);
  });
}

export async function updateSchedule(id, data) {
  return await axios
    .patch(url.ScheduleItemsUrl(id), data)
    .then(() => {
      return "Delete schedule successfully";
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function deleteSchedule(id) {
  return await axios
    .delete(url.ScheduleItemsUrl(id))
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function crontabDetail(id) {
  return await axios.get(url.CrontabItemsUrl(id)).catch((error) => {
    ErrorViewer(error);
  });
}

export async function jwtauthenticate(data) {
  return await axios
    .post(url.JWTAuthenticateUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
      return error;
    });
}

export async function Register(data) {
  return await axios
    .post(url.RegisterUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function refreshToken(refresh) {
  const data = {
    refresh: refresh,
  };
  return await axios
    .post(url.RefreshTokenUrl(), data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function GenerateApiKey(data) {
  return await axios
    .post(url.ApiKeyUrl(), data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function LogOut(refresh) {
  const data = {
    refresh_token: refresh,
  };
  return await axios
    .post(url.LogOutUrl(), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function UserUpdate(id, data) {
  return await axios
    .patch(url.UserUpdateUrl(id), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}

export async function ChangePassword(id, data) {
  return await axios
    .patch(url.ChangePasswordUrl(id), data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      ErrorViewer(error);
    });
}
