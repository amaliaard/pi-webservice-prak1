const api_url = "https://dummyjson.com/products";

// Defining async function
async function getapi(url) {
    try {
        // Storing response
        const response = await fetch(url);
        // Checking if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Storing data in form of JSON
        let data = await response.json();
        console.log(data);
        hideloader();
        show(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("employees").innerHTML = `<tr><td colspan="6">Failed to load data</td></tr>`;
    }
}

// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
    const loader = document.getElementById('loading');
    if (loader) loader.style.display = 'none';
}

// Function to define innerHTML for HTML table
function show(data) {
    let tab =
        `<tr>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Stock</th>
            <th>Images</th>
        </tr>`;

    // Loop to access all rows
    for (let r of data.products) {
        let imageSrc = r.images?.[1] || r.images?.[0] || 'default.jpg'; // Handle missing images
        tab += `<tr>
            <td>${r.title}</td>
            <td>${r.description}</td>
            <td>$${r.price}</td>
            <td>${r.brand}</td>
            <td>${r.stock}</td>
            <td><img src="${imageSrc}" width="100" onerror="this.src='default.jpg'"/></td>
        </tr>`;
    }

    // Setting innerHTML as tab variable
    document.getElementById("employees").innerHTML = tab;
}
