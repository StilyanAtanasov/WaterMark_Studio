import pyrebase
from flask import Blueprint, flash, redirect, render_template, request, session, url_for



# Defining a blueprint
core_bp = Blueprint(
    'core_bp', __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/core/static/'
)