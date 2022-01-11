import {DcObserver} from "@/component/dc-form/interface/interface";

const dcObserver: DcObserver = {
  observerList: {},
  historyList: {},

  subscribe(name: string, fn: (res: any) => void) {
    if (!this.observerList[name]) {
      this.observerList[name] = [fn];
    } else {
      this.observerList[name].push(fn);
    }
    if (this.historyList[name]) {
      fn(this.historyList[name]);
    }
  },

  publish(name: string, res: any) {
    if (this.observerList[name]) {
      this.observerList[name].forEach(fn => {
        fn(res);
      })
    } else {
      this.historyList[name] = res;
    }
  },

  unsubscribe(name: string) {
    delete this.observerList[name];
  }
}

export default dcObserver;
