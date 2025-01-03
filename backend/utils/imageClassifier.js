// import * as tf from "@tensorflow/tfjs-node";
// import sharp from "sharp"; // For image preprocessing

// export const loadModel = (modelPath) => {
//   return tf.loadLayersModel(`file://${modelPath}`);
// };

// export const predictImage = async (model, imagePath) => {
//   const buffer = await sharp(imagePath)
//     .resize(128, 128) // Resize image to 128x128 (based on model input size)
//     .toBuffer();

//   const tensor = tf.tidy(() =>
//     tf.node.decodeImage(buffer).expandDims(0).toFloat().div(255.0)
//   );

//   const prediction = model.predict(tensor);
//   const classIndex = prediction.argMax(-1).dataSync()[0];
//   return `Predicted Class: ${classIndex}`; // Replace with actual class names if needed
// };
