import matplotlib
matplotlib.use('Agg')
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=["GET"])
def index():
    return render_template("index_backend.html")
@app.route("/", methods=["POST"])
def generate_plot():
    datasets = request.get_json()

    if not isinstance(datasets, list) or len(datasets) == 0:
        return jsonify({"error": "Date invalide"}), 400
    

    graph_type = datasets[0].get("graphType", "Linie")
    plt.figure(figsize=(7, 4))

    for dataset in datasets:
        try:
            if "type" not in dataset:
                continue
                
            label = dataset["type"]
            values = [float(x) for x in dataset["data"]]
            
            if graph_type == "Linie":
                plt.plot(values, marker="o", label=label)
            elif graph_type == "Histograma":
                plt.hist(values, label=label, alpha=0.7, bins=10)
            elif graph_type == "Bara":
                plt.bar(range(len(values)), values, label=label, alpha=0.7)
            else:
                plt.plot(values, marker="o", label=label)
        except Exception as e:
            print("Error:", e)
            return jsonify({"error": "Structura dataset incorecta"}), 400

    plt.title(f"Grafic date introduse - {graph_type}")
    plt.xlabel("Index")
    plt.ylabel("Valoare")
    
    plt.grid(True)
    plt.legend()

    buffer = io.BytesIO()
    plt.savefig(buffer, format="png")
    plt.close()
    buffer.seek(0)

    image_base64 = base64.b64encode(buffer.read()).decode("utf-8")
    print("SUCCESS: Plot generated and sent to client!")
    return jsonify({
        "image": image_base64
    })


if __name__ == "__main__":
    app.run(debug=True)
