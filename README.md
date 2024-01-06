# Watermark Studio

## Project Overview

The project is focused on advancing methods for detecting and preventing unauthorized access and modifications of intellectual property. The key components involve the application of mathematical algorithms and engineering solutions based on the latest scientific advancements. The target audiences for this project include Information Security Specialists, businesses and organizations in various sectors, and the academic community.


## Main Stages

1. **Defining Platform's Structure:**
   - Define the structure and components, including database, interface, and steganographic methods.

2. **Determining Technologies and Tools:**
   - Determine necessary technologies and tools, including programming languages and libraries.

3. **Building Platform Functionality:**
   - Build platform functionality, covering encryption, decryption, and core features.

4. **Designing Visual Appearance:**
   - Design the visual appearance of the web application.

5. **Compiling Documents:**
   - Compile accompanying text and advertising documents.

6. **Presentation:**
   - Present the project to academic and other interested groups.

## Project Complexity

The project faced challenges in:

- Implementing secure steganography methods.
- Compiling Flask code.
- Database integration.
- Integrating external libraries and APIs.
- Shaping the design.

## Solution Description

### Logical and Functional Overview

The platform comprises three main modules:

1. **Home Page:**
   - Describing web application advantages.

2. **RSH Mark Module:**
   - Embeds and extracts text from an image using Reed-Solomon-Hamming Mark.

3. **MSB Mark Module:**
   - Embeds and extracts an image from an image using Most Significant Bit Mark.

4. **Registration Module:**
   - Allows users to register or log in via email/password using Firebase Authentication or Google account using Google API.

### Navigation and Features

- Navigation at the top of each module facilitates easy movement between pages.
- Sign out button for account logout.
- Drop-down menu for accessing image manipulation methods (RSH and MSB Mark).

## RSH Mark Module

### Methodology

The RSH (Reed-Solomon-Hamming Mark) module provides a robust method for embedding and extracting text from an image without any noticeable visual changes. The security of the embedded information is achieved through the combination of two error-correcting mathematical algorithms: Reed-Solomon and Hamming(7,4).

### Process of Embedding a Text Digital Watermark

1. **Text Encoding:**
   - The input text undergoes encoding with Hamming(7,4).

2. **Byte Conversion:**
   - The resulting bit sequence is converted to bytes.

3. **Reed-Solomon Coding:**
   - The information undergoes coding with a Reed-Solomon code.

4. **Bit Conversion:**
   - The resulting byte sequence is converted back to bits.

5. **Embedding Process:**
   - Random positions are chosen to embed bits by altering specific color components (red, blue) of the image. Notably, no bits are embedded in the green component as it is the most visible to the human eye.

### Extraction of Text Digital Watermark

1. **Bit Extraction:**
   - Bits are extracted from random positions of the image.

2. **Text Extraction:**
   - After recovering the bits, the text is extracted by decoding using the reverse process of embedding.

### User Assistance

A brief description of the RSH Mark module is presented upon switching to this module, accompanied by a video tutorial to facilitate user understanding.


## MSB Mark Module

### Methodology

The MSB (Most Significant Bit Mark) module employs steganography by utilizing the most significant bits of pixels in images. This technique enables data to be encoded in the less significant bits of one image by replacing them with the significant bits of another, resulting in no visible changes.

### Process of Embedding a Visual Digital Watermark

1. **Image Loading and Conversion:**
   - Images are loaded and converted into NumPy arrays of pixels using OpenCV.

2. **Bit Extraction from Pixels:**
   - The significant 4 bits of the pixels of the first and second images are taken.

3. **Combining and Embedding:**
   - These bits are combined and embedded in the pixels of the first image.

### Extraction of Visual Digital Watermark

1. **Pixel Extraction:**
   - Image pixels are extracted.

2. **Pixel Recovery:**
   - After extracting pixels, the pixels of the two images are recovered by decoding using the reverse process of embedding.

### User Assistance

Similar to the RSH Mark module, the MSB Mark module provides a brief description upon switching, along with a video tutorial to guide users through the platform's functionality.

## Implementation

### Libraries and Software Technologies

- HTML, CSS, JavaScript, Python, Flask, Firebase, Pillow(PIL), Reedsolo.
- Software: Adobe Photoshop (trial), Pycharm (free), Microsoft Office.

### Application Description

The online platform can be run locally or accessed through public hosting at [https://wmstudio-2a1b1e4d71b9.herokuapp.com](https://wmstudio-2a1b1e4d71b9.herokuapp.com).

## Conclusion

The platform offers an innovative approach to protecting intellectual property using error-correcting mathematical algorithms. This method enhances security and reliability, making it suitable for various fields where data protection is crucial. The platform is an ideal solution for organizations and individuals valuing high-level security and data integrity.
