from flask import Flask, render_template, request, jsonify
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)

# ===== LOAD FACE DETECTOR (Built into OpenCV - ALWAYS WORKS) =====
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect', methods=['POST'])
def detect():
    try:
        data = request.get_json()
        image_data = data['image']
        
        # Decode image
        if 'base64,' in image_data:
            image_data = image_data.split('base64,')[1]
        
        image_bytes = base64.b64decode(image_data)
        nparr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({'error': 'Invalid image'}), 400
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(gray, 1.1, 4, minSize=(50, 50))
        
        # Draw rectangles around faces
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 3)
            cv2.putText(frame, f'Face', (x, y-10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        
        # Encode back
        _, buffer = cv2.imencode('.jpg', frame)
        processed = base64.b64encode(buffer).decode('utf-8')
        
        # Build object list
        objects = []
        for (x, y, w, h) in faces:
            objects.append({
                'class': 'face',
                'confidence': 0.9,
                'bbox': [int(x), int(y), int(w), int(h)]
            })
        
        return jsonify({
            'image': processed,
            'count': len(faces),
            'objects': objects
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 VisionAI Started")
    print("📷 Face Detection Active")
    print("🌐 http://127.0.0.1:5000")
    app.run(debug=True, host='127.0.0.1', port=5000)