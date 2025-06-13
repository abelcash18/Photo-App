let currentPage = 1; 
const perPage = 12;

const fetchPicture = async (page = 1) => {
    currentPage = page; 
    let query = document.getElementById("query").value;
    try {
        let response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: "Client-ID xyMpSox0VFm31Rmxs5dprdr98PKra_l-yqKaEwanG_o"
                },
            }
        );

        if (response.ok) {
            let data = await response.json();
            let display = "";

            for (let i in data.results) {
                display += `
                <div class="grid-child">
                    <img src="${data.results[i].urls.regular}" alt="pictures"/>
                    <p> Photographer: ${data.results[i].user.name}</p>
                    <p> Description: ${data.results[i].alt_description || 'No description'}</p>
                </div>
                `
            }

            display += `
                <div style="text-align:center; margin: 15px;">
                    <button id="prevBtn" ${page === 1 ? "disabled" : ""}>Previous</button>
                    <span> Page ${page} </span>
                    <button id="nextBtn" ${data.total_pages && page >= data.total_pages ? "disabled" : ""}>Next</button>
                </div>
            `;

            document.getElementById("display").innerHTML = display;

            document.getElementById("prevBtn").onclick = () => {
                if (currentPage > 1) {
                    fetchPicture(currentPage - 1);
                }
            };
            document.getElementById("nextBtn").onclick = () => {
                if (!data.total_pages || currentPage < data.total_pages) {
                    fetchPicture(currentPage + 1);
                }
            };
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("There was an error fetching the data. Please try again later")
    }
}
