import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./list.tmpl.js";

export class List extends Component {
  getChildrenWithMeta() {
    const dataParentForArr = this.props.items.map((_, i) => `child_${i}`);

    const childrenEntries = this.props.items.map((item, index) => {
      return [`child_${index}`, item];
    });
    const children = Object.fromEntries(childrenEntries);

    return { dataParentForArr, children };
  }

  render() {
    const { dataParentForArr, children } = this.getChildrenWithMeta();
    return {
      current: htmlFromStr(
        template({
          dataParentForArr,
          ulClassName: this.props.ulClassName ?? "",
          liClassName: this.props.liClassName ?? "",
        })
      ),
      children,
    };
  }
}
