/* 
 * System Designer
 * 
 * https://designfirst.io/systemdesigner/
 *
 * Copyright 2019 Erwan Carriou
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  StatusBar.hide();

  // fix an issue with iOS 12 (@see https://github.com/apache/cordova-ios/issues/417#issuecomment-466520675)
  function ios12NotchFix(is_ios, keyboard_plugin_exists) {
    if (!is_ios || device.model.indexOf("iPhone") === -1) return false;
    if (!keyboard_plugin_exists) throw new Error("This fix depends on 'cordova-plugin-keyboard'!");
    const iphone_number = Number(device.model.replace("iPhone", "").replace(",", "."));
    const /* viewport metatag */
      viewport_el = document.getElementsByName("viewport")[0],
      default_content = "user-scalable=no, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1";

    if (iphone_number >= 10.6 || iphone_number === 10.3) { /* devices with notch: X, XR, ... */
      setCover();

      window.addEventListener('keyboardWillShow', setFix);
      window.addEventListener('keyboardWillHide', setCover);
    }
    function setCover() { viewport_el.content = default_content + ", viewport-fit=cover"; }
    function setFix() { viewport_el.content = default_content; }
  }

  ios12NotchFix(device.platform === "iOS", typeof Keyboard !== "undefined");
}

document.addEventListener('menubutton', onMenuButton, false);
function onMenuButton() {
  if (document.location.href.indexOf('/app/') !== -1) {
    document.location.href = '../index.html?messages=' + encodeURIComponent(JSON.stringify(mess));
  } else {
    document.location.href = 'index.html?messages=' + encodeURIComponent(JSON.stringify(mess));
  }
}

document.addEventListener('backbutton', systemDesignerBack, false);
function systemDesignerBack() {
  var mess = typeof messages !== 'undefined' ? messages : runtime.require('state').messages(),
    ref = typeof lastPage !== 'undefined' ? lastPage : runtime.require('state').lastPage();

  if (document.location.href.indexOf('/app/') !== -1) {
    document.location.href = '../' + ref + '?messages=' + encodeURIComponent(JSON.stringify(mess));
  } else {
    document.location.href = ref + '?messages=' + encodeURIComponent(JSON.stringify(mess));
  }
}