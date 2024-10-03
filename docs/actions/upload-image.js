function uploadImage() {
    // Get the canvas element
    const canvas = document.querySelector('#webcam-container .canvas');
    const ctx = canvas.getContext('2d');
  
    // Get the canvas data as a blob
    canvas.toBlob(function(blob) {
      // Create a FormData object
      const formData = new FormData();
      formData.append('featured_media', blob, 'image.jpg'); // Append blob to formData
  
      // Set API endpoint and authentication headers
      const url = 'http://example.com/wp-json/wp/v2/posts';
      const apiToken = 'YOUR_API_TOKEN';
      const headers = {
        'Authorization': `Bearer ${apiToken}`,
      };
  
      // Send FormData to server using Fetch API
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: formData,
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    }, 'image/jpeg', 0.5); // Request blob in JPEG format with 50% quality
  }