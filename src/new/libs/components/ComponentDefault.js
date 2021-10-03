import { Component } from "./Component";

export class ComponentDefault extends Component {
  render() {
    const current = document.createElement(this.props.tag);

    const attributesEntries = Object.entries(this.props.attributes ?? []);

    for (let attributeEntry of attributesEntries) {
      current.setAttribute(attributeEntry[0], attributeEntry[1]);
    }

    if (this.props.innerText != null) {
      current.innerText = this.props.innerText;
    }

    return {
      current,
      children: this.props.children,
    };
  }
}
