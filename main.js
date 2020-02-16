var app = new Vue({
  el: "#app",
  data: {
    initialTime: 60,
    time: 60,
    interval: null,
    sound: new Audio('beeps.mp3'),
    animation: "",
    fullscreen: false,
    tryStopTimes: []
  },
  methods: {
    full: function() {
      toggleFullScreen();
      this.fullscreen = true;
    },
    tryStop: function() {
      this.tryStopTimes.push(new Date());
      if (this.tryStopTimes.length >= 2) {
        var latest = this.tryStopTimes.length - 1;
        if (this.tryStopTimes[latest] - this.tryStopTimes[latest - 1] < 200) {
          console.log("proc");
          this.stop();
        }
      }
    },
    stop: function() {
      clearInterval(this.interval);
      this.sound.pause();
      this.sound.currentTime = 0;
      this.animation = "";
      this.time = this.initialTime;
    },
    start: function() {
      var that = this;
      clearInterval(this.interval);
      that.sound.pause();
      that.sound.currentTime = 0;
      if (this.animation == "a") this.animation = "b";
      else this.animation = "a";
      this.time = this.initialTime;

      this.interval = setInterval(function() {
        that.time--;
        if (that.time == 6) {
          setTimeout(function() {
            that.sound.play();
          }, 800)
        }
        if (that.time == 0) {
          clearInterval(that.interval)
        }
      }, 1000);
    },
    mounted: function() {
      this.sound.load();
    }
  }
});

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
