import {notification} from 'antd';

/**
 * 获取设备类型
 * @param {number} type 设备类型
 */
export function getDeviceType(type) {
  let deviceLabel = 'Other', deviceIcon = 'vc-Other';
  switch (type) {
    case 0:
      deviceLabel = 'Router';
      deviceIcon = 'vc-routerBar';
      break;
    case 1:
      deviceLabel = 'Android';
      deviceIcon = 'vc-android';
      break;
    case 2:
      deviceLabel = 'iOS';
      deviceIcon = 'vc-iOS';
      break;
    case 3:
      deviceLabel = 'PC';
      deviceIcon = 'vc-PC';
      break;
    case 4:
      deviceLabel = 'MAC';
      deviceIcon = 'vc-macos';
      break;
    case 5:
      deviceLabel = 'Vrouter';
      deviceIcon = 'vc-router';
      break;
    case 6:
      deviceLabel = 'Linux';
      deviceIcon = 'vc-linux';
      break;
    case 7:
      deviceLabel = 'Other';
      deviceIcon = 'vc-Other';
      break;
    default:
      break;
  }
  return { deviceLabel, deviceIcon };
}

/**
 * 获取长度为32为的 唯一字符串 (主键)
 */
export function guid() {
  var len = 32; //32长度
  var radix = 16; //16进制
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

/**
 * 十六进制颜色值转为RGB颜色值
 * @param {string} sColor 十六进制颜色值
 */
export function colorRGB(sColor) {
  sColor = sColor.toLowerCase();
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i=1; i<4; i+=1) {
              sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
          }
          sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var j=1; j<7; j+=2) {
          sColorChange.push(parseInt("0x"+sColor.slice(j, j+2)));    
      }
      return "RGB(" + sColorChange.join(",") + ")";
  }
  return sColor;
}

/**
 * 判断颜色是否为浅色
 * @param {string} _color 颜色值
 */
export function isLightColor(_color) {
  let color = _color;
  if (_color.indexOf('#') > -1) {
    color = colorRGB(_color);
  }
  color = color.toLowerCase();
  let RgbValue = color.replace("rgb(", "").replace(")", "");
  let RgbValueArry = RgbValue.split(",");
  let $grayLevel = RgbValueArry[0] * 0.299 + RgbValueArry[1] * 0.587 + RgbValueArry[2] * 0.114;
  return $grayLevel >= 192;
}

/**
 * 主动触发窗口变化事件
 * @param {number} delay 延迟多少毫秒触发
 */
export function triggerWindowResize(delay) {
  setTimeout(() => {
    var e = document.createEvent('Event');
    e.initEvent('resize', true, true);
    window.dispatchEvent(e);
  }, delay || 200);
}

/**
 * 生成一个 min - max 包含min不包含max的随机整数 [min, max)
 * @param {number} min 最小值
 * @param {number} max 最大值 + 1
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 查询当前屏幕断点
 */
export function QueryBreakPoint() {
  let screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (screenWidth < 576) {
      return 'xs';
  } else if (screenWidth >= 576 && screenWidth < 768) {
      return 'sm';
  } else if (screenWidth >= 768 && screenWidth < 992) {
      return 'md';
  } else if (screenWidth >= 992 && screenWidth < 1200) {
      return 'lg';
  } else if (screenWidth >= 1200 && screenWidth < 1600) {
      return 'xl';
  } else {
      return 'xxl';
  }
}

/**
 * 判断是否小屏
 */
export function isSmallScreen(breakPoint) {
  return breakPoint === 'sm' || breakPoint === 'xs' || breakPoint === 'md';
}

/**
 * 系统统一消息提示框
 * 参数 title, content, type   三个参数均为可选项
 * @param {string} title: 提示框标题  默认标题：系统提示
 * @param {string} content: 提示内容  默认内容：系统消息！
 * @param {string} type: 提示类型  sucess-成功; error-错误; info-提示信息   默认为：info，若type不填写，将会根据内容中的特殊字符自动判断类型
 */
export function noticeMessage(title, content, type) {
  let _type = type;
  if (!type && content) {
    let successes = ['成功', 'suscess'];
    for (let i = 0; i < successes.length; i++) {
      if (content.indexOf(successes[i]) > -1) {
        _type = 'success';
        break;
      }
    }
    if (!_type) {
      let errors = ['错误', '失败', 'error', 'failed'];
      for (let j = 0; j < errors.length; j++) {
        if (content.indexOf(errors[j]) > -1) {
          _type = 'error';
          break;
        }
      }
    }
    _type = _type || 'info';
  }
  notification.config({
    placement: 'topRight',
    top: 56,
  });
  notification[_type]({
    message: title || '系统提示',
    description: content || '系统消息！',
  });
}

/**数组根据数组对象中的某个属性值进行排序的方法
	* 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
	* @param {string} attr 排序的属性 如number属性
	* @param {boolean} rev true表示升序排列，false降序排序
	* */
export function sortBy(attr, rev) {
		//第二个参数没有传递 默认升序排列
    if(rev === undefined){
      rev = 1;
    }else{
      rev = (rev) ? 1 : -1;
    }
    return function(a,b){
      a = a[attr];
      b = b[attr];
      if(a < b){
        return rev * -1;
      }
      if(a > b){
        return rev * 1;
      }
      return 0;
    }
}

/**
 * 表格排序 sorter: (a, b) => tableSort(a, b, 'name')
 * @param {object} a 对象a
 * @param {object} b 对象b
 * @param {string} key 排序字段
 * @param {string} type 字段类型
 */
export function tableSort(a, b, key, type) {
  if (a[key] !== undefined && b[key] !== undefined) {
    if (!type) {
      if (a[key]) {
        type = typeof a[key];
      } else if(b[key]) {
        type = typeof b[key];
      }
    }
    switch (type) {
      case 'string':
        return (b[key] || "").localeCompare((a[key] || ""));
      case 'number':
        return (b[key] || 0) - (a[key] || 0);
      case 'boolean':
        return Number((b[key] || false)) - Number((a[key] || false));
      default:
        return 0;
    }
  } else {
    return 0;
  }
}