import $ from "jquery";

class requestApi {
  constructor() {
    this.serviceUrl = Window.AppConfig.serviceUrl;
    this.apiVersion = Window.AppConfig.apiVersion;
  }

  get({ url, params, callback, errorCallback, withoutVersion }) {
    if (params) {
      Object.keys(params).forEach((key, index) => {
        let conn = index === 0 ? "?" : "&";
        url += conn + key + "=" + params[key];
      });
    }
    $.ajax({
      type: "GET",
      url: `${this.serviceUrl}${withoutVersion ? "" : this.apiVersion}${url}`,
      contentType: "application/json",
      dataType: "json",
      xhrFields: {
        withCredentials: true
      },
      ...this.resultHandle(callback, errorCallback)
    });
  }

  post({ url, params, callback, errorCallback, withoutVersion }) {
    $.ajax({
      type: "POST",
      url: `${this.serviceUrl}${withoutVersion ? "" : this.apiVersion}${url}`,
      contentType: "application/json",
      dataType: "json",
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(params),
      ...this.resultHandle(callback, errorCallback)
    });
  }

  resultHandle = (callback, errorCallback) => {
    return {
      success: res => {
        if (res.code && res.code === 200) {
          callback && callback(res.data);
        } else {
          errorCallback && errorCallback(res);
        }
      },
      error: function() {
        errorCallback && errorCallback({ code: 1, msg: "请求失败" });
      }
    };
  };

  userLogin(param, callback, errorCallback) {
    let params = {
      username: param.userName,
      password: param.password
    };
    this.post({
      url: "/login",
      params,
      callback,
      errorCallback,
      withoutVersion: true
    });
  }

  otherLogin(params, callback, errorCallback) {
    let paramStr = "";
    let _type = params.type;
    delete params.type;
    Object.keys(params).forEach(key => {
      if (paramStr === "") {
        paramStr += "?";
      } else {
        paramStr += "&";
      }
      paramStr += key + "=" + params[key];
    });
    let url = `/oauth/callback/${_type}${paramStr}`;
    this.get({
      url,
      callback,
      errorCallback,
      withoutVersion: true
    });
  }

  searchUserTeam(callback, errorCallback) {
    this.get({
      url: "/client/searchteam",
      callback,
      errorCallback
    });
  }

  searchTeamById(params, callback, errorCallback) {
    let param = { teamid: params.teamId };
    this.post({
      url: "/client/searchteambyid",
      params: param,
      callback,
      errorCallback
    });
  }
}

const RequestApi = new requestApi();
export default RequestApi;
