const fs = require("fs");
const lineReader = require("line-reader");
const file_name = "records.csv";

class Downloader {
  constructor() {
    this.uploaded_path = `files/upload/${file_name}`;
    this.paused = false;
    this.current_row = 1;
    this.download_path = `files/download/${file_name}`;
    this.is_downloaded = false;
    this.download_started = false;
  }

  async startDownload() {
    if (!this.download_started) {
      this.download_started = true;
    }
    let index = 0;
    lineReader.eachLine(this.uploaded_path, (row, end) => {
      if (this.isPaused() == false && index > this.current_row) {
        fs.appendFile(this.download_path, row + "\n", (error) => {
          if (error) {
            console.log(error);
          } else {
            index = index + 1;
            if (end) {
              this.is_uploaded = true;
            }
          }
        });
        console.log(row);
      } else {
        index = index + 1;
      }
    });

    this.current_row = index;
  }

  isPaused() {
    return this.paused;
  }

  pause() {
    this.paused = true;
  }
  resume() {
    this.paused = false;
    this.startDownload();
  }
  terminate() {
    fs.unlinkSync(this.download_path, (err) => {});
    this.reset();
  }
  reset() {
    this.current_row = 1;
    this.download_started = false;
  }
  checkStatus() {
    return this.download_started == true;
  }
  fileExists() {
    return fs.existsSync(this.uploaded_path) == true;
  }
}

module.exports = Downloader;
