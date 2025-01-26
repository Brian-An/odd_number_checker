import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace with your actual Gemini API key
GENAI_API_KEY = "GENAI_API_KEY"
genai.configure(api_key=GENAI_API_KEY)

@app.route("/api/check_odd", methods=["POST"])
def check_odd():
    data = request.get_json()
    number_str = str(data.get("number", ""))
    prompt = f"Is {number_str} an odd number? Only say either 'yes' or 'no'."

    try:
        # Use the appropriate Gemini model name
        model = genai.GenerativeModel("gemini-1.5-pro")  
        response = model.generate_content(prompt)

        # Instead of response.responses[0].text, use response.text
        content = response.text  

        return jsonify({"result": content}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)

