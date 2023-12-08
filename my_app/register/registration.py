import pyrebase
from flask import Blueprint, flash, redirect, render_template, request, session, url_for
from flask_oauthlib.client import OAuth
import json
import base64
import re
import hashlib


def hash_str(str):
    return hashlib.sha256(str.encode('utf-8')).hexdigest()


def is_gmail_address(email):
    # Define a regular expression pattern to match Gmail addresses
    gmail_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@gmail\.com\b')

    # Check if the email matches the Gmail pattern
    return bool(gmail_pattern.match(email))


# Defining a blueprint
registration_bp = Blueprint(
    'registration_bp', __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/register/static/'
)

config = {
    "apiKey": "AIzaSyAtyFAcewblFH0zxaY3BXbPyjagRkS_HTY",
    "authDomain": "pythonauthsys-15ed1.firebaseapp.com",
    "databaseURL": "https://pythonauthsys-15ed1-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "pythonauthsys-15ed1",
    "storageBucket": "pythonauthsys-15ed1.appspot.com",
    "messagingSenderId": "155695857534",
    "appId": "1:155695857534:web:54a66184993b209fa33d2f",
    "measurementId": "G-5FBDR6ZF5V",
    'userinfo': {
        'url': 'https://www.googleapis.com/oauth2/v3/userinfo',
        'email': lambda json: json['email'],
    },
    'scopes': ['https://www.googleapis.com/auth/userinfo.email'],
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

oauth = OAuth()

google = oauth.remote_app(
    'google',
    consumer_key='155695857534-5d9mjnca1vp88q3q7at78nic13cra1lb.apps.googleusercontent.com',
    consumer_secret='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',
    request_token_params={
        'scope': 'email',
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)


@registration_bp.route('/login/google')
def google_login():
    return google.authorize(callback=url_for('registration_bp.google_authorized', _external=True))


def base64_decode(data: str) -> str:
    data = data.encode("ascii")

    rem = len(data) % 4

    if rem > 0:
        data += b"=" * (4 - rem)
    return base64.urlsafe_b64decode(data).decode('utf-8')


@registration_bp.route('/login/google/authorized')
def google_authorized():
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )

    session['google_token'] = (response['access_token'], '')
    jwt = response['id_token'].split('.')

    userinfo = json.loads(base64_decode(jwt[1]))
    # print(userinfo)

    # Check if the Google user is already registered in the database
    email = userinfo['email']
    user_data = db.child("users").order_by_child("email").equal_to(email).get()

    if user_data.val():
        # User is already registered, log them in
        user = user_data.val()
        user_id, user_info = list(user.items())[0]
        session["email"] = user_info['email']
        session["name"] = user_info.get('name', '')
        session["uid"] = user_id
        session["is_logged_in"] = True

        return redirect(url_for('registration_bp.welcome'))
    else:
        session["email"] = email
        session["uid"] = userinfo['sub']
        session["is_logged_in"] = True
        data = {"email": email}
        db.child("users").child(session["uid"]).set(data)

        return redirect(url_for('registration_bp.welcome'))


@registration_bp.route("/signup")
def signup():
    return render_template("signup.html")


@registration_bp.route("/login")
def login():
    return render_template("login.html")


@registration_bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('registration_bp.login'))


@registration_bp.route("/")
def welcome():
    if session.get("is_logged_in"):
        return render_template("core.html", email=session.get("email"), name=session.get("name"))
    else:
        return redirect(url_for('registration_bp.login'))


@registration_bp.route("/result", methods=["POST", "GET"])
def result():
    if request.method == "POST":
        result = request.form
        email = result["email"]
        password = result["pass"]
        isGmailAccount = is_gmail_address(email)
        if db.child("users").order_by_child('email').equal_to(email).get().val():
            try:
                if isGmailAccount:
                    return redirect(url_for('registration_bp.google_login'))
                user = auth.sign_in_with_email_and_password(email, password)
                uid = user['localId']
                session["is_logged_in"] = True
                session["email"] = email
                session["uid"] = uid
                user_data = db.child("users").child(uid).get().val()
                session["name"] = user_data["name"]
                return redirect(url_for('registration_bp.welcome'))
            except Exception as err:
                return render_template("login.html", error="Invalid credentials")
        else:
            return render_template("login.html", error="Invalid credentials")
    else:
        if session.get("is_logged_in"):
            return redirect(url_for('registration_bp.welcome'))
        else:
            return redirect(url_for('registration_bp.login'))


@registration_bp.route("/register", methods=["POST", "GET"])
def register():
    if request.method == "POST":
        result = request.form
        email = result["email"]
        password = result["pass"]
        name = result["name"]
        if db.child("users").order_by_child('email').equal_to(email).get().val():
            return render_template("signup.html", error="User already exists")
        else:
            try:
                auth.create_user_with_email_and_password(email, password)
                user = auth.sign_in_with_email_and_password(email, password)
                uid = user["localId"]
                session["email"] = email
                session["uid"] = uid
                session["name"] = name
                data = {"name": name, "email": email}
                db.child("users").child(session["uid"]).set(data)
                session["is_logged_in"] = True
                return redirect(url_for('registration_bp.welcome'))
            except Exception as err:
                return render_template("signup.html", error="User already exists")


    else:
        if session.get("is_logged_in"):
            return redirect(url_for('registration_bp.welcome'))
        else:
            return redirect(url_for('registration_bp.signup'))
