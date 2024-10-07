export const typer = () => {
    class Typer {
      element: HTMLElement;
      words: string[];
      delay: number;
      loop: number | boolean;
      deleteDelay: number;
      progress: { word: number; char: number; building: boolean; looped: number };
      typing: boolean;
      colors: string[];
      colorIndex: number;
      cursor?: Cursor;
  
      constructor(element: HTMLElement) {
        this.element = element;
        const delim: string = element.dataset.delim || ',';
        const words: string = element.dataset.words || 'override these,sample typing';
        this.words = words.split(delim).filter((v) => v); // non empty words
        this.delay = parseInt(element.dataset.delay || '200');
        this.loop = element.dataset.loop === 'false' ? 1 : parseInt(element.dataset.loop || 'true');
        this.deleteDelay = parseInt(
          element.dataset.deletedelay || element.dataset.deleteDelay || '800'
        );
  
        this.progress = { word: 0, char: 0, building: true, looped: 0 };
        this.typing = true;
  
        const colors: string = element.dataset.colors || 'black';
        this.colors = colors.split(',');
        this.element.style.color = this.colors[0];
        this.colorIndex = 0;
  
        this.doTyping();
      }
  
      start() {
        if (!this.typing) {
          this.typing = true;
          this.doTyping();
        }
      }
  
      stop() {
        this.typing = false;
      }
  
      private doTyping() {
        const e = this.element;
        const p = this.progress;
        const w = p.word;
        const c = p.char;
        const currentDisplay = [...this.words[w]].slice(0, c).join('');
        let atWordEnd: boolean;
  
        if (this.cursor) {
          this.cursor.element.style.opacity = '1';
          this.cursor.on = true;
          clearInterval(this.cursor.interval);
          this.cursor.interval = setInterval(() => this.cursor?.updateBlinkState(), 400);
        }
  
        e.innerHTML = currentDisplay;
  
        if (p.building) {
          atWordEnd = p.char === this.words[w].length;
          if (atWordEnd) {
            p.building = false;
          } else {
            p.char += 1;
          }
        } else {
          if (p.char === 0) {
            p.building = true;
            p.word = (p.word + 1) % this.words.length;
            this.colorIndex = (this.colorIndex + 1) % this.colors.length;
            this.element.style.color = this.colors[this.colorIndex];
          } else {
            p.char -= 1;
          }
        }
  
        if (p.word === this.words.length - 1) {
          p.looped += 1;
        }
  
        if (!p.building && this.loop !== true && this.loop <= p.looped) {
          this.typing = false;
        }
  
        setTimeout(
          () => {
            if (this.typing) {
              this.doTyping();
            }
          },
          atWordEnd ? this.deleteDelay : this.delay
        );
      }
    }
  
    class Cursor {
      element: HTMLElement;
      cursorDisplay: string;
      on: boolean;
      interval: number;
      owner?: Typer;
  
      constructor(element: HTMLElement) {
        this.element = element;
        this.cursorDisplay = element.dataset.cursordisplay || element.dataset.cursorDisplay || '_';
        element.innerHTML = this.cursorDisplay;
        this.on = true;
        element.style.transition = 'all 0.1s';
        this.interval = window.setInterval(() => this.updateBlinkState(), 400);
      }
  
      updateBlinkState() {
        if (this.on) {
          this.element.style.opacity = '0';
          this.on = false;
        } else {
          this.element.style.opacity = '1';
          this.on = true;
        }
      }
    }
  
    function TyperSetup() {
      const typers: { [key: string]: Typer } = {};
  
      for (const e of document.getElementsByClassName('typer')) {
        const element = e as HTMLElement;
        typers[element.id] = new Typer(element);
      }
  
      for (const e of document.getElementsByClassName('typer-stop')) {
        const element = e as HTMLElement;
        const owner = typers[element.dataset.owner as string];
        e.addEventListener('click', () => owner.stop());
      }
  
      for (const e of document.getElementsByClassName('typer-start')) {
        const element = e as HTMLElement;
        const owner = typers[element.dataset.owner as string];
        e.addEventListener('click', () => owner.start());
      }
  
      for (const e of document.getElementsByClassName('cursor')) {
        const element = e as HTMLElement;
        const t = new Cursor(element);
        t.owner = typers[element.dataset.owner as string];
        t.owner.cursor = t;
      }
    }
  
    TyperSetup();
  };
  