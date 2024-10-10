async function uploadImage(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async function(blob) {
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');

      const username = 'robot'; // process.env.API_USERNAME;
      const password = 'Aa123456'; // process.env.API_PASSWORD;

      // Create headers
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Basic ${btoa(`${username}:${password}`)}`);

      // Create request options
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
      };

      try {
        // Send POST request to upload image
        const response = await fetch("https://wp.jcarroyos.art/wp-json/wp/v2/media", requestOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        resolve(result.id); // Return the ID of the uploaded image
      } catch (error) {
        reject(error);
      }
    }, 'image/jpeg', 0.5); // Request blob in JPEG format with 50% quality
  });
}

async function createPost() {
  // Get the canvas element
  const canvas = document.querySelector('#webcam-container canvas');
  
  // Check if canvas element exists
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  try {
    // Upload the image and get the ID
    const imageId = await uploadImage(canvas);

    const username = 'robot'; // process.env.API_USERNAME;
    const password = 'Aa123456'; // process.env.API_PASSWORD;

    // Create headers
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${btoa(`${username}:${password}`)}`);

    // Create request body
    const raw = JSON.stringify({
      "title": "Mi nuevo post",
      "content": "Este es el contenido del post",
      "status": "publish",
      "featured_media": imageId,
      /*
      "categories": [1, 2, 3],
      "tags": [1, 2, 3]
      */
    });

    // Create request options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    // Send POST request to create post
    const response = await fetch("https://wp.jcarroyos.art/wp-json/wp/v2/posts", requestOptions);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}