import { faker } from "./fakerRuStatic";

export const getSelectedChatData = () => {
  return new Array(50)
    .fill(null)
    .map((_, id) => {
      const type = faker.random.arrayElement(["message", "image"]);

      const time = new Date().getTime() - 100_000_000 * id;
      const date = new Date(time);
      const timeRangeDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      ).getTime();

      let content;
      switch (type) {
        case "message":
          content = {
            text: faker.lorem.text(1000),
            time,
            timeRangeDay,
          };
          break;
        case "image":
          content = {
            src: faker.image.cats(),
            time,
            timeRangeDay,
          };
          break;
      }

      const isMy = faker.datatype.boolean();

      return {
        id,
        type,
        content,
        isMy,
      };
    })
    .reduce((mesByDays, message) => {
      const mesByDay = mesByDays.find((mesByDay) => {
        return mesByDay.timeDay === message.content.timeRangeDay;
      });

      if (mesByDay == null) {
        mesByDays.push({
          timeDay: message.content.timeRangeDay,
          messages: [message],
        });
        return mesByDays;
      }

      mesByDay.messages.push(message);

      return mesByDays;
    }, [])
    .sort((a, b) => a.timeDay - b.timeDay);
};
