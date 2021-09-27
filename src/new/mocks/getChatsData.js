import { formatTime } from "../helpers/formatTime";
import { faker } from "./fakerRuStatic";

export const getChatsData = () => {
  return new Array(50).fill(null).map((_, id) => {
    const hours = faker.datatype.number({ min: 0, max: 23 });
    const minutes = faker.datatype.number({ min: 0, max: 60 });

    const timeStr = formatTime(hours, minutes);

    return {
      chatId: id,
      name: faker.name.findName(),
      previewText: faker.lorem.text(200),
      timeLastMsg: timeStr,
      unreadedMsgCnt: faker.datatype.number(100),
      src: "https://images.unsplash.com/photo-1616213320857-b5c3669e472e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
      alt: "avatar",
      isActive: false,
    };
  });
};
