from datetime import date, timedelta

today = date.today()

TASKS = [
    {"id":1, "title":"Провести встречу с командой", "description":"Встреча по проекту", "over_date":today.isoformat(), "over_time": "09:00", "priority":1, "status":"pending"},
    {"id":2, "title":"Прием врача на Даурской", "description":"Сдача крови", "over_date":today.isoformat(), "over_time": "13:00", "priority":2, "status":"pending"},
    {"id":3, "title":"Встреча с друзьями", "description":"Идем в кафе на баумана", "over_date":(today + timedelta(days=2)).isoformat(), "over_time": "19:00", "priority":2, "status":"pending"},
    {"id":4, "title":"Запись к ветеренару", "description":"Кошечку соню на прием врача, не давать кушать и пить за 5 часов до!", "over_date":(today + timedelta(days=3)).isoformat(), "over_time": "10:00", "priority":1, "status":"pending"},
    {"id":5, "title":"Семейный ужин", "description":"Ужин у мамы дома<3", "over_date":today.isoformat(), "over_time": "18:00", "priority":2, "status":"pending"},
    {"id":6, "title":"Запись на ноготочки", "description":"Выбрать дизайн до записи", "over_date":(today + timedelta(days=4)).isoformat(), "over_time": "12:00", "priority":1, "status":"pending"},
    {"id":7, "title":"Едем кататься на сап-бордах!", "description":"На каму", "over_date":(today + timedelta(days=4)).isoformat(), "over_time": "15:00", "priority":1, "status":"pending"},
    {"id":8, "title":"Доделать правки по семестровке", "description":"Внести все оставшиеся правки", "over_date":(today + timedelta(days=2)).isoformat(), "over_time": "09:00", "priority":1, "status":"pending"},
    {"id":9, "title":"Написать тестовое для практики", "description":"Очень важная задача", "over_date":today.isoformat(), "over_time": "23:00", "priority":1, "status":"pending"},
    {"id":10, "title":"Купить все для приготовления тортика", "description":"Мука, яйца, молоко, сыр", "over_date":(today + timedelta(days=5)).isoformat(), "over_time": "09:00", "priority":1, "status":"pending"},
]