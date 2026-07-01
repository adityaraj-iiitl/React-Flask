from flask import Flask, render_template , request , send_file
import qrcode as qrcode

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def home():
    if(request.method=="POST"):
        text=request.form.get("text")
        qrcode.make(text).save(".png")
        return send_file(".png", mimetype="image/png")
    return render_template("index.html")
            
if (__name__ == "__main__"):
    app.run(debug=True)