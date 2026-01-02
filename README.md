# Plotify

A web application that allows users to input numerical data and generate interactive plots with different chart types.

## About This Project

Plotify is a learning project that combines frontend interface design with Python-based data visualization. The application demonstrates how to build a simple full-stack solution for creating charts from user input, featuring real-time validation and multiple visualization options.

## Features

- **Multiple Data Input Options** - Support for 1, 2, or 3 different datasets in a single visualization
- **Chart Types** - Line charts, bar charts, and histograms
- **Interactive Interface** - Bootstrap-based responsive UI with dropdown menus
- **Input Validation** - Real-time validation with specific error messages
- **Image Download** - Save generated plots as PNG files

## Technologies Used

### Frontend
- HTML5
- CSS3 (Bootstrap 5)
- Vanilla JavaScript

### Backend
- Python 3
- Flask
- Flask-CORS
- Matplotlib

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Plotify.git
cd Plotify
```

2. Install Python dependencies:
```bash
cd backend
```

3. Start the Flask server:
```bash
python server.py
```

The backend will run at `http://127.0.0.1:5000`

4. Open the frontend:
```bash
cd ../frontend
```

Open `index.html` in your browser, or use a local server:
```bash
python -m http.server 5000
```

Then visit `http://localhost:5000`

## Usage

1. Choose how many data types you want to visualize (1, 2, or 3)
2. Enter the name for each data type (e.g., "Temperature")
3. Click "Salveaza" (Save) to lock the name
4. Enter numerical data separated by commas (e.g., `23,45,67`)
5. Click "Salveaza" (Save) to lock the data
6. Select a chart type from the dropdown menu
7. Click "Trimite datele" (Send Data) to generate the plot
8. Download the image using "Salveaza imaginea" (Save Image)

## Input Format

- Numbers must be separated by commas
- Use periods (`.`) for decimal points
- Example: `10,3.14,2.71,5.5`

## Development Challenges

The main challenges in this project were:

- Creating universal functions that work across multiple input containers without code duplication
- Implementing dynamic form validation with clear error messages for different scenarios
- Managing form states (disabled/enabled) while maintaining data integrity
- Setting up proper communication between frontend and backend
- Converting matplotlib plots to base64-encoded images for display

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)


---

**Note**: This is a learning project created to practice full-stack development and data visualization techniques.
