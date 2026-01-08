from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'supersecretkey'

# Home Page
@app.route('/')
def index():
    return render_template('index.html')

# About Page
@app.route('/about')
def about():
    return render_template('about.html')

# Products Page
@app.route('/products')
def products():
    return render_template('products.html')

# Tips Page
@app.route('/tips')
def tips():
    return render_template('tips.html')

# Contact / Order Page
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        if not name or not email or not message:
            flash('All fields are required!', 'error')
        else:
            flash('Your order has been received! (Demo, nothing actually submitted)', 'success')
        
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/nutrition-tips')
def nutrition_tips():
    return render_template('nutrition_tips.html')

@app.route('/gym-routine-tips')
def gym_routine_tips():
    return render_template('gym_routine_tips.html')

@app.route('/workout-consistency-tips')
def workout_consistency_tips():
    return render_template('workout_consistency_tips.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

if __name__ == '__main__':
    app.run(debug=True)
