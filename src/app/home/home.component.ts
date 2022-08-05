import { Component } from "@angular/core";

interface SpeedWord {
  word: string;
  time: number;
}

@Component({ templateUrl: "home.component.html" })
export class HomeComponent {
  title = "speedread";

  testStory =
    "There was once a hare who was friends with a tortoise. One day, he challenged the tortoise to a race. Seeing how slow the tortoise was going, the hare thought he'll win this easily. So he took a nap while the tortoise kept on going. When the hare woke up, he saw that the tortoise was already at the finish line. Much to his chagrin, the tortoise won the race while he was busy sleeping.";

  playing = false;
  fullScreen = false;

  defaultTime = 200;
  activeWord = "";
  story = "";
  words: Array<string> = [];
  speedWords: SpeedWord[] = [];

  result = "";

  checkValue(value: any): boolean {
    if (!isNaN(parseInt(value)) && value !== "") {
      if (parseInt(value) > 0) {
        return true;
      }
    }
    return false;
  }

  updateInput(event: Event) {
    this.story = (event.target as HTMLInputElement).value;
    //test story
    if (this.story === "test-story") {
      this.story = this.testStory;
    }
  }

  focusElement(id: string) {
    let element = document.getElementById(id);
    element?.focus();
    console.log(id);
  }

  updateDefaultTime(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    if (this.checkValue(value)) {
      this.defaultTime = parseInt(value);
    } else {
      alert("Default value is invalid");
    }
  }

  calculateWordTime(length: number) {
    //150 words per minute is a word each 400ms
    //average length of an english word is 4.7
    let origin = 4.7;
    let result = Math.round((length * this.defaultTime) / origin + 50);
    return result;
  }
  putInputInStory() {
    //replaces line breaks with space
    this.story = this.story.replace(/(\r\n|\n|\r)/gm, " ");
    this.words = this.story.split(" ");
    //removes empty elements
    this.words = this.words.filter((e) => e !== "");
    this.speedWords = [];
    //populate speedWords
    this.words.forEach((elem) => {
      this.speedWords.push({
        word: elem,
        time: this.calculateWordTime(elem.length),
      });
    });
  }

  updateWordTime(event: Event, index: number) {
    let value = (event.target as HTMLInputElement).value;
    if (this.checkValue(value)) {
      this.speedWords[index].time = parseInt(value);
      return;
    }
    alert("Time value is invalid!");
  }

  showActiveWord(index: number) {
    if (!(index < this.speedWords.length) || this.playing == false) {
      this.activeWord = "";
      this.playing = false;
      return;
    }
    this.activeWord = this.speedWords[index].word;
    setTimeout(() => {
      this.showActiveWord(index + 1);
    }, this.speedWords[index].time);
  }

  triggerSlideShow() {
    this.playing = !this.playing;
    if (this.playing) {
      this.showActiveWord(0);
    }
  }

  triggerFullScreen() {
    this.fullScreen = !this.fullScreen;
  }
}
