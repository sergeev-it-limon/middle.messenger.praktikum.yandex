import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./sendMessageForm.tmpl.js";
import { getFormEntries } from "../../utils/getFormEntries";
import "./sendMessageForm.css";
import style from "./sendMessageForm.css.json";
import { InputSendMessage } from "../inputSendMessage";
import { ButtonSubmitSendMessageForm } from "../buttonSubmitSendMessageForm";

export class SendMessageForm extends Component {
  submitHandler(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = getFormEntries(form);

    console.log("Сабмит формы ввода сообщения");
    console.log(formData);
  }

  render() {
    return {
      current: htmlFromStr(template({ style })),
      eventListeners: {
        submitHandler: this.submitHandler,
      },
      children: {
        inputSendMessage: {
          Component: InputSendMessage,
          props: {
            name: "message",
          },
        },
        buttonSubmitSendMessageForm: { Component: ButtonSubmitSendMessageForm },
      },
    };
  }
}
