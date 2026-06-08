from flask import Flask, request, jsonify
from flask_cors import CORS
from seed import TASKS
from datetime import date, timedelta

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

task_db = TASKS.copy()

@app.get("/tasks")
def get_tasks():
    from_date = request.args.get("from_date")
    to_date = request.args.get("to_date")
    sort_of = request.args.get("sort", "date")
    
    res = task_db.copy()

    if from_date:
        res = [task for task in res if task["over_date"] >= from_date]
    if to_date:
        res = [task for task in res if task["over_date"] <= to_date]

    if sort_of == "priority":
        res = sorted(res, key=lambda x: -x["priority"])
    else:
        res = sorted(res, key=lambda x: (x["over_date"], x["over_time"] or "99:99"))
    
    return jsonify(res)

@app.get("/tasks/today")
def get_today_tasks():
    today = date.today().isoformat()
    tasks = task_db.copy()

    res = sorted([task for task in tasks if task["over_date"] == today], key=lambda x: (x["over_time"] or "99:99"))

    return jsonify(res)

@app.get("/tasks/upcoming")
def get_tasks_upcoming():
    today = date.today()
    tasks = task_db.copy()

    period = request.args.get("period")
    delta = timedelta(days=7) if period == "week" else timedelta(days=30)

    today_str = today.isoformat()
    end_str = (today + delta).isoformat()

    res = [t for t in tasks if today_str <= t["over_date"] <= end_str]
    res = sorted(res, key=lambda x: x["priority"])[:10]

    return jsonify(res)

@app.post("/tasks")
def create_task():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400
    
    title = data.get("title")
    if not title:
        return jsonify({"error": "title is required"}), 400
    
    due_date = data.get("over_date")
    if not due_date:
        return jsonify({"error": "date is required"}), 400

    priority = data.get("priority")
    if not (priority in [1, 2, 3]):
        return jsonify({"error": "priority is required"}), 400
    
    new_task = {
        "id": max((task["id"] for task in task_db), default=0) + 1,
        "title": title,
        "description": data.get("description", ""),
        "over_date": due_date,
        "over_time": data.get("over_time", None),
        "priority": priority,
        "status": data.get("status", "pending")
    }

    task_db.append(new_task)
    return jsonify(new_task), 201

if __name__ == "__main__":
    print(f"Загружено задач из seed: {len(task_db)}")
    app.run(debug=True, host="0.0.0.0", port=8000)