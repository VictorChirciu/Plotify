import matplotlib
matplotlib.use('Agg')
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import matplotlib.pyplot as plt
import io 
import base64
import logging
import random
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%d-%m-%Y %H:%M:%S',
    handlers=[
        logging.StreamHandler()
    ]
)
logging.getLogger('werkzeug').setLevel(logging.ERROR)

logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def log_request(response):
    logger.info(
        f'{request.remote_addr} - "{request.method} {request.path} {request.environ.get("SERVER_PROTOCOL")}" {response.status_code}'
    )
    return response

@app.route("/", methods=["GET"])
def index():
    logger.info("Index page accessed")
    return render_template("index_backend.html")

@app.route("/", methods=["POST"])
def generate_plot():
    try:
        datasets = request.get_json()

        if not isinstance(datasets, list) or len(datasets) == 0:
            logger.error("Invalid data format received")
            return jsonify({"error": "Date invalide"}), 400
        base_colors = ['#4E79A7','#F28E2B','#E15759','#76B7B2','#59A14F','#EDC948','#B07AA1','#FF9DA7', '#9C755F','#BAB0AC',]
        available_colors = random.sample(base_colors, len(base_colors))
        color_index = 0
        logger.info(f"Received datasets: {datasets}")
        graph_type = datasets[0].get("graphType", "Linie")
        logger.info(f"Generating plot of type: {graph_type}")
        plt.figure(figsize=(6, 4))

        for dataset in datasets:
            if "type" not in dataset:
                continue 
                
            label = dataset["type"]
            values = [float(x) for x in dataset["data"]]
            current_color = available_colors[color_index % len(available_colors)]
            color_index += 1
            
            if graph_type == "Linie":
                plt.plot(values, marker="o", label=label, color=current_color)
                logger.info(f"Chosen color: {current_color}")
            elif graph_type == "Histogramă":
                plt.hist(values, label=label, alpha=0.7, bins=10, color=current_color)
                logger.info(f"Chosen color: {current_color}")
            elif graph_type == "Bară":
                plt.bar(range(len(values)), values, label=label, alpha=0.7, color=current_color)
                logger.info(f"Chosen color: {current_color}")
            else:
                plt.plot(values, marker="o", label=label, color=current_color)
                logger.info(f"Chosen color: {current_color}")
                
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
        logger.info("SUCCESS: Plot generated and sent to client!")
        return jsonify({
            "image": image_base64
        })
    except ValueError as e:
        logger.error(f"ValueError in generate_plot: {str(e)}")
        return jsonify({"error": "Format date invalid"}), 400
    except Exception as e:
        logger.error(f"Unexpected error in generate_plot: {str(e)}", exc_info=True)
        return jsonify({"error": "Eroare internă"}), 500


if __name__ == "__main__":
    logger.info("Starting Plotify server...")
    app.run(debug=True)
