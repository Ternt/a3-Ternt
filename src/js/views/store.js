
const getItemData = async () => {
    const response = await fetch("/data/item", {
        method: "Get",
    });

    const text = await response.text();
    const data = JSON.parse(text);
    console.log(data);

    return data;
};

const Store = {
    render: async () => {
        return `
<div id="main" class="body-section">
<div id="content-feed">
</div>
</div>
`;
    },
    after_render: async () => {
        const data = await getItemData();

        const contentFeed = document.getElementById("content-feed");
        data.forEach((item) => {
            const div = document.createElement("div");
            div.classList.add("item-card");
            div.id = item["_id"];
            
            contentFeed.appendChild(div);
        });
    },
};

export default Store;
