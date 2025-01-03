# import numpy as np
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.models import load_model
# import matplotlib.pyplot as plt
# import json
# import os

# # Step 1: Load the saved model
# # model = load_model('E:/SDA-LAB-PROJECT/Project-sameer/backend/models/trained_model.h5')  # Replace with your saved model file path
# model_path = os.path.join(os.path.dirname(__file__), 'trained_model.h5')
# model = load_model(model_path)



# # Step 2: Load class_indices
# class_indices_path = os.path.join(os.path.dirname(__file__), 'class_indices.json')
# with open(class_indices_path, 'r') as f:
#     class_indices = json.load(f)
# class_names = {v: k for k, v in class_indices.items()}  # Reverse mapping: index -> class label

# # Step 3: Define the prediction function
# def predict_image(image_path, model, target_size=(128, 128)):
#     # Load and preprocess the image
#     img = image.load_img(image_path, target_size=target_size)
#     img_array = image.img_to_array(img)
#     img_array = img_array / 255.0  # Normalize pixel values
#     img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

#     # Make predictions
#     predictions = model.predict(img_array)
#     predicted_class = np.argmax(predictions, axis=1)

#     # Map predicted class index to class label
#     predicted_label = class_names[predicted_class[0]]

#     # Display the image with prediction
#     plt.imshow(img)
#     plt.title(f"Predicted: {predicted_label}")
#     plt.axis('off')
#     plt.show()

#     return predicted_label

# # Step 4: Predict on a new image
# image_path = 'pic79.jpg'  # Replace with your image path
# predicted_label = predict_image(image_path, model)
# print(f"The predicted class is: {predicted_label}")



# import sys
# import os
# import json
# import numpy as np
# import matplotlib.pyplot as plt
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.models import load_model

# # Step 1: Load the saved model
# model_path = os.path.join(os.path.dirname(__file__), 'trained_model.h5')  # Correct path to model
# model = load_model(model_path)

# # Step 2: Load class_indices
# class_indices_path = os.path.join(os.path.dirname(__file__), 'class_indices.json')
# with open(class_indices_path, 'r') as f:
#     class_indices = json.load(f)
# class_names = {v: k for k, v in class_indices.items()}  # Reverse mapping: index -> class label

# # Step 3: Define the prediction function
# def predict_image(image_path, model, target_size=(128, 128)):
#     # Load and preprocess the image
#     img = image.load_img(image_path, target_size=target_size)
#     img_array = image.img_to_array(img)
#     img_array = img_array / 255.0  # Normalize pixel values
#     img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

#     # Make predictions
#     predictions = model.predict(img_array)
#     predicted_class = np.argmax(predictions, axis=1)

#     # Map predicted class index to class label
#     predicted_label = class_names[predicted_class[0]]

#     # Display the image with prediction
#     plt.imshow(img)
#     plt.title(f"Predicted: {predicted_label}")
#     plt.axis('off')
#     plt.show()

#     return predicted_label

# # Step 4: Predict on a new image
# image_path = sys.argv[1]  # Get image path passed from Node.js
# predicted_label = predict_image(image_path, model)
# print(predicted_label)  # Return the prediction as output



# import sys
# import os
# import numpy as np
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.models import load_model
# import matplotlib.pyplot as plt
# import urllib.parse

# # Suppress TensorFlow warnings and disable oneDNN optimizations
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Suppress TensorFlow info/warning messages
# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN optimizations

# # Set default encoding to UTF-8 for Windows compatibility
# os.environ['PYTHONIOENCODING'] = 'utf-8'
# sys.stdin.reconfigure(encoding='utf-8')
# sys.stdout.reconfigure(encoding='utf-8')
# sys.stderr.reconfigure(encoding='utf-8')

# # Step 1: Get and validate the image path
# try:
#     original_image_path = sys.argv[1]  # Image path passed dynamically from Node.js
#     print(f"Original image path: {original_image_path}")

#     # Decode URL-encoded path
#     image_path = urllib.parse.unquote(original_image_path)
#     print(f"Decoded image path: {image_path}")

#     # Ensure the path is absolute
#     image_path = os.path.abspath(image_path)

#     # Check if the image file exists
#     if not os.path.exists(image_path):
#         raise FileNotFoundError(f"File not found: {image_path}")
# except IndexError:
#     print("Error: No image path provided.")
#     sys.exit(1)
# except Exception as e:
#     print(f"Error in processing the image path: {str(e)}")
#     sys.exit(1)

