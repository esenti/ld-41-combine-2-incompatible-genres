(function() {
 var DEBUG, before, c, clamp, collides, ctx, delta, draw, elapsed, keysDown, keysPressed, load, loading, now, ogre, setDelta, tick, update;

 c = document.getElementById('draw');

 ctx = c.getContext('2d');

 delta = 0;

 now = 0;

 before = Date.now();

 elapsed = 0;

 loading = 0;

 DEBUG = false;
//  DEBUG = true;

 c.width = 800;

 c.height = 600;

 keysDown = {};

 keysPressed = {};

 images = [];

 audios = [];

 framesThisSecond = 0;
 fpsElapsed = 0;
 fps = 0

 ttp = 0

 click = false
 down = false

 clicked = 0;

 text = '>';
 score = 0;

 window.addEventListener("keydown", function(e) {
         keysDown[e.keyCode] = true;
         console.log(e);

         if(e.code == "Backspace" && text.length > 1) {
            text = text.slice(0, -1);
         } else if(e.code == "Enter") {
            if(text == ">click") {
                score++;
                clicked = 0.1;
                popups.push({
                    text: "+1",
                    x: 400,
                    y: 260,
                    ttl: 1,
                });
            } else if(text == ">click!") {
                score += 5;
                clicked = 0.1;
                popups.push({
                    text: "+5", x: 400,
                    y: 260,
                    ttl: 1,
                });
            } else if(text == ">click!!!") {
                score += 25;
                clicked = 0.1;
                popups.push({
                    text: "+25",
                    x: 400,
                    y: 260,
                    ttl: 1,
                });
            } else if(text == ">clack") {
                score--;
                popups.push({
                    text: "-1",
                    x: 400,
                    y: 260,
                    ttl: 1,
                });
            } else if(text == ">help") {
                popups.push({
                    text: "click the button...",
                    x: 400,
                    y: 260,
                    ttl: 2,
                });
            } else if(text == ">quit" || text == ">exit") {
                popups.push({
                    text: "Nope.",
                    x: 400,
                    y: 260,
                    ttl: 1,
                });
            } else if(text == ">penis" || text == ">benis" || text == ">dick") {
                if(ttp == 0) {
                    ttp = elapsed;
                }

                popups.push({
                    text: "TTP: " + ttp.toFixed(2) + " seconds",
                    x: 400,
                    y: 260,
                    ttl: 1,
                });
            } else if(text == ">open the pod bay doors") {
                popups.push({
                    text: "I'm afraid I can't do that.",
                    x: 400,
                    y: 260,
                    ttl: 2,
                });
            } else if(text == ">dupa" || text == ">ass") {
                popups.push({
                    text: "( ͡° ͜ʖ ͡°)",
                    x: 400,
                    y: 260,
                    ttl: 1,
                });
            } else {
                popups.push({
                    text: "(╯°□°）╯︵ ┻━┻",
                    x: 400,
                    y: 260,
                    ttl: 1,
                });
            }


            text = ">";
         } else if(e.key.length == 1) {
             text += e.key.toLowerCase();
         }

         return keysPressed[e.keyCode] = true;
         }, false);

 window.addEventListener("keyup", function(e) {
         return delete keysDown[e.keyCode];
         }, false);

 window.addEventListener("click", function(e) {
    console.log(e.offsetX, e.offsetY);
    click = {
        x: e.offsetX,
        y: e.offsetY,
    }
 });

 window.addEventListener("mousedown", function(e) {
    console.log(e.offsetX, e.offsetY);
    down = {
        x: e.offsetX,
        y: e.offsetY,
    }
 });

 window.addEventListener("mouseup", function(e) {
    console.log(e.offsetX, e.offsetY);
    down = false;
 });

 setDelta = function() {
     now = Date.now();
     delta = (now - before) / 1000;
     return before = now;
 };

 if (!DEBUG) {
     console.log = function() {
         return null;
     };
 }

 ogre = false;

 clamp = function(v, min, max) {
     if (v < min) {
         return min;
     } else if (v > max) {
         return max;
     } else {
         return v;
     }
 };

 collides = function(a, b, as, bs) {
     return a.x + as > b.x && a.x < b.x + bs && a.y + as > b.y && a.y < b.y + bs;
 };

 button = {
    x: 350,
    y: 300,
    size: 100,
 }

 popups = []

 tick = function() {
     setDelta();
     elapsed += delta;
     update(delta);
     draw(delta);
     keysPressed = {};
     click = false;
     if (!ogre) {
         return window.requestAnimationFrame(tick);
     }
 };

 update = function(delta) {
     framesThisSecond += 1;
     fpsElapsed += delta;

     if(fpsElapsed >= 1) {
        fps = framesThisSecond / fpsElapsed;
        framesThisSecond = fpsElapsed = 0;
     }

     for(var i = 0; i < popups.length; i++) {

         var popup = popups[i];

         popup.ttl -= delta;

         if(popup.ttl <=0) {
            popups.splice(i, 1);
            i--;
            break;
         }

         popup.x += 8 * delta;
         popup.y -= 36 * delta;
     }

 };

 draw = function(delta) {
     ctx.fillStyle = "#000000";
     ctx.fillRect(0, 0, c.width, c.height);

     if(DEBUG) {
        ctx.fillStyle = "#111111";
        ctx.font = "20px Visitor";
        ctx.fillText(Math.round(fps), 20, 40);
     }

     if(clicked > 0) {
         clicked -= delta;
     }

     ctx.fillStyle = "#ffffff";
     var offset = clicked > 0 ? 5 : 0 ;
     ctx.fillRect(button.x + offset, button.y + offset, button.size - offset * 2, button.size - offset * 2)

     ctx.fillStyle = "#ffffff";
     ctx.font = "36px Visitor";
     ctx.fillText("score: " + score, 400, 160);
     ctx.textAlign = "center";

     ctx.fillStyle = "#ffffff";
     ctx.font = "24px Visitor";
     ctx.fillText(text, 400, 260);
     ctx.textAlign = "center";

     for(var i = 0; i < popups.length; i++) {
         var popup = popups[i];

         ctx.fillStyle = "#bbbbbb";
         ctx.font = "42px Visitor";
         ctx.fillText(popup.text, popup.x, popup.y);
     }

     if(ogre) {
        ctx.fillStyle = "#dddddd";
        ctx.font = "80px Visitor";
        ctx.fillText("You won!", 400, 260);
     }
 };

 (function() {
  var targetTime, vendor, w, _i, _len, _ref;
  w = window;
  _ref = ['ms', 'moz', 'webkit', 'o'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  vendor = _ref[_i];
  if (w.requestAnimationFrame) {
  break;
  }
  w.requestAnimationFrame = w["" + vendor + "RequestAnimationFrame"];
  }
  if (!w.requestAnimationFrame) {
  targetTime = 0;
  return w.requestAnimationFrame = function(callback) {
  var currentTime;
  targetTime = Math.max(targetTime + 16, currentTime = +(new Date));
  return w.setTimeout((function() {
          return callback(+(new Date));
          }), targetTime - currentTime);
  };
  }
 })();

 loadImage = function(name, callback) {
    var img = new Image()
    console.log('loading')
    loading += 1
    img.onload = function() {
        console.log('loaded ' + name)
        images[name] = img
        loading -= 1
        if(callback) {
            callback(name);
        }
    }

    img.src = 'img/' + name + '.png'
 }

 load = function() {
     if(loading) {
         window.requestAnimationFrame(load);
     } else {
         window.requestAnimationFrame(tick);
     }
 };

 load();

}).call(this);
