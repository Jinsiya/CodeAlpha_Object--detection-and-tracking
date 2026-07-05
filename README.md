## OBJECT DETECTION AND TRACKING SYSTEM

Real-time object detection and tracking using webcam feed with deep learning models.

## 📋 Overview

VisionAI is a real-time object detection and tracking system that identifies and tracks objects through a webcam. It uses state-of-the-art computer vision models to detect 20+ object classes including people, vehicles, animals, and everyday items.

## ✨ Features

### Core Features
- **Real-time Detection** - Live webcam video processing
- **Object Tracking** - Unique IDs assigned to each tracked object
- **20+ Object Classes** - People, cars, dogs, cats, and more
- **Live Statistics** - FPS counter, object count, class distribution
- **Interactive UI** - Modern dashboard with real-time updates

### UI Features
- Dark themed professional interface
- Live statistics dashboard
- Detection list with confidence scores
- Class distribution panel
- Start/Stop/Clear controls
- Keyboard shortcuts
- Responsive for mobile/tablet

### Technical Features
- Optimized for CPU (no GPU required)
- Thread-safe video processing
- Toast notifications for feedback
- Error handling and recovery
- Cross-browser compatible

## 🛠 Technologies

| Category | Technologies |
|----------|--------------|
| **Backend** | Python 3.8+, Flask, OpenCV, NumPy |
| **Models** | YOLOv3, YOLOv8n, MobileNet SSD, Haar Cascade |
| **Frontend** | HTML5, CSS3, JavaScript, Font Awesome |
| **Tracking** | SORT Algorithm (Kalman Filter + Hungarian Algorithm) |

## 📁 Project Structure
<img width="273" height="330" alt="image" src="https://github.com/user-attachments/assets/b06ed5cd-55ff-4399-828f-59624eb5bce1" />


## PIPELINE OF SYSTEM

Camera Capture → Preprocess → YOLO/MobileNet SSD → NMS → Tracking → Draw Results

## 🚀 Installation

### Step 1: Clone Repository


git clone https://github.com/Jinsiya/CodeAlpha_Object--detection-and-tr---.git
cd CodeAlpha_Object--detection-and-tr---
## Step 2: Create Virtual Environment
bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
## Step 3: Install Dependencies
bash
pip install -r requirements.txt
##Step 4: Download Models
bash
# Models auto-download on first run
# Or manually download:
# - MobileNet SSD: 13MB
# - YOLOv3: 240MB
## Step 5: Run Application
python app.py


## Troubleshooting
pip install opencv-python-headless

# Test camera
python -c "import cv2; print(cv2.VideoCapture(0).isOpened())"
