const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      // HTML5 video has more functional, but it need a URL for src
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error('Oh No!', err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    //ctx.drawImage(video, 0, 0, width, height);

    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // mess with them
    pixels = redEffect(pixels);

    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 20);
}

function takePhoto() {
  // play the sound
  snap.currentTime = 0;
  snap.play();
  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src=${data} alt="HandSome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    // for each red, green and blue
    pixels[i] += 100;
    pixels[i + 1] -= 50;
    pixels[i + 2] *= 0.5
  }
}

function rgbSplit(pixels) {

}

video.addEventListener('canplay', paintToCanvas);
getVideo();