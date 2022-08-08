---
title: a标签下载限制
date: 2022-08-08 10:34:36
permalink: /pages/b4f229/
sidebar: auto
categories:
  - 随笔
tags:
  - 
---
# a标签 href 长度过长，导致下载失败的问题

## 起因

在一个项目中，需要前端根据dom生成图片来进行下载，生成图片使用的 html2canvas ，然后通过 canvas 的 api 获取到图片的 base64数据，然后把数据给到 a标签的 href 属性，通过触发 a 标签的 onclick 事件进行下载~ 

整个过程在 chrome 中没有问题， edge 中也没有问题

但是在 客户使用的 360浏览器中，出现了问题

下载时会弹出下载窗口，数据大小为 0b，没有下载名称，没有来源

最后发现是因为 a 标签的 href 属性过长导致的下载失败

## 解决

将 base64 dataURI 转换为 Blob 文件对象，然后 通过 a 标签下载 Blob 即可

### before
```js
  var w = $("#poster-wrapper").width();
  var h = $("#poster-wrapper").height();
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var scaleBy = 2;


  canvas.width = w * scaleBy;
  canvas.height = h * scaleBy;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  html2canvas($("#poster-wrapper")[0], {
    allowTaint: true,
    taintTest: true,
    scale:scaleBy,
    canvas: canvas,
    width:w, //dom 原始宽度
    height:h, //dom 原始高度
  }).then(function (canvas) {
      var url = canvas.toDataURL("image/png"); //base64数据
      var download = $('<a></a>')
        .attr("href", url)
        .attr(
          "download",
         'test.png'
        );
      download[0].click();
  })
}
```

### after
```js
function dataURIToBlob(dataURI) {
  var binStr = atob(dataURI.split(',')[1]),
    len = binStr.length,
    arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  return new Blob([arr]);
}
var url = canvas.toDataURL("image/png"); //base64数据
var downloadUrl = URL.createObjectURL(dataURIToBlob(url))
var download = $('<a></a>')
  .attr("href", downloadUrl)
  .attr(
    "download",
    'test.png'
  );
// ...

// ...
```

## 浏览器对 a 标签 href 长度的限制

IE 最大长度限制为 2048 字节

Chrome 最大长度限制为 8182 字节

Firefox 最大长度限制为 65536 字节

Safari 最大长度限制为 80000 字节

Opera 最大长度限制为 190000 字节