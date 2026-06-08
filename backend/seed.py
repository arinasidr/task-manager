from datetime import date, timedelta
today = date.today()

TASKS = [
    {"id":1, "title":"Провести встречу с командой", "description":"Встреча по проекту", "over_date":today.isoformat(), "over_time": "09:00", "priority":1, "status":"pending"},
    {"id":2, "title":"Прием врача на Даурской", "description":"Сдача крови", "over_date":today.isoformat(), "over_time": "13:00", "priority":2, "status":"pending"},
    {"id":3, "title":"Семейный ужин", "description":"Ужин у мамы дома<3", "over_date":today.isoformat(), "over_time": "18:00", "priority":2, "status":"pending"},
    {"id":4, "title":"Написать тестовое для практики", "description":"Очень важная задача", "over_date":today.isoformat(), "over_time": "23:00", "priority":3, "status":"pending"},

    {"id":5, "title":"Встреча с друзьями", "description":"Идем в кафе на баумана", "over_date":(today + timedelta(days=2)).isoformat(), "over_time": "19:00", "priority":2, "status":"pending"},
    {"id":6, "title":"Доделать правки по семестровке", "description":"Внести все оставшиеся правки", "over_date":(today + timedelta(days=2)).isoformat(), "over_time": "09:00", "priority":3, "status":"pending"},

    {"id":7, "title":"Запись к ветеринару", "description":"Кошечку соню на прием врача, не давать кушать и пить за 5 часов до!", "over_date":(today + timedelta(days=3)).isoformat(), "over_time": "10:00", "priority":2, "status":"pending"},

    {"id":8, "title":"Запись на ноготочки", "description":"Выбрать дизайн до записи", "over_date":(today + timedelta(days=4)).isoformat(), "over_time": "12:00", "priority":1, "status":"pending"},
    {"id":9, "title":"Едем кататься на сап-бордах!", "description":"На каму", "over_date":(today + timedelta(days=4)).isoformat(), "over_time": "15:00", "priority":2, "status":"pending"},

    {"id":10, "title":"Купить все для приготовления тортика", "description":"Мука, яйца, молоко, сыр", "over_date":(today + timedelta(days=5)).isoformat(), "over_time": "09:00", "priority":1, "status":"pending"},

    {"id":11, "title":"Оплатить квартиру", "description":"Не забыть свет и интернет", "over_date":(today + timedelta(days=8)).isoformat(), "over_time": "10:00", "priority":3, "status":"pending"},
    {"id":12, "title":"Позвонить бабушке", "description":"Давно не созванивались", "over_date":(today + timedelta(days=8)).isoformat(), "over_time": None, "priority":1, "status":"pending"},

    {"id":13, "title":"Купить подарок подруге", "description":"День рождения у Кати", "over_date":(today + timedelta(days=15)).isoformat(), "over_time": "12:00", "priority":3, "status":"pending"},
    {"id":14, "title":"Записаться на йогу", "description":"Попробовать новую студию", "over_date":(today + timedelta(days=15)).isoformat(), "over_time": None, "priority":1, "status":"pending"},

    {"id":15, "title":"Поехать на дачу", "description":"Посадить помидоры", "over_date":(today + timedelta(days=20)).isoformat(), "over_time": None, "priority":2, "status":"pending"},
    {"id":16, "title":"Сдать отчёт за месяц", "description":"Подготовить таблицы", "over_date":(today + timedelta(days=20)).isoformat(), "over_time": "09:00", "priority":3, "status":"pending"},

    {"id":17, "title":"Плановый осмотр у стоматолога", "description":"", "over_date":(today + timedelta(days=25)).isoformat(), "over_time": "11:00", "priority":2, "status":"pending"},
    {"id":18, "title":"Забрать посылку с озона", "description":"Трекер RU123456789", "over_date":(today + timedelta(days=25)).isoformat(), "over_time": None, "priority":1, "status":"pending"},
]