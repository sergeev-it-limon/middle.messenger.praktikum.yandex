## Проектная работа 4-го спринта для курса "Мидл фронтенд-разработчик"

Pull request:
https://github.com/sergeev-it-limon/middle.messenger.praktikum.yandex/pull/8

Публикация:
https://yandex-sergeev-app.herokuapp.com/

Макеты:
https://www.figma.com/file/XUCnuti72FOGIadvpPdxLq/yandex-first-project?node-id=0%3A1

## Установка

- `npm run start` — запуск версии для разработчика,
- `npm run build` — сборка стабильной версии.
- `npm run test` — запуск тестов.

## Примечание

В npm-скрипте `lint` используется комманда `esw`. Это команда из пакета `eslint-watch` (который указан в локальных зависимостях), а не из пакета `esw`, поэтому ни глобально, ни локально устанавливать пакет `esw` не нужно, он не имеет к этому никакого отношения.
