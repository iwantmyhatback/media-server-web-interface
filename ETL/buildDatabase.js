const fs = require('fs');
const mediaPath = '/Volumes/share';

let movies = [];

fs.readdir(`${mediaPath}/Media/Video Media/Movies`, (err, file) => {
  movies = file;
  return;
}).then(() => {
  console.log(movies);
});
