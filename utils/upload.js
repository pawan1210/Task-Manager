const fs = require("fs");
const lineReader = require("line-reader");
const file_name = "records.csv";

class Uploader {
  constructor() {
    this.file_path = "utils/records.csv";
    this.paused = false;
    this.current_row = 1;
    this.upload_path = `files/upload/${file_name}`;
    this.is_uploaded = false;
    this.upload_started = false;
  }

  async startUpload() {
    if (!this.upload_started) {
      this.upload_started = true;
    }
    if (this.paused) {
      this.paused = false;
    }
    let index = 0;
    lineReader.eachLine(this.file_path, (row, end) => {
      if (this.isPaused() == false && index > this.current_row) {
        fs.appendFile(this.upload_path, row + "\n", (error) => {
          if (error) {
            console.log(error);
          } else {
            index = index + 1;
            if (end) {
              this.reset();
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
    this.startUpload();
  }
  async terminate() {
    fs.unlinkSync(this.upload_path, async (err) => {});
    this.reset();
  }
  reset() {
    this.current_row = 1;
    this.upload_started = false;
  }
  checkStatus() {
    return this.upload_started == true;
  }
}

module.exports = Uploader;
