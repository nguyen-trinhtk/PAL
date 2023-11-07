from flask import Flask, render_template, request
from flask import jsonify

app = Flask(__name__)

# Display your index page
@app.route("/")
def index():
    return render_template('index.html')

# A function to add two numbers
@app.route("/add")
def add():
    a = request.args.get('a')
    b = request.args.get('b')
    return jsonify({"result": a+b})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)