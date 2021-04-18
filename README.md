# Компонент Table

[demo](https://elcodex.github.io/table/build/index.html)

`#React` `#hooks` `#TypeScript` `#react-testing-library` `#Jest` `#css` `#html`

В приложении реализованы возможности:
- навигация по страницам,
- сортировка по колонками (одно нажатие - сортировка по возрастанию, второе - по убыванию),
- поиск (фильтрация) по строке (формат поиска: `строка` или `поле:строка;...`).

В компонент `Table` передаются параметры необходимые для работы таблицы. В компонентах таблицы прописаны классы для стилизации таблицы пользователем. Параметры и классы описаны ниже.

В компоненте `App` создана таблица, в папке `css` прописаны стили для элементов таблицы.

## Логика навигации по страницам
- На панели навигации всегда отображаются кнопки `Previous`, `Next`, первая страница, последняя страница, текущая страница.
- Рядом с текущей страницей с обеих сторон отображаются номера двух соседних страниц.
- Вместо пропущенных страниц отображается `...`. При нажатии на эту кнопку появляется поле ввода номера страницы.
- Если между первой страницей и отображаемыми номерами страниц ровно одна страница, то эта страница отображается номером, а не многоточием. Аналогичное поведение с предпоследней страницей. 

## Параметры компонента

- `data: TableRow[]; interface TableRow { [name: string]: string | number}`
Данные таблицы.

- `fieldsNames: string[]`
Названия колонок таблицы.

- `maxPageRows?: number`
Количество строк на одной странице, опциональный параметр, значение по умолчанию `50`.

- `className?: string`
Класс для таблицы и префикс ко всем классам внутри таблицы, опциональный параметр, значение по умолчанию `table`.

- `textForFilterLabel?: string`
Текст для лейбла фильтра. Если параметр не задан, поле фильтрации не отображается. 

- `textForDataLength?: string`
Текст для отображения текущего количества записей в таблице с учётом фильтрации. Если параметр не задан, строка не отображается. Формат отображаемой строки: `${textForDataLength} ${dataLength}`

- `textForFromToDataRows?: string`
Текст для отображения текущего диапазона номеров строк. Если параметр не задан, строка не отображается. 
Формат отображаемой строки: `${textForFromToDataRows} (${fromRowNumber} - ${toRowNumber})`

- `textForPageNumber?: string`
Текст для отображения номера текущей страницы. Если параметр не задан, строка не отображается. 
Формат отображаемой строки: `${textForPageNumber} ${pageNumber}`

## Классы для стилизации таблицы

компонент Table
- `className || table`
заданный класс является префиксом к остальным классам таблицы

компонент Header
- ${className}__header
- ${className}__header__columnButton
- tableSortMarker

компонент Rows
- ${className}__rows
- ${className}__rows__row
- ${className}__row__column
- ${className}__row__column_string
- ${className}__row__column_number

компонент NavigationBar
- ${className}__navigation
- ${className}__navigation__direction
- ${className}__navigation__numberButton
- ${className}__navigation__numberButton_current
- ${className}__navigation__pageInput__input
- ${className}__navigation__pageInput__button

компонент Filter
- ${className}__filter
- ${className}__filter__input
- ${className}__filter__label
- ${className}__filter__hint

компонент Text
- ${className}__lengthText
- ${className}__rangeText
- ${className}__pageNumberText