# # Step 2: Load the saved model
# try:
#     model_path = os.path.join(os.path.dirname(__file__), 'trained_model.h5')
#     model = load_model(model_path)  # Replace with your saved model file path
#     print("Model loaded successfully.")
# except Exception as e:
#     print(f"Error loading the model: {str(e)}")
#     sys.exit(1)

# # Step 3: Define class indices and reverse mapping
# class_indices = {
#     "Kurti": 0,
#     "Bottoms": 1,
#     "Sandal": 2,
#     "Topwear": 3,
#     "Shoes": 4,
#     "Unknown": 5
# }
# class_names = {v: k for k, v in class_indices.items()}  # Reverse mapping: index -> class label

# # Step 4: Define the prediction function
# def predict_image(image_path, model, target_size=(128, 128)):
#     try:
#         # Load and preprocess the image
#         img = image.load_img(image_path, target_size=target_size)
#         img_array = image.img_to_array(img)
#         img_array = img_array / 255.0  # Normalize pixel values
#         img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

#         # Make predictions
#         predictions = model.predict(img_array)
#         predicted_class = np.argmax(predictions, axis=1)

#         # Map predicted class index to class label
#         predicted_label = class_names[predicted_class[0]]

#         # Display the image with prediction
#         plt.imshow(img)
#         plt.title(f"Predicted: {predicted_label}")
#         plt.axis('off')
#         plt.show()

#         return predicted_label
#     except Exception as e:
#         print(f"Error in prediction: {str(e)}")
#         return None

# # Step 5: Call the prediction function
# try:
#     predicted_label = predict_image(image_path, model)
#     if predicted_label:
#         print(f"The predicted class is: {predicted_label}")
#     else:
#         print("Error in processing the image.")
# except Exception as e:
#     print(f"Unexpected error: {str(e)}")




import sys
import os
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import urllib.parse

# Suppress TensorFlow warnings and disable oneDNN optimizations
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress all TensorFlow info/warnings/errors
import tensorflow as tf
tf.get_logger().setLevel('ERROR')  # Suppress TensorFlow progress bar and logs

# Step 1: Get and validate the image path
try:
    original_image_path = sys.argv[1]  # Image path passed dynamically from Node.js

    # Decode URL-encoded path
    image_path = urllib.parse.unquote(original_image_path)

    # Ensure the path is absolute
    image_path = os.path.abspath(image_path)

    # Check if the image file exists
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"File not found: {image_path}")
except IndexError:
    sys.exit(1)
except Exception as e:
    sys.exit(1)

# Step 2: Load the saved model
try:
    model_path = os.path.join(os.path.dirname(__file__), 'trained_model.h5')
    model = load_model(model_path)  # Replace with your saved model file path
except Exception as e:
    sys.exit(1)

# Step 3: Define class indices and reverse mapping
class_indices = {
    "Kurti, A Kurti is a traditional Indian tunic, often worn by women. It's versatile, available in various fabrics, and can be styled for casual or formal occasions.": 0,
    "Bottoms, This category includes pants, trousers, and leggings designed for comfort and style. They pair well with tops, shirts, or tunics for a complete outfit.": 1,
    "Sandal, Sandals are open-toed footwear perfect for casual and summer wear. They come in various designs, from flat to heeled, catering to both comfort and fashion.": 2,
    "Topwear, Topwear includes shirts, t-shirts, and blouses worn on the upper body. They come in different styles, fabrics, and fits to suit every occasion.": 3,
    "Shoes, Shoes are enclosed footwear that provide protection, support, and style. They range from formal designs to sporty and casual options.": 4,
    "Unknown, This category represents items that don’t fit into predefined classes. It's often used for miscellaneous or unclassified products.": 5
}
class_names = {v: k for k, v in class_indices.items()}  # Reverse mapping: index -> class label

# Step 4: Define the prediction function
def predict_image(image_path, model, target_size=(128, 128)):
    try:
        # Load and preprocess the image
        img = image.load_img(image_path, target_size=target_size)
        img_array = image.img_to_array(img)
        img_array = img_array / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make predictions
        predictions = model.predict(img_array, verbose=0)  # Suppress progress bar
        predicted_class = np.argmax(predictions, axis=1)

        # Map predicted class index to class label
        return class_names[predicted_class[0]]
    except Exception as e:
        return None

# Step 5: Call the prediction function and print only the result
try:
    predicted_label = predict_image(image_path, model)
    if predicted_label:
        print(predicted_label)  # Output only the predicted class name
    else:
        sys.exit(1)
except Exception as e:
    sys.exit(1)
