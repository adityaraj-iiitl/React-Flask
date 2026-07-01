from flask import Flask, redirect, render_template, request 
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app= Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///users.db'
db=SQLAlchemy(app)

class User(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    datetime = db.Column(db.DateTime, default=datetime.utcnow)

@app.route("/")
def home():
    all_users=User.query.all()
    return render_template("index.html" , all_users=all_users)

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/register" , methods=["GET" , "POST"])
def register():
    if request.method== "POST":
        username=request.form.get("username")
        password=request.form.get("password")
        print(username)
        new_user=User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
    return render_template("form.html")

@app.route("/update/<sno>", methods=["GET", "POST"])
def update(sno):
    user = User.query.filter_by(sno=int(sno)).first()
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if user:
            user.username = username
            user.password = password
            db.session.commit()
        return redirect("/")
        
    return render_template("update.html", user=user)
      
@app.route("/delete/<sno>")
def delete(sno):
    user = User.query.filter_by(sno=int(sno)).first()
    if(user):
        db.session.delete(user)
        db.session.commit()
    return redirect("/")
        
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)