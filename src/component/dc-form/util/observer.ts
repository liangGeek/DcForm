import {DcObserver} from "@/component/dc-form/interface/interface";

const dcObserver: DcObserver = {
  observerList: {},

  subscribe(name: string, fn: (res: any) => void) {
    if (!this.observerList[name]) {
      this.observerList[name] = [fn];
    } else {
      this.observerList[name].push(fn);
    }
  },

  publish(name: string, ...res) {
    if (this.observerList[name]) {
      this.observerList[name].forEach(fn => {
        fn(...res);
      })
    }
  },

  unsubscribe(name: string) {
    delete this.observerList[name];
  }
}

export default dcObserver;
