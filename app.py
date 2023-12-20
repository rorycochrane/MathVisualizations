from flask import Flask, render_template
app = Flask(__name__)
 
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/')
def about():
    return render_template('index.html')

@app.route('/trigonometry/trig-visualizer')
def trigonometry_trig_visualizer():
    return render_template('trigonometry/trig-visualizer.html')

@app.route('/probability/probability-distribution-explorer')
def probability_probability_distribution_explorer():
    return render_template('probability/probability-distribution-explorer.html')
 
if __name__ == '__main__':
    app.run()