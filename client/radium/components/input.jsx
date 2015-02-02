// React
var React = require("react");

// Mixins
var RadiumBrowserState = require("../mixins/radium-browser-state");

// Component
var Input = React.createClass({
  mixins: [RadiumBrowserState],

  getInputStyles: function () {
    return {
      standard: {
        display: "block",
        width: "100%",
        fontSize: 16,
        borderRadius: "0.3em",
        padding: "0.4em",
        border: "1px solid #ccc",
        lineHeight: 1.2,
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        boxSizing: "border-box"
      },
      modifiers: {
        size: {
          large: {
            fontSize: 21
          },
          small: {
            fontSize: 14
          }
        },
        type: {
          textarea: {
            resize: "vertical",
            minHeight: "4em"
          }
        },
        inline: {
          display: "inline-block",
          width: "auto"
        }
      }
    };
  },

  getLabelStyles: function () {
    return {
      standard: {
        display: "inline-block",
        marginBottom: "0.25em"
      },
      modifiers: {
        labelHidden: {
          clip: "rect(0 0 0 0)",
          height: 1,
          margin: -1,
          overflow: "hidden",
          position: "absolute",
          width: 1
        },
        inline: {
          marginBottom: 0,
          marginRight: "1em"
        }
      }
    };
  },

  propTypes: {
    label: function (props, propName, componentName) {
      if (!props.dangerouslyDisableLabel && typeof props.label !== "string") {
        return new Error(
          "Required prop `" + propName + "` was not specified in `" +
          componentName + "`. Set `" + propName +
          "` to a string describing the input. If you are implementing your " +
          "own label, set `dangerouslyDisableLabel` to `true`. For more " +
          "information on labels, see " +
          "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label."
        );
      }
    }
  },

  getInitialState: function () {
    return {
      textareaHeight: null,
      textareaCloneWidth: null
    };
  },

  getDefaultProps: function () {
    return {
      type: "text",
      dangerouslyDisableLabel: false,
      textareaResize: true
    };
  },

  componentDidMount: function () {
    this.resizeTextarea();
  },

  componentDidUpdate: function () {
    this.resizeTextarea();
  },

  handleChange: function (ev) {
    this.resizeTextarea();

    if (this.props.onChange) {
      this.props.onChange(ev);
    }
  },

  resizeTextarea: function () {
    if (this.props.textareaResize && this.props.type === "textarea") {
      var oldHeight = this.state.textareaHeight;
      var newHeight = this.getInputElement().scrollHeight;

      if (oldHeight !== newHeight) {
        this.setState({
          textareaHeight: newHeight
        });
      }
    }
  },

  getInputElement: function () {
    return this.refs.input.getDOMNode();
  },

  buildComputedStyles: function () {
    var computedStyles = {};

    if (this.props.textareaResize && this.state.textareaHeight) {
      computedStyles.height = this.state.textareaHeight;
    }

    return computedStyles;
  },

  buildInput: function () {
    var styles = this.buildStyles(
      this.getInputStyles(),
      this.buildComputedStyles
    );

    var textarea = (
      <textarea
        {...this.props}
        ref="input"
        style={styles}
        onChange={this.handleChange}
      />
    );

    var input = (
      <input
        ref="input"
        style={styles}
        {...this.props}
      />
    );

    if (this.props.type === "textarea") {
      return textarea;
    }

    return input;
  },

  buildLabel: function (inputEl) {
    var styles = this.buildStyles(this.getLabelStyles());

    return (
      <label>
        <span style={styles}>
          {this.props.label}
        </span>
        {inputEl}
      </label>
    );
  },

  render: function () {
    var inputEl = this.buildInput();

    if (this.props.dangerouslyDisableLabel) {
      return inputEl;
    }

    return this.buildLabel(inputEl);
  }
});

module.exports = Input;