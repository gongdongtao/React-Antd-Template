import React from "react";
import { Tooltip } from "antd";

export default class EllipsisTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleVisibleChange = visible => {
    if (this.container.clientWidth < this.container.scrollWidth) {
      this.setState({
        visible: visible
      });
    }
  };

  render() {
    const { title, style, children, className } = this.props;
    let _style = Object.assign({}, style, {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
    });
    return (
      <Tooltip
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        title={title === undefined ? children : title}
      >
        <div
          className={className}
          ref={node => (this.container = node)}
          style={_style}
        >
          {children}
        </div>
      </Tooltip>
    );
  }
}
