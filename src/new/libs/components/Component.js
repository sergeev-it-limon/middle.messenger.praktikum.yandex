export class Component {
  constructor(props, options = {}) {
    const { parent } = options;
    const parentFor = parent.dataset.parentFor;
    const idTime = `parentFor: ${parentFor}`;

    this.#initComponent(props, options);
    // this.#withTimer(idTime, () => {
    //   this.#initComponent(props, options);
    // });
  }

  setState(state) {
    const isNotNeedUpdate = !this.#isNeedUpdate(this.props, state);
    if (isNotNeedUpdate) return false;

    this.prevState = this.state;
    this.state = { ...this.state, ...state };

    this.#updateDomElement();
  }

  update(props) {
    const isNotNeedUpdate = !this.#isNeedUpdate(props, this.state);
    if (isNotNeedUpdate) return false;

    this.props = props;

    this.#updateDomElement();

    return true;
  }

  unmount() {
    this.#removeDomElement();
  }

  #withTimer(id, fn) {
    const start = new Date().getTime();
    fn();
    const end = new Date().getTime();
    console.log(`${id} \n execute time: ${(end - start) / 1000}s`);
  }

  #initComponent(props, options) {
    const { parent } = options;

    this.props = props;
    this.parent = parent;
    this.prevState = null;

    if (typeof this.initialState === "function") {
      this.state = this.initialState();
    }

    if (typeof this.componentWillMount === "function") {
      this.componentWillMount();
    }

    this.#initDomElement();

    if (typeof this.componentDidMount === "function") {
      this.componentDidMount();
    }
  }

  #isNeedUpdate(nextProps, nextState) {
    let isNeedUpdate;

    if (typeof this.shouldComponentUpdate === "function") {
      isNeedUpdate = this.shouldComponentUpdate(nextProps, nextState);
    } else {
      isNeedUpdate = this.#shouldComponentUpdateDefault(nextProps, nextState);
    }

    return isNeedUpdate;
  }

  #shouldComponentUpdateDefault(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  #initDomElement() {
    this.#renderWithAdditional();
    this.parent.appendChild(this.current);
  }

  #renderWithAdditional() {
    const { current, children = {}, eventListeners = {} } = this.render();

    this.current = current;

    this.#renderWithChildren(children);
    this.#renderWithEventListeners(eventListeners);
  }

  #renderWithEventListeners(eventListeners) {
    const elemsWithListeners = Array.from(
      this.current.querySelectorAll("[data-event-listeners]")
    );

    if (this.current.dataset.eventListeners != null) {
      elemsWithListeners.push(this.current);
    }

    if (elemsWithListeners.length === 0) {
      return;
    }

    const eventListenersEnties = Object.entries(eventListeners);

    const eventListenersNew = {};
    for (let eventListenerEntry of eventListenersEnties) {
      const name = eventListenerEntry[0];
      const listener = eventListenerEntry[1];

      const elemForListenerCurr = elemsWithListeners.find(
        this.#isElemWithListenerCurr(name)
      );

      const eventType = this.#getEventTypeByListenerName(
        elemForListenerCurr,
        name
      );

      elemForListenerCurr.addEventListener(eventType, listener);
      eventListeners[name] = {
        remove: () => {
          elemForListenerCurr.removeListener(listener);
        },
      };
    }

    this.eventListeners = eventListenersNew;
  }

  #getEventTypeByListenerName(elem, eventName) {
    const listenersEntries = this.#getListeners(elem);

    const listenerEntryCurr = listenersEntries.find((entry) => {
      return entry[1] === eventName;
    });

    return listenerEntryCurr[0];
  }

  #isElemWithListenerCurr(eventListenerName) {
    return (elemWithListeners) => {
      const eventListenersEntries = this.#getListeners(elemWithListeners);

      return eventListenersEntries.some((eventListener) => {
        return eventListenerName === eventListener[1];
      });
    };
  }

  #getListeners(elem) {
    const eventListenersStr = elem.dataset.eventListeners;
    const eventListeners = eventListenersStr.split(",");

    const eventListenersEntries = eventListeners.map((eventListener) => {
      return eventListener.split(":");
    });

    return eventListenersEntries;
  }

  #renderWithChildren(children) {
    const parents = Array.from(
      this.current.querySelectorAll("[data-parent-for]")
    );

    if (this.current.dataset.parentFor != null) {
      parents.push(this.current);
    }

    const childrenEnties = Object.entries(children);

    const childrenComponents = {};

    for (let childEntry of childrenEnties) {
      const childName = childEntry[0];
      const { Component, props } = childEntry[1];

      const parent = parents.find(this.#isParentForChild(childName));

      childrenComponents[childName] = new Component(props, { parent });
    }

    this.children = childrenComponents;
  }

  #isParentForChild(childName) {
    return (parent) => {
      const childNames = parent.dataset.parentFor.split(",");

      return childNames.some((childNameCurr) => {
        return childName === childNameCurr;
      });
    };
  }

  #updateDomElement() {
    const currentOld = this.current;
    this.#renderWithAdditional();

    this.parent.replaceChild(this.current, currentOld);
  }

  #removeDomElement() {
    this.parent.removeChild(this.current);
  }
}